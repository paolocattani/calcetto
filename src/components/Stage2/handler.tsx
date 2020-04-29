import React, { useEffect, useState } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { TournamentSelector } from 'selectors';
import { Stage1Selector } from 'selectors/stage1.selector';
import Stage2 from './table';
// FIXME:
import pairsTemplate from './template';
import { Stage1Action } from 'actions';
import { ICell } from 'models';
import { getEmptyCell, generateStructure } from './helper';

interface Stage2HandlerProps extends RouteComponentProps {}

const Stage2Handler: React.FC<Stage2HandlerProps> = () => {
  const dispatch = useDispatch();
  const tournament = useSelector(TournamentSelector.getTournament);
  const Stage1Row = useSelector(Stage1Selector.getSelectedPairs);
  const [reload, isReload] = useState<boolean>(false);
  const [pairs, setPairs] = useState<ICell[][]>();

  // For test only
  useEffect(() => {
    dispatch(Stage1Action.setSelectedPairs(pairsTemplate));
  }, [dispatch]);
  // const pairs = useSelector(Stage1Selector.getSelectedPairs);
  // Trasform rows from stage1 into rows for stage2
  useEffect(() => {
    if (!Stage1Row || Stage1Row.length === 0 || Stage1Row.length % 8 !== 0) return;
    /*
      generateStructure : Genera struttura completa per Stage2
      .map : Assegno alla prima fase le coppie selezionate su Stage1
    */
    const structure = generateStructure(Stage1Row.length).map((row, ii) =>
      ii === 0 ? row.map((e, jj) => ({ ...e, pair: Stage1Row[jj].pair })) : row
    );
    console.log('Stage2 effetc result : ', structure);
    setPairs(structure);
  }, [Stage1Row]);

  const onClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    rowIndex: number,
    colIndex: number,
    winner: boolean
  ) => {
    const elements = pairs!;
    console.log('onClick callback : ', rowIndex, colIndex, winner);
    // addMissignElements(elements, colIndex, rowIndex);
    console.log('Element : ', elements[colIndex - 1][rowIndex - 1]);
    elements![colIndex - 1][rowIndex - 1].winner = winner;
    elements![colIndex - 1][rowIndex].winner = !winner;
    console.log('Elements : ', elements[colIndex - 1]);
    setPairs(elements);
    isReload(!reload);
  };

  console.log('new render ', pairs);
  console.log(generateStructure(8));

  return pairs ? <Stage2 onClick={onClick} rowNumber={8} elements={pairs} /> : null;
};

export default withRouter(Stage2Handler);

const addMissignElements = (elements: ICell[][], colIndex: number, rowIndex: number) => {
  if (!elements[colIndex - 1]) {
    console.log('addMissignElements');
    elements.push([]);
  }
  while (!elements[colIndex - 1][rowIndex]) {
    console.log('addMissignElements');

    elements[colIndex - 1].push({ ...getEmptyCell() });
  }
};
