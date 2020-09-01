import { logProcess, logger } from '../core/logger';
// Db
import { dbConnection } from '../models/server/AppServer';
// Models
import { Stage2, Pair } from '../models/sequelize';
import { IStage2FE, ICell, PairDTO, UserDTO } from '../models/dto';
import { isAdmin } from './auth.manager';
import { rowToModel } from './pair.manager';
import { WhereOptions } from 'sequelize';

const className = 'Stage2 Manager : ';

export const updateCells = async (cell1: ICell, cell2: ICell): Promise<boolean> => {
  logProcess(className + 'updateCells', 'start');
  logger.info('updateCells : ', cell1, cell2);
  try {
    // Cella 1
    if (cell1.pair && cell1.pair.id)
      await updateSingleCell(
        cell1.pair.tId,
        cell1.cellColIndex,
        cell1.cellRowIndex,
        cell1.matchId,
        cell1.pair,
        cell1.isWinner
      );

    // Cella 1
    if (cell2.pair && cell2.pair.id)
      await updateSingleCell(
        cell2.pair.tId,
        cell2.cellColIndex,
        cell2.cellRowIndex,
        cell2.matchId,
        cell2.pair,
        cell2.isWinner
      );
    logProcess(className + 'updateCells', 'end');
    return true;
  } catch (error) {
    logProcess(className + 'updateCells', error);
    logger.error('updateCells : ', error);
    return false;
  }
};

export const updateSingleCell = async (
  tournamentId: number,
  step: number,
  rowIndex: number,
  matchId: number,
  pair: PairDTO,
  isWinner: boolean
): Promise<boolean> => {
  logProcess(className + 'updateSingleCell', 'start');
  let result = false;
  try {
    // Reperisco la cella corrente e aggiorno
    const record = await Stage2.findOne({ where: { tournamentId, step, order: rowIndex } });
    if (record) {
      await record.update({ pairId: pair.id });
      if (isWinner) await updateSingleCell(tournamentId, step, matchId, 0, pair, false);
      result = true;
    }
  } catch (error) {
    logger.error('updateSingleCell. Error : ', error);
    result = false;
  } finally {
    logProcess(className + 'updateSingleCell', 'end');
    return result;
  }
};

export const countStage2 = async (tournamentId: number): Promise<number> => {
  logProcess(className + 'countStage2', 'start');
  if (!tournamentId) logger.info('Missing tournamentId...');
  try {
    const count = await Stage2.count({ where: { tournamentId, step: 0 } });
    logProcess(className + 'countStage2', `end (${count})`);
    return count;
  } catch (error) {
    logProcess(className + 'countStage2', error);
    logger.error('countStage2 : ', error);
    return 0;
  }
};

// FIXME:
export const generateStage2Rows = async (
  tournamentId: number,
  rowsNumber: number,
  user: UserDTO
): Promise<ICell[][]> => {
  logProcess(className + 'generateStage2Rows', 'start');
  const transaction = await dbConnection.transaction();
  const structure = generateStructure(rowsNumber);
  const cells: ICell[][] = new Array(structure.length).fill([]);
  try {
    for (let ii = 0; ii < structure.length; ii++) {
      for (let jj = 0; jj < structure[ii].length; jj++) {
        let record: Stage2 | null;
        const where: WhereOptions = { tournamentId, order: jj, step: ii };
        if (isAdmin(user)) {
          [record] = await Stage2.findOrCreate({
            transaction,
            where,
            defaults: { tournamentId, order: jj, step: ii },
          });
          if (record.pairId) {
            const pair = await Pair.findOne({
              where: { id: record.pairId },
              include: [Pair.associations.tournament, Pair.associations.player1, Pair.associations.player2],
            });
            record.pair = pair!;
          }
        } else
          record = await Stage2.findOne({
            where,
            include: [
              Stage2.associations.pair,
              Pair.associations.tournament,
              Pair.associations.player1,
              Pair.associations.player2,
            ],
          });
        if (record?.pair) structure[ii][jj].pair = rowToModel(record.pair, 0);
        // if (ii === 0) logger.info(`Pushing ${ii} , ${jj} : `, structure[ii][jj].pair);
        cells[ii].push(structure[ii][jj]);
      }
    }
    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    logProcess(className + 'generateStage2Rows', error);
    logger.error('generateStage2Rows : ', error);
    return structure;
  }
  logProcess(className + 'generateStage2Rows', 'end');

  return structure;
};

