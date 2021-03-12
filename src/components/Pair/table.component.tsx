import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import BootstrapTable, { SelectRowProps, ColumnDescription } from 'react-bootstrap-table-next';
import { useHistory } from 'react-router';
import { useSelector } from '../core/types';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
// Components
import NoData from './noData.component';
// Core / Helper / Editor
import { LoadingModal, YesNoModal, YesNoModalProps } from '../core/generic/Commons';
import { cellEditProps, columns } from './editor';
// Style
import './style.css';
import commonStyle from '../../common.module.css';
// Service
import { fetchPlayers } from '../../redux/services/player.service';
import { deleteStage1 as deleteStage1Api } from '../../redux/services/stage1.service';
import { deletePairs, fetchPairs, findAlias, postPair, updatePair } from 'src/redux/services/pair.service';
// Selector
import { AuthSelector } from '../../redux/selectors/auth.selector';
import { TournamentSelector } from '../../redux/selectors/tournament.selector';
// Action
import { TournamentAction, PairAction } from '../../redux/actions';
import TournamentBadge from '../Tournament/badge.component';
import { useTranslation } from 'react-i18next';
// Models
import { PairDTO, PlayerDTO, TournamentProgress } from 'src/@common/dto';
import { HTTPStatusCode } from '../../@common/models/HttpStatusCode';
import { LABEL_COMMON_LOADING } from '../../@common/constants/label';
import {
	FetchPairsResponse,
	FetchPlayersResponse,
	FindAliasResponse,
	getEmptyPair,
	getEmptyPlayer,
	SavePairResponse,
} from '../../@common/models';
import Toolsbar from './toolsbar.component';
import expandManager from './expand.manager';
import { StatsPairMap } from '../../@common/models/stats.model';

