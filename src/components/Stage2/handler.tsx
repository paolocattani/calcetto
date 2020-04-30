import React, { useEffect, useState } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { TournamentSelector } from 'selectors';
import { Stage1Selector } from 'selectors/stage1.selector';
import Stage2 from './table';
// FIXME:
import { ICell, PairDTO } from 'models';
import { generateStructure } from './helper';

interface Stage2HandlerProps extends RouteComponentProps {}

const Stage2Handler: React.FC<Stage2HandlerProps> = () => {
  const dispatch = useDispatch();
  const tournament = useSelector(TournamentSelector.getTournament);
  const Stage1Row = useSelector(Stage1Selector.getSelectedPairs);
  const [cells, setCells] = useState<ICell[][]>();
  const [pairsList, setPairsList] = useState<PairDTO[]>();

  /*
  // For test only
    useEffect(() => {
      dispatch(Stage1Action.setSelectedPairs(pairsTemplate));
    }, [dispatch]);
  */

  // FIXME: spostare controlli su Stage1
  // Trasform rows from stage1 into rows for stage2
  useEffect(() => {
    if (!Stage1Row) return;
    /*
      generateStructure : Genera struttura completa per Stage2
      .map : Assegno alla prima fase le coppie selezionate su Stage1
    */
    let count = 0;
    let tempPairs: PairDTO[] = [];
    Stage1Row.forEach((e) => {
      if (e) {
        tempPairs.push(...e.map((x) => x.pair));
        count += e.length;
      }
    });

    if (count % 8 != 0) {
      count = 16;
    }
    const structure = generateStructure(count);
    /*
      .map((row, ii) =>
        ii === 0 ? row.map((e, jj) => ({ ...e, pair: Stage1Row[jj].pair })) : row
      );
    */
    console.log('Stage2 effetc result : ', structure);
    setCells(structure);
    setPairsList(tempPairs);
  }, [Stage1Row]);

  const onClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    rowIndex: number,
    colIndex: number,
    winner: boolean
  ) => {
    const elements = [...cells!];
    console.log('elements : ', elements);
    console.log('onClick callback : ', elements![colIndex - 1][rowIndex - 1], rowIndex, colIndex, winner);
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
    console.log('current1,current2 : ', current1.id, current2.id);
    console.log('next : ', next);
    console.log('elements : ', elements);

    setCells(() => elements);
  };

  console.log('Render Stage2Handler : ');

  return cells && pairsList ? <Stage2 pairs={pairsList} onClick={onClick} rowNumber={8} elements={cells} /> : null;
};

export default withRouter(Stage2Handler);
