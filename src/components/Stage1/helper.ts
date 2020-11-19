import { PairDTO, Stage1Row } from '../../@common/dto';

/**
 *
 * @param value il valore di partenza
 * @returns il valore opposto a quello di partenze
 *
 *  3->0 , 2->1 , 1->2 , 0->3
 */
export function getOpposite(value: string | null) {
  /*
   * Attenzione :
   *  !0 = true
   *  !''  = true
   *  !null   = true
   *  !undefined  = true
   */
  if (value === null) return null;
  switch (parseInt(value)) {
    case 3:
      return 0;
    case 2:
      return 1;
    case 1:
      return 2;
    case 0:
      return 3;
    default:
      return null;
  }
}

/**
 * @param {*} obj1
 * @param {*} obj2
 */
export function comparator(obj1: Stage1Row, obj2: Stage1Row) {
  // in caso di parità valuto scontro diretto
  if (obj1.total === obj2.total) {
    if (obj1[`col${obj2.rowNumber}`] === 3 || obj1[`col${obj2.rowNumber}`] === 2) {
      return -1;
    } else {
      return 1;
    }
  }
  return obj2.total - obj1.total;
}

/**
 * Questo metodo riceve una lista di coppie PairdDTO e la trasforma in Stage1Row.
 * Viene utilizzato da Stage1.handler per costruire la struttura da passare alla tabella
 * Inoltre viene passata al BE per salvare i dati sul DB.
 *
 * @param pairsList PairDTO[] Lista di coppie
 *
 */
export const rowsGenerator = (pairsList: Array<PairDTO>): Array<Stage1Row> =>
  pairsList.map((e, ii) => {
    const row: Stage1Row = {
      id: `row-${e.tournamentId}-${ii}`,
      rowNumber: ii + 1,
      pair: e,
      total: 0,
      placement: e.placement || 0,
    };
    for (let jj = 1; jj <= pairsList.length; jj++) {
      row[`col${jj}`] = null;
    }
    return row;
  });