const hideAskUser = {
	message: '',
	onClick: () => console.log(''),
	show: false,
	title: '',
};
interface PairTableProps {}
// eslint-disable-next-line sonarjs/cognitive-complexity
const PairsTable: React.FC<PairTableProps> = () => {
	// Navigation
	const currentHistory = useHistory();
	const dispatch = useDispatch();
	const { t } = useTranslation(['common', 'pair', 'stats']);

	const isAdmin = useSelector(AuthSelector.isAdmin);
	const tournament = useSelector(TournamentSelector.getTournament)!;

	// States
	// User messages
	const [isLoading, setIsLoading] = useState({ state: false, message: t(LABEL_COMMON_LOADING) });
	const [askUser, setAskUser] = useState<YesNoModalProps>(hideAskUser);

	const [expandedRows, setExpandedRows] = useState<Array<number>>([]);
	// Data
	const [data, setData] = useState<{ rows: PairDTO[]; players: PlayerDTO[] }>({ rows: [], players: [] });
	const [selectedRows, setSelectedRows] = useState<PairDTO[]>([]);
	const [stats, setStats] = useState<StatsPairMap>({});
	// Function params
	const [stage1Number, setStage1Number] = useState<number>(0);
	const [newRowsNumber, setNewRowsNumber] = useState<number>(0);

	// Initial Fetch
	useEffect(() => {
		if (!tournament) return;
		(async () => {
			const { pairsList } = (await fetchPairs({ tId: tournament.id })) as FetchPairsResponse;
			const { playersList } = (await fetchPlayers({ addEmpty: true, tId: tournament.id })) as FetchPlayersResponse;
			setData({ rows: pairsList, players: playersList });
		})();
	}, [tournament]);

	// User messages
	function showErrorMessage(message: string) {
		setIsLoading({ state: false, message });
		toast.error(message, { autoClose: 10000 });
	}
	function showSuccessMessage(message: string) {
		setIsLoading({ state: false, message });
		toast.success(message);
	}

	/************************************************
	 *  Add Rows
	 *************************************************/
	async function addRow(index?: number) {
		try {
			setIsLoading({ state: true, message: t(LABEL_COMMON_LOADING) });
			const emptyRow: PairDTO = getEmptyPair('', tournament.id || 0);
			const result = (await postPair({ pair: emptyRow })) as SavePairResponse;
			emptyRow.id = result.pair.id;
			emptyRow.rowNumber = index || data.rows.length + 1;
			setData((current) => ({
				rows: [emptyRow, ...current.rows].map((p, i) => ({ ...p, rowNumber: i + 1 })),
				players: current.players,
			}));
			showSuccessMessage(t('pair:success.add'));
		} catch (error) {
			showErrorMessage(t('pair:error.19'));
		}
	}

	async function addMultipleRows() {
		let index = data.rows.length + 1;
		for (let ii = 0; ii < newRowsNumber; ii++) {
			await addRow(index);
			index++;
		}
		setNewRowsNumber(0);
	}

	/************************************************
	 *  Delete Rows and Stage 1
	 *************************************************/
	async function deleteRow() {
		try {
			setIsLoading({ state: true, message: t(LABEL_COMMON_LOADING) });
			// Devo ripristinare i giocatori eliminati
			const players: Array<PlayerDTO> = [];
			selectedRows.forEach((e) => {
				if (e.player1 && e.player1.id) players.push(e.player1);
				if (e.player2 && e.player2.id) players.push(e.player2);
			});

			await deletePairs({ pairsList: selectedRows });
			setData((current) => ({
				rows: current.rows.filter((row) => !selectedRows.find((selectedRow) => selectedRow.id === row.id)),
				players: players
					? [...players, ...current.players].sort((e1, e2) => e1.alias.localeCompare(e2.alias))
					: current.players,
			}));

			showSuccessMessage(t(`pair:success.${selectedRows.length > 1 ? 'deleteMulti' : 'deleteOne'}`));
		} catch (error) {
			showErrorMessage(t('pair:error.18'));
		}

		setSelectedRows([]);
	}

	const processDeleteStage1 = async () => {
		try {
			setIsLoading({ state: true, message: t(LABEL_COMMON_LOADING) });
			await deleteStage1Api({ tId: tournament.id });
			// Update tournament progress
			if (isAdmin) {
				dispatch(
					TournamentAction.update.request({
						tournament: { ...tournament, progress: TournamentProgress.PairsSelection },
					})
				);
			}
			showSuccessMessage(t('pair:success.delete'));
			setAskUser(hideAskUser);
		} catch (error) {
			showErrorMessage(t('pair:error.8'));
		}
	};

	function deleteStage1() {
		if (tournament.progress > TournamentProgress.Stage1) {
			showErrorMessage(t('pair:error.7'));
			return;
		}
		// Chiedo conferma all'utente
		setAskUser({
			message: `${t('pair:stage1.resetConfirm')} ?`,
			onClick: () => processDeleteStage1(),
			onHide: () => setAskUser(hideAskUser),
			show: true,
			title: t('pair:stage1.reset'),
		});
	}

	/************************************************
	 *  Row selection :
	 *  - update players list when a player is selected
	 *  -
	 *************************************************/
	function updateOptions(player: PlayerDTO | undefined, selected: PlayerDTO) {
		if (player && player.id)
			if (selected.id)
				setData((current) => ({
					rows: current.rows,
					players: [...current.players.filter((e) => e.id !== selected.id), player].sort((e1, e2) =>
						e1.alias.localeCompare(e2.alias)
					),
				}));
			else
				setData((current) => ({
					rows: current.rows,
					players: [...current.players, player].sort((e1, e2) => e1.alias.localeCompare(e2.alias)),
				}));
		else if (selected.id)
			setData((current) => ({
				rows: current.rows,
				players: current.players.filter((e: { id: any }) => e.id !== selected.id),
			}));
	}
	// Aggiorno la colonna con il giocatore selezionato
	const onSelect = async (selectedElement: PlayerDTO, rowIndex: number, columnIndex: number) => {
		const newRowsElement = await Promise.all(
			data.rows.map<Promise<PairDTO>>(async (rowElement) => {
				if (rowElement.id === rowIndex) {
					let row = rowElement;
					if (columnIndex === 1) {
						if (selectedElement.id && row.player2 && row.player2.id === selectedElement.id) {
							// Devo salvare l'elemnto che sto per sostituire
							row.player1 = getEmptyPlayer();
							showErrorMessage(t('pair:error.17'));
						} else {
							// Aggiorno la lista dei giocatori disponibili prima di aggiornare i dati
							updateOptions(row.player1, selectedElement);
							row.player1 = selectedElement;
						}
					} else {
						if (selectedElement.id && row.player1 && row.player1.id === selectedElement.id) {
							row.player2 = getEmptyPlayer();
							showErrorMessage(t('pair:error.17'));
						} else {
							updateOptions(row.player2, selectedElement);
							row.player2 = selectedElement;
						}
					}
					//
					if (!row.alias && row.player1 && row.player1.id && row.player2 && row.player2.id) {
						const result = (await findAlias({
							player1Id: row.player1.id,
							player2Id: row.player2.id,
						})) as FindAliasResponse;
						row.alias = result.code === HTTPStatusCode.OK && result.alias ? result.alias : '';
					}
					// update Db. Non aspetto la risposta...
					if (row.player1 && row.player2) {
						updatePair({ pair: row });
					}
					return row;
				} else return rowElement;
			})
		);
		setData((current) => ({
			rows: newRowsElement,
			players: current.players,
		}));
	};

	const handleSelect = (row: PairDTO, isSelected: boolean) => {
		setSelectedRows((rows) => {
			const found = rows.find((e) => e.id === row.id) ? true : false;
			if (isSelected) {
				return found ? rows : [row, ...rows];
			} else {
				return found ? rows.filter((e) => e.id !== row.id) : rows;
			}
		});
		return true;
	};

	/************************************************
	 *  Set stage1 name
	 *************************************************/
	function setStage1Name() {
		if (!stage1Number) {
			showErrorMessage(t('pair:error.6'));
			return;
		}

		if (tournament.progress > TournamentProgress.PairsSelection) {
			showErrorMessage(t('pair:error.5'));
			return;
		}

		setIsLoading({ state: true, message: t(LABEL_COMMON_LOADING) });
		const names = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('');
		let current = 0;
		let newRows: PairDTO[] = data.rows.map((row) => {
			if (current === stage1Number) current = 0;
			row.stage1Name = names[current];
			current++;
			postPair({ pair: row });
			return row;
		});
		//const mapper = data.rows.map(p => ({ id: p.id, stage1Name: p.stage1Name }));
		showSuccessMessage(t('pair:success.stage1Name'));
		setData((prevData) => ({ rows: newRows, players: prevData.players }));
	}

	/************************************************
	 *  Confirm pair and proced :
	 *  - At least 4 pairs
	 *  - All rows must have Stage1Name
	 *  - All pairs must have 2 players
	 *  - Must exists at least 4 pairs for each stage1
	 *************************************************/
	const confirmPairs = () => {
		if (!tournament.id) {
			showErrorMessage(`${t('pair:error.16')}...`);
			setTimeout(() => currentHistory.push('/'), 5000);
		}

		// Controllo che sia presente almeno una coppia
		if (data.rows.length < 4) {
			showErrorMessage(t('pair:error.15'));
			return;
		}
		// Controllo gironi non assegnati
		const missingStage1Name = data.rows.filter((e) => !e.stage1Name || e.stage1Name === '').map((e) => e.rowNumber);
		if (missingStage1Name.length !== 0) {
			showErrorMessage(t(`pair:error.${missingStage1Name.length === 1 ? '13' : '14'}`, { missingStage1Name }));
			return;
		}

		// Controllo coppie non assegnate
		const missingPairs = data.rows
			.filter((e) => !e.player1 || !e.player1.id || !e.player2 || !e.player2.id)
			.map((e) => e.rowNumber);
		if (missingPairs.length !== 0) {
			showErrorMessage(t(`pair:error.${missingPairs.length === 1 ? '11' : '12'}`, { missingPairs }));
			return;
		}

		// Controllo che non ci siano gironi con meno di 1 coppia ( meglio spostare 3 )
		const MIN_PAIR_PER_STAGE = 3;
		let invalidStage = [];
		const pairsInStage = data.rows.reduce((allNames: { [x: string]: number }, row: { stage1Name: string }) => {
			if (row.stage1Name in allNames) allNames[row.stage1Name]++;
			else allNames[row.stage1Name] = 1;
			return allNames;
		}, {});
		for (let stageName in pairsInStage) {
			if (pairsInStage[stageName] <= MIN_PAIR_PER_STAGE) invalidStage.push(stageName);
		}
		if (invalidStage.length > 0) {
			showErrorMessage(
				t(`pair:error.${invalidStage.length === 1 ? '9' : '10'}`, { invalidStage, min: MIN_PAIR_PER_STAGE + 1 })
			);
			return;
		}

		// Se sono un utente che puo modificare e il torneo è in una fase minore ( vedi ordinamento Enum ) di quella attuale
		// allora aggiorno lo stato del torneo
		if (isAdmin && tournament.progress < TournamentProgress.Stage1) {
			tournament.progress = TournamentProgress.Stage1;
			dispatch(TournamentAction.update.request({ tournament }));
		}
		// Go to Stage1
		dispatch(PairAction.fetch.request({ tId: tournament.id, history: currentHistory }));
	};

	/************************************************
	 *  Just go back
	 *************************************************/
	function goBack() {
		currentHistory.push('/');
	}

	/************************************************
	 *  Table options
	 *************************************************/
	const selectRow: SelectRowProps<PairDTO> = {
		mode: 'checkbox',
		onSelect: handleSelect,
		onSelectAll: (isSelected: boolean, rows: PairDTO[]) => setSelectedRows(isSelected ? rows : []),
		style: { backgroundColor: '#c8e6c9' },
		hideSelectColumn: !isAdmin || tournament.progress > TournamentProgress.PairsSelection,
	};

	const availableRows = Math.floor(
		Math.floor((data.players.length - 1) / 2) -
			(data.rows.length === 0
				? 0
				: data.rows.reduce((accumulator: number, e) => {
						if ((!e.player1 && !e.player2) || (!e.player1?.id && !e.player2?.id)) return accumulator + 1;
						if (!e.player1 || !e.player1.id || !e.player2 || !e.player2.id) return accumulator + 0.5;
						return accumulator;
				  }, 0))
	);

	const deleteDisabled = selectedRows.length <= 0 || tournament.progress > TournamentProgress.PairsSelection;

	//console.log('render table : ', players, pairs);

	const labels = {
		player1: t('pair:field.player1'),
		player2: t('pair:field.player2'),
		alias: t('pair:field.alias'),
		stage1: t('pair:field.stage1'),
		paid1: t('pair:field.paid1'),
		paid2: t('pair:field.paid2'),
	};

	return (
		<div className={commonStyle.defaultMaginBottom}>
			<YesNoModal message={askUser.message} title={askUser.title} onClick={askUser.onClick} show={askUser.show} />
			<LoadingModal show={isLoading.state} message={isLoading.message} />
			<Col>
				<Toolsbar
					addRow={addRow}
					addMultipleRows={addMultipleRows}
					confirmPairs={confirmPairs}
					goBack={goBack}
					deleteStage1={deleteStage1}
					deleteRow={deleteRow}
					setStage1Number={setStage1Number}
					setStage1Name={setStage1Name}
					setNewRowsNumber={setNewRowsNumber}
					deleteDisabled={deleteDisabled}
					availableRows={availableRows}
					stage1Number={stage1Number}
					newRowsNumber={newRowsNumber}
					rowsLength={data.rows.length}
					selectedLength={selectedRows.length}
				/>
				<Row>
					<Col data-cy="pair-table">
						{
							// https://github.com/react-bootstrap-table/react-bootstrap-table2/issues/1451
							data.rows && data.players ? (
								<BootstrapTable
									data-cy="pair-table"
									bootstrap4
									keyField="id"
									data={data.rows}
									columns={columns(onSelect, data.players, labels) as ColumnDescription<PairDTO, PairDTO>[]}
									cellEdit={cellEditProps(isAdmin && tournament.progress < TournamentProgress.Stage1)}
									selectRow={selectRow}
									expandRow={expandManager(stats, setStats, expandedRows, setExpandedRows, isLoading, setIsLoading)}
									noDataIndication={() => (
										<NoData isEditable={isAdmin || false} addRow={() => addRow()} optionsLength={data.players.length} />
									)}
									caption={<TournamentBadge />}
									headerClasses="default-background default-color-yellow"
									striped
									hover
								/>
							) : null
						}
					</Col>
				</Row>
			</Col>
		</div>
	);
};

export default withRouter(PairsTable);
