import React, { useState, useEffect } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { useSelector } from '../core/types';
import { useDispatch } from 'react-redux';
import BootstrapTable, { ColumnDescription, SelectRowProps } from 'react-bootstrap-table-next';
// style
import { Button, Row, Col } from 'react-bootstrap';

//
import columns, { filterFactory } from './helper';
import TableHeader from '../core/generic/TableHeader';
import { LoadingModal } from '../core/generic/Commons';

import { PlayerAction } from '../../redux/actions';
import { PlayerSelector, AuthSelector } from '../../redux/selectors';
import { useTranslation } from 'react-i18next';
import { PlayerDTO } from '../../@common/dto';
import { getEmptyPlayer } from '../../@common/models';
import Toolsbar from './toolsbar.component';
import { StatsPlayerMap } from 'src/@common/models/stats.model';
import expandManager from './expand.manager';

interface PlayerProps {}
const PlayerTable: React.FC<PlayerProps> = () => {
	const dispatch = useDispatch();
	const currentHistory = useHistory();
	const { t } = useTranslation(['common', 'player']);
	// From Store
	const isLoadingStore = useSelector(PlayerSelector.isLoading);
	const [isLoading, setIsLoading] = useState(false);

	const isAdmin = useSelector(AuthSelector.isAdmin);
	const playersList = useSelector(PlayerSelector.getPlayersList);
	const isSaving = useSelector(PlayerSelector.isSaving);
	// Component State
	const [selectedRows, setSelectedRows] = useState<PlayerDTO[]>([]);
	const [stats, setStats] = useState<StatsPlayerMap>({});
	const [expandedRows, setExpandedRows] = useState<Array<number>>([]);

	// Effetcs
	useEffect(() => {
		dispatch(PlayerAction.fetchPlayers.request({}));
	}, [dispatch]);

	const handleOnSelect = (row: PlayerDTO, isSelected: boolean) => {
		setSelectedRows((rows) => {
			const found = !!rows.find((e) => e.id === row.id);
			if (isSelected) {
				return found ? rows : [row, ...rows];
			} else {
				return found ? rows.filter((e) => e.id !== row.id) : rows;
			}
		});
		return true;
	};

	const selectRow: SelectRowProps<PlayerDTO> = {
		mode: 'checkbox',
		nonSelectable: playersList.filter((e) => e.id && !e.editable).map((e) => e.id!),
		onSelect: handleOnSelect,
		onSelectAll: (isSelected, rows) => rows.forEach((row) => handleOnSelect(row, isSelected)),
		style: { backgroundColor: '#c8e6c9' },
		hideSelectAll: !playersList.find((e) => e.editable),
		hideSelectColumn: !playersList.find((e) => e.editable) || !isAdmin,
		selectColumnStyle: ({ checked, disabled, rowIndex, rowKey }) =>
			playersList[rowIndex].editable ? {} : { backgroundColor: '#dc3545' },
	};

	const addEdit = (player: PlayerDTO = getEmptyPlayer()) => {
		console.log('addEdit : ', player);
		dispatch(PlayerAction.setPlayer(player));
		currentHistory.push('/player/edit');
	};

	const deleteRow = () => {
		if (!selectedRows) return;
		dispatch(PlayerAction.deletePlayers.request({ players: selectedRows }));
		setSelectedRows([]);
	};

	function goBack() {
		currentHistory.push('/');
	}

	const fieldLabels = {
		name: t('player:field.name'),
		surname: t('player:field.surname'),
		alias: t('player:field.alias'),
		role: t('player:field.role'),
		email: t('player:field.email'),
		phone: t('player:field.phone'),
		filter: t('player:field.filter'),
		goalKeeper: t('player:role.goalKeeper'),
		striker: t('player:role.striker'),
		master: t('player:role.master'),
		edit: t('common:edit'),
	};

	return (
		<>
			<LoadingModal show={isLoadingStore || isLoading} message={t('common:loading')} />
			<Col>
				<Toolsbar selectedLength={selectedRows.length} goBack={goBack} addEdit={addEdit} deleteRow={deleteRow} />
				<Row>
					<Col>
						<BootstrapTable
							bootstrap4
							keyField="id"
							data={playersList}
							columns={columns(isAdmin, fieldLabels, addEdit) as ColumnDescription<PlayerDTO, PlayerDTO>[]}
							selectRow={selectRow}
							expandRow={expandManager(stats, setStats, expandedRows, setExpandedRows, isLoading, setIsLoading)}
							caption={<TableHeader title={'common:route.player'} saved={isSaving} />}
							filter={filterFactory}
							headerClasses="default-background default-color-yellow"
							noDataIndication={() =>
								isAdmin ? (
									<Button variant="success" onClick={() => addEdit()}>
										{t('player:add')}
									</Button>
								) : (
									<p>{t('player:no_data')}</p>
								)
							}
							striped
							hover
						/>
					</Col>
				</Row>
			</Col>
		</>
	);
};

export default withRouter(PlayerTable);
