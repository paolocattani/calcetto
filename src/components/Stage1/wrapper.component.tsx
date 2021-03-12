// React, Router, Redux
import { useHistory } from 'react-router';
import React from 'react';
import { useDispatch } from 'react-redux';
// Style
import commonStyle from '../../common.module.css';
import { RightArrowIcon, TrashIcon, LeftArrowIcon } from '../core/icons';
import { Button, Col, Row, ButtonGroup, ToggleButton } from 'react-bootstrap';
// Actions, Selectors
import { Stage1Action, Stage2Action, TournamentAction } from '../../redux/actions';
import { AuthSelector, TournamentSelector, Stage1Selector, PairSelector } from '../../redux/selectors';
import Stage1Table from './table.component';
import TournamentBadge from '../Tournament/badge.component';
// Models
import { PairDTO, TournamentProgress } from '../../@common/dto';
import { useSelector } from '../core/types';

/**
 * Wraps multiple table components
 */
// eslint-disable-next-line sonarjs/cognitive-complexity
const Wrapper: React.FC = (): JSX.Element => {
	const currentHistory = useHistory();
	const dispatch = useDispatch();

	// Session
	const session = useSelector(AuthSelector.getAuth);
	// Torneo
	const tournament = useSelector(TournamentSelector.getTournament)!;
	// Sono presenti aggiornamenti
	// const toogleRefresh = useSelector(Stage1Selector.getToogleRefresh);
	// Pairs selected : don't want to refresh conmponent so "... , () => true);""
	const selected = useSelector(Stage1Selector.getSelectedPairs);
	// Lista coppie
	const pairsList = useSelector(PairSelector.getPairsList);

	function goBack() {
		currentHistory.push(session.isAdmin ? '/tournament' : '/');
	}
	function goToStage2() {
		// TODO: eseguire controlli e eventualemente mostrare messaggi utente

		// Se sono un utente che puo modificare e il torneo è in una fase minore ( vedi ordinamento Enum ) di quella attuale
		// allora aggiorno lo stato del torneo
		if (session.isAdmin && tournament.progress < TournamentProgress.Stage2) {
			tournament.progress = TournamentProgress.Stage2;
			dispatch(TournamentAction.update.request({ tournament, fromProgress: TournamentProgress.Stage1 }));
		}

		let count = 8;
		if (selected && selected.length >= 4) {
			count = selected.length - 1;
			while (count % 8 !== 0) count++;
		}
		dispatch(Stage2Action.fetchStage2.request({ tournamentId: tournament.id, count }));
		currentHistory.push('/stage2');
	}

	function resetStage2() {
		dispatch(Stage2Action.delete.request({ tId: tournament.id }));
		dispatch(Stage1Action.resetPairs({}));
	}

	console.log('selected : ', selected);
	const toolsBar = (
		<div className={commonStyle.toolsBarContainer}>
			<Row className={commonStyle.toolsBarRow}>
				<Col>
					<Button variant="secondary" onClick={goBack} className="float-left">
						<LeftArrowIcon /> Indietro
					</Button>
				</Col>
				{tournament.progress > TournamentProgress.Stage1 && session.isAdmin ? (
					<Col>
						<Button
							variant="danger"
							onClick={resetStage2}
							disabled={!session.isAdmin || (session.isAdmin && tournament.progress < TournamentProgress.Stage2)}
						>
							<TrashIcon /> Reset Fase 2
						</Button>
					</Col>
				) : null}
				<Col>
					<Button
						variant="outline-warning"
						className="default-color-white float-right"
						onClick={goToStage2}
						disabled={selected.length < 4 && tournament.progress < TournamentProgress.Stage2}
					>
						<b>Prosegui </b> <RightArrowIcon />
					</Button>
				</Col>
			</Row>
			{tournament.progress <= TournamentProgress.Stage1 && session.isAdmin ? (
				<Row>
					<Col>
						<ButtonGroup toggle className="mb-2">
							<ToggleButton
								type="checkbox"
								variant={!!tournament.autoOrder ? 'success' : 'danger'}
								checked={tournament.autoOrder}
								value="1"
								onChange={(e) =>
									dispatch(
										TournamentAction.update.request({
											tournament: { ...tournament, autoOrder: e.currentTarget.checked },
											fromProgress: tournament.progress,
										})
									)
								}
							>
								{`Ordinamento automatico : ${!!tournament.autoOrder ? 'Attivato ' : ' Disattivato'}`}
							</ToggleButton>
						</ButtonGroup>
					</Col>
				</Row>
			) : null}
		</div>
	);

	return (
		<>
			{toolsBar}
			<TournamentBadge />
			{pairsList ? renderTables(pairsList, tournament.autoOrder) : null}
		</>
	);
};

export default Wrapper;

function renderTables(pairsList: PairDTO[], autoOrder: boolean): JSX.Element[] {
	let stageName = '';
	let stage: Array<PairDTO> = [];
	let stageList: Array<JSX.Element> = [];
	// sort pairs by stage1Name
	[...pairsList]
		.sort((obj1, obj2) => obj1.stage1Name.localeCompare(obj2.stage1Name))
		// FIXME: use .reduce  ?
		.forEach((element, index) => {
			// A rottura di stage1Name
			if (stageName === '') stageName = element.stage1Name;
			if (stageName !== element.stage1Name) {
				stageList.push(
					<Stage1Table key={`Stage1-${stageName}`} stageName={stageName} pairsList={stage} autoOrder={autoOrder} />
				);
				stageName = element.stage1Name;
				stage = [];
			}
			stage.push(element);
		});
	if (stage.length > 0) {
		stageList.push(
			<Stage1Table key={`Stage1-${stageName}`} stageName={stageName} pairsList={stage} autoOrder={autoOrder} />
		);
		// console.log(`stages ${stageName} :`, stage);
	}

	return stageList;
}
