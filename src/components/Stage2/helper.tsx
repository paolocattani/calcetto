import { getBaseLog } from '../../@common/utils';
import { ValueType, ActionMeta } from 'react-select';
import { PairDTO, ICell } from '../../@common/dto';

export type onClickCallback = (
  event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  rowIndex: number,
  colIndex: number,
  isWinner: boolean
) => void;

export type onSelectCallback = (value: ValueType<PairDTO, false>, rowIndex: number, actionMeta?: ActionMeta<PairDTO>) => void;
export const getIndexes = (pairsNumber: number): number[] => {
  const N = getBaseLog(2, pairsNumber) + 1; // Numero massimo di elementi td
  /*
   * Array per mappare numero riga a numero di elementi td
   * Inizializzo come primo NaN solo per avere un placeholder all'index 0  e iniziare l'analisi da 1
   */
  const indexes = [NaN, N];
  let currentMax = 1;
  for (let ii = 1; ii <= pairsNumber; ii++) {
    if (!indexes[ii]) {
      indexes[ii] = currentMax;
      const growFactor = Math.pow(2, currentMax);
      for (let jj = 1; ii + growFactor * jj < pairsNumber + 1; jj++) indexes[ii + growFactor * jj] = currentMax;
      currentMax++;
    }
  }
  return indexes;
};

export const getEmptyCell = (name?: string): ICell => ({
  name: '',
  isWinner: false,
  matchId: 0,
  cellRowIndex: 0,
  cellColIndex: 0,
  parentId: 0,
});
