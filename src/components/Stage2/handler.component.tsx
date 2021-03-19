import React, { useState, useEffect } from 'react';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from '../core/types';
import Stage2 from './table.component';
import { Button, Col, Row } from 'react-bootstrap';
import commonStyle from '../../common.module.css';
import { AuthSelector, Stage2Selector, TournamentSelector } from '../../redux/selectors';
import { Stage2Action } from '../../redux/actions';
import { LoadingModal } from '../core/generic/Commons';
import { LeftArrowIcon } from '../core/icons';
import TournamentBadge from '../Tournament/badge.component';
import { fetchPairsStage2 } from '../../redux/services/stage2.service';
import { onClickCallback, onSelectCallback } from './helper';
import { PairDTO, ICell } from '../../@common/dto';
import { SuccessCodes } from '../../@common/models/HttpStatusCode';
import { FetchStage2PairsResponse } from '../../@common/models';
import logger from '../../@common/utils/logger.utils';

type Stage2HandlerProps = RouteComponentProps

// eslint-disable-next-line sonarjs/cognitive-complexity
const Stage2Handler: React.FC<Stage2HandlerProps> = () => {
	const currentHistory = useHistory();
	const dispatch = useDispatch();

	const cells = useSelector(Stage2Selector.getCells, () => false);
	const count = useSelector(Stage2Selector.getCount);
	const isLoading = useSelector(Stage2Selector.isLoading);
	const isAdmin = useSelector(AuthSelector.isAdmin);
	const tournament = useSelector(TournamentSelector.getTournament)!;
	// const pairsListFromStore = useSelector(Stage1Selector.getSelectedPairs);
	const [pairsList, setPairsList] = useState<PairDTO[]>([]);

	function goBack() {
		currentHistory.push('/stage1');
	}

	useEffect(() => {
		if (isAdmin) {
			(async () => {
				dispatch(Stage2Action.setLoading(true));
				const response = await fetchPairsStage2({ tournamentId: tournament.id });
				if (SuccessCodes.includes(response.code)) {
					const result = response as FetchStage2PairsResponse;
					setPairsList(result.pairs);
				}
				dispatch(Stage2Action.setLoading(false));
			})();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [tournament.id]);

	// Callback tasto vittoria/sconfitta coppia : Sposta la coppia alla fase successiva
	const onClick: onClickCallback = (event, rowIndex, colIndex, isWinner) => {
		const elements = [...cells!];
		// Coppia 1 e 2 dell'incontro corrente
		let current1: ICell | null = null;
		let current2: ICell | null = null;
		// Element Incontro successivo
		let next: ICell | null = null;
		if (rowIndex % 2 !== 0) {
			current1 = elements[colIndex - 1][rowIndex - 1];
			current2 = elements[colIndex - 1][rowIndex];
		} else {
			current1 = elements[colIndex - 1][rowIndex - 1];
			current2 = elements[colIndex - 1][rowIndex - 2];
		}
		next = elements[colIndex][current1.matchId - 1];
		logger.info(' onClick : ', current1, current2, next);

		current1.isWinner = isWinner;
		current2.isWinner = !isWinner;
		if (next) next.pair = isWinner ? current1.pair : current2.pair;
		// Update current and next steps
		dispatch(Stage2Action.updateCell.request({ cells: [current1, current2, next], tournament }));
		dispatch(Stage2Action.setCells(elements));
	};

	// Questa funzione viene richiamata quando viene selezionata una coppia nella prima colonna
	const onSelectPair: onSelectCallback = (value, rowIndex, actionMeta) => {
		logger.info(' onSelectPair : ', value, rowIndex);
		if (!pairsList) {
			return;
		}
		const elements = [...cells!];
		const newPair = value as PairDTO;
		const prevPair = elements[0][rowIndex - 1].pair;
		let pairs: Array<PairDTO> = [...pairsList];

		// Se ho selezionato una coppia la elimino dalla lista ( newPair.id esclude il placeholder )
		if (newPair && newPair.id) {
			pairs = pairs.filter((e) => e.id !== newPair.id);
		}
		// Se nella celle era gia presente una coppia la ripristino
		if (prevPair && prevPair.id) {
			pairs = [...pairs, prevPair];
		}
		setPairsList(pairs);
		elements[0][rowIndex - 1].pair = newPair;
		logger.info(' onSelectPair : ', elements[0][rowIndex - 1]);
		dispatch(Stage2Action.setCells(elements));
		dispatch(Stage2Action.updateCell.request({ cells: [elements[0][rowIndex - 1]], tournament }));
	};

	//console.log('render stage2 :', cells, pairsList, rowNumber);
	return cells && count ? (
		<>
			<Col className={commonStyle.toolsBarContainer}>
				<Row className={commonStyle.toolsBarRow}>
					<Col>
						<Button variant="secondary" className="float-left" onClick={goBack}>
							<LeftArrowIcon /> Indietro
						</Button>
					</Col>
				</Row>
			</Col>
			<TournamentBadge />

			<Stage2
				pairsSelect={pairsList}
				onClick={onClick}
				rowNumber={count}
				elements={cells}
				onSelectPair={onSelectPair}
			/>
		</>
	) : (
		<LoadingModal show={isLoading} />
	);
};

export default Stage2Handler;
