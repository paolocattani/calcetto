import React, { useEffect, useState } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import { TournamentSelector } from 'selectors';
import { Stage1Selector } from 'selectors/stage1.selector';
import Stage2 from './table';
// FIXME:
import { ICell, PairDTO } from 'models';
import { generateStructure } from './helper';
import { ValueType, ActionMeta } from 'react-select';

// import template from './template';

interface Stage2HandlerProps extends RouteComponentProps {}

const Stage2Handler: React.FC<Stage2HandlerProps> = () => {
  /*
    const dispatch = useDispatch();
    const tournament = useSelector(TournamentSelector.getTournament);
  */
  const [cells, setCells] = useState<ICell[][]>();
  /* Test
    const pairsListFromStore = template as PairDTO[];
  */
  const pairsListFromStore = useSelector(Stage1Selector.getSelectedPairs);
  const [pairsList, setPairsList] = useState<PairDTO[]>(pairsListFromStore);
  // Numbero di coppie iniziare ( Fase 0 )
  const [rowNumber, setRowNumber] = useState<number>(0);

  // TODO: agigungere controlli su Stage1
  useEffect(() => {
    // Trovo il multiplo di 8 piu vicino al numero di coppie selezionate
    let count = pairsListFromStore.length - 1;
    while (count % 8 !== 0) count++;
    // Genero la struttura completa che poi andro a popolare tramite le azioni da parte dell'utente
    const structure = generateStructure(count);
    // console.log('Stage2 effetc result : ', structure);
    setCells(structure);
    setRowNumber(count);
  }, [pairsListFromStore.length]);

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
    setCells(() => elements);
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
    setCells(() => elements);
  };

  return cells && pairsList && rowNumber ? (
    <Stage2
      pairs={pairsListFromStore}
      pairsSelect={pairsList}
      onClick={onClick}
      rowNumber={rowNumber}
      elements={cells}
      onSelectPair={onSelectPair}
    />
  ) : null;
};

export default withRouter(Stage2Handler);
