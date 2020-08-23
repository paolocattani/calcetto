import { getBaseLog } from '../core/utils';
import { ICell } from 'redux/models/stage2.model';

export const getIndexes = (pairsNumber: number): number[] => {
  const N = getBaseLog(2, pairsNumber) + 1; // Numero massimo di elementi td
  /*
   * Array per mappare numero riga a numero di elementi td
   * Inizializzo come primo NaN solo per avere un placeholder all'index 0  e iniziare l'analisi da 1
   */
  let indexes = [NaN, N];
  let currentMax = 1;
  for (let ii = 1; ii <= pairsNumber; ii++) {
    if (!indexes[ii]) {
      indexes[ii] = currentMax;
      let growFactor = Math.pow(2, currentMax);
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
