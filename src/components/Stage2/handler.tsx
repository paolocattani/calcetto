import React, { useState, useEffect } from 'react';
import { withRouter, RouteComponentProps, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Stage2 from './table';
import { Button, Col, Row } from 'react-bootstrap';
import commonStyle from '../../common.module.css';
import { Stage2Selector, TournamentSelector } from '../../redux/selectors';
import { Stage2Action } from '../../redux/actions';
import { LoadingModal } from '../core/generic/Commons';
import { LeftArrowIcon } from '../core/icons';
import TournamentBadge from '../Tournament/badge';
import { fetchPairsStage2 } from '../../redux/services/stage2.service';
import { onClickCallback, onSelectCallback } from './helper';
import { PairDTO, ICell } from '../../@common/dto';

// import template from './template';

interface Stage2HandlerProps extends RouteComponentProps {}

// eslint-disable-next-line sonarjs/cognitive-complexity
const Stage2Handler: React.FC<Stage2HandlerProps> = () => {
  const currentHistory = useHistory();
  const dispatch = useDispatch();

  const cells = useSelector(Stage2Selector.getCells);
  const rowNumber = useSelector(Stage2Selector.getRowsNumber);
  const isLoading = useSelector(Stage2Selector.isLoading);
  const tournament = useSelector(TournamentSelector.getTournament)!;
  // const pairsListFromStore = useSelector(Stage1Selector.getSelectedPairs);
  const [pairsList, setPairsList] = useState<PairDTO[]>();

  function goBack() {
    currentHistory.push('/stage1');
  }

  useEffect(() => {
    (async () => {
      dispatch(Stage2Action.setLoading(true));
      const result = await fetchPairsStage2(tournament.id!);
      setPairsList(result.pairs);
      dispatch(Stage2Action.setLoading(false));
    })();
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
    console.log(' onClick : ', current1, current2, next);

    current1.isWinner = isWinner;
    current2.isWinner = !isWinner;
    if (next) next.pair = isWinner ? current1.pair : current2.pair;
    dispatch(Stage2Action.updateCell.request({ cell1: current1, cell2: current2 }));
    dispatch(Stage2Action.setCells(elements));
    if (elements[colIndex].length === 1) {
      dispatch(Stage2Action.updateCell.request({ cell1: next, cell2: null }));
    }
  };

  // Questa funzione viene richiamata quando viene selezionata una coppia nella prima colonna
  const onSelectPair: onSelectCallback = (value, rowIndex, actionMeta) => {
    if (!pairsList) {
      return;
    }
    const elements = [...cells!];
    const newPair = value as PairDTO;
    const prevPair = elements[0][rowIndex - 1].pair;
    let pairs: PairDTO[] = [...pairsList];

    // Se ho selezionato una coppia la elimino dalla lista ( questa condizione esclude il placeholder )
    if (newPair && newPair.id) {
      pairs = pairs.filter((e) => e.id !== newPair.id);
    }
    // Se nella celle era gia presente una coppia la ripristino
    if (prevPair && prevPair.id) {
      pairs = [...pairs!, prevPair];
    }
    setPairsList(pairs);
    elements[0][rowIndex - 1].pair = newPair;
    dispatch(Stage2Action.setCells(elements));
    dispatch(Stage2Action.updateCell.request({ cell1: elements[0][rowIndex - 1], cell2: null }));
  };

  //console.log('render stage2 :', cells, pairsList, rowNumber);
  return cells && pairsList && rowNumber ? (
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
        rowNumber={rowNumber}
        elements={cells}
        onSelectPair={onSelectPair}
      />
    </>
  ) : (
    <LoadingModal show={isLoading} />
  );
};

export default withRouter(Stage2Handler);