export const deleteStage2 = async (tournamentId: number) => {
  logProcess(className + 'deleteStage2', 'start');
  try {
    await Stage2.destroy({ where: { tournamentId } });
  } catch (error) {
    logProcess(className + 'deleteStage2', 'error');
    logger.error('deleteStage2 : ', error);
  }
  logProcess(className + 'deleteStage2', 'end');
};

export const parseBody = ({ tournamentId, pairId, step, order, rank }: any): IStage2FE => ({
  tournamentId,
  pairId,
  step,
  order,
  rank,
});

// Helper
/*
	_______________________________________________________________________
	| n.   |                      |                   |                   |
	| Riga |     16 coppie        |     8 Coppie      |   4 Coppie        |
	|______|______________________|___________________|___________________|
	|	     |	( rowSpan )		      |		( rowSpan )	    |	   ( rowSpan )    |
	|      | 	                    |                   |                   |   Escludendo il primo elemento e ossevando le righe da 2 a 32 si
	|  1   | 1 - 2 - 4 - 8 - 16   | 1 - 2 - 4 - 8     | 1 - 2 - 4         |  	può notare che la seguenza ha la forma di una piramide.
	|  2   | 1                    | 1                 | 1                 |  	Esempio N= 32 :
	|  3   | 1 - 2                | 1 - 2             | 1 - 2             |
	|  4   | 1                    | 1                 | 1                 |  		     | 6
	|  5   | 1 - 2 - 4            | 1 - 2 - 4         |                   |  	       |                                 5
	|  6   | 1                    | 1                 |                   |  	       |                 4                               4
	|  7   | 1 - 2                | 1 - 2             |                   |  	       |         3               3               3               3
	|  8   | 1                    | 1                 |                   |  	       |     2       2       2       2       2       2       2       2
	|  9   | 1 - 2 - 4 - 8        |                   |                   |          |   1   1   1   1   1   1   1   1   1   1   1   1   1   1   1   1
	|  10  | 1                    |                   |                   |     _____|___________________________________________________________________
	|  11  | 1 - 2                |                   |                   |     n.   | 1 2 3 4 5 6 7 8 9 1 1 1 1 1 1 1 1 1 1 2 2 2 2 2 2 2 2 2 2 3 3 3
	|  12  | 1                    |                   |                   |		Riga |                     0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2
	|  13  | 1 - 2 - 4            |                   |                   |
	|  14  | 1                    |                   |                   |
	|  15  | 1 - 2                |                   |                   |
	|  16  | 1                    |                   |                   |
	|______|______________________|___________________|___________________|


Posso calcolare un array contenente il numero di elementi che ogni riga deve contenere.

Dato:
	- N  : numero di righe ( = 32 )
	- currentMax : valore da assegnare alla seguenza corrente ( 1, 2 ,3, 4, 5, 6, .... )
	- jj : il numero di multipli da calcolare per ogni seguenza ( jj <= N )

Partendo ad esempio da un array vuoto di lunghezza N:
	- Se l'elemento con indice "ii" dell'array non contiene nessun valore allora gli assegno "currentMax".
	- Il fattore distanziale tra un elemento e l'altro è : growFactor = Math.pow(2, currentMax);
	- Tutti gli elementi con indice jj = ii + growFactor * jj hanno quindi valore "currentMax"

Il rowSpan da assegnare al singolo elemento è calcolato come 2^jj. ( 0<=jj<= N+1 )


*/
export function getBaseLog(x: number, y: number) {
  return Math.log(y) / Math.log(x);
}

// Genera la struttura per Stage2
export const generateStructure = (rowNumber: number): ICell[][] => {
  const N = getBaseLog(2, rowNumber) + 1;
  let counter = rowNumber * 2;
  const result = new Array(N).fill([]).map((e, ii) => {
    counter /= 2;
    let bounce = true;
    let index = 0;
    let temp: ICell[] = [];
    for (let jj = 0; jj < counter; jj++) {
      if (bounce) index++;
      bounce = !bounce;
      temp.push({
        matchId: index,
        cellColIndex: ii,
        cellRowIndex: jj,
        parentId: ii === 0 ? 0 : jj + 1,
        name: `${ii}-${jj + 1}`,
        pair: undefined,
        isWinner: false,
      });
    }
    return [...temp];
  });
  // console.log('generateStructure : ', result);

  return result;
};
