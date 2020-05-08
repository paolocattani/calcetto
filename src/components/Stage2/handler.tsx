import React, { useEffect, useState } from 'react';
import { withRouter, RouteComponentProps, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// import { TournamentSelector } from 'selectors';
import { Stage1Selector } from 'selectors/stage1.selector';
import Stage2 from './table';
// FIXME:
import { ICell, PairDTO } from 'models';
import { ValueType, ActionMeta } from 'react-select';
import { ListGroup, Button } from 'react-bootstrap';
import commonStyle from '../../common.module.css';
import { Stage2Selector, TournamentSelector } from 'selectors';
import { Stage2Action } from 'actions';
import { LoadingModal } from 'components/core/generic/Commons';

// import template from './template';

interface Stage2HandlerProps extends RouteComponentProps {}

const Stage2Handler: React.FC<Stage2HandlerProps> = () => {
  const currentHistory = useHistory();
  const dispatch = useDispatch();
  const tournament = useSelector(TournamentSelector.getTournament)!;

  const cells = useSelector(Stage2Selector.getCells);
  const rowNumber = useSelector(Stage2Selector.getRowsNumber);
  const isLoading = useSelector(Stage2Selector.isLoading);
  /* Test
    const pairsListFromStore = template as PairDTO[];
  */
  const pairsListFromStore = useSelector(Stage1Selector.getSelectedPairs);
  const [pairsList, setPairsList] = useState<PairDTO[]>(pairsListFromStore);
  // Numbero di coppie iniziare ( Fase 0 )
  //const [rowNumber, setRowNumber] = useState<number>(0);

  // TODO: agigungere controlli su Stage1
  useEffect(() => {
    if (cells) return;
    // Trovo il multiplo di 8 piu vicino al numero di coppie selezionate
    let count = pairsListFromStore.length - 1;
    while (count % 8 !== 0) count++;
    // Genero la struttura completa che poi andro a popolare tramite le azioni da parte dell'utente
    dispatch(Stage2Action.fetchStage2.request({ tournamentId: tournament.id!, count }));
  }, [cells, dispatch, pairsListFromStore.length, tournament.id]);

  function goBack() {
    currentHistory.push('/stage1');
  }
  // Callback tasto vittoria/sconfitta coppia : Sposta la coppia alla fase successiva
  const onClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    rowIndex: number,
    colIndex: number,
    winner: boolean
  ) => {
    const elements = [...cells!];
    // Coppia 1 e 2 dell'incontro corrente
    let current1: ICell | null = null;
    let current2: ICell | null = null;
    // Element Incontro successivo
    let next: ICell | null = null;
    if (rowIndex % 2 !== 0) {
      current1 = elements![colIndex - 1][rowIndex - 1];
      current2 = elements![colIndex - 1][rowIndex];
    } else {
      current1 = elements![colIndex - 1][rowIndex - 1];
      current2 = elements![colIndex - 1][rowIndex - 2];
    }
    next = elements![colIndex][current1.id - 1];

    current1.winner = winner;
    current2.winner = !winner;
    if (next) next.pair = winner ? current1.pair : current2.pair;
    dispatch(Stage2Action.setCells(elements));

    //setCells(() => elements);
  };

  // Questa funzione viene richiamata quando viene selezionata una coppia nella prima colonna
  const onSelectPair = (value: ValueType<PairDTO>, rowIndex: number, actionMeta?: ActionMeta) => {
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
    //setCells(() => elements);
  };

  console.log('render stage2 :', cells, pairsList, rowNumber);
  return cells && pairsList && rowNumber ? (
    <>
      <ListGroup.Item className={commonStyle.functionsList} key={'stage-button'}>
        <Button variant="secondary" onClick={goBack}>
          Fase 1
        </Button>
      </ListGroup.Item>
      <Stage2
        pairs={pairsListFromStore}
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
