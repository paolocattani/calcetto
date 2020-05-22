import { logProcess, logger } from '../core/logger';
// Db
import { dbConnection } from '../models/server/AppServer';
// Models
import { UserDTO } from '../models/dto/user.dto';
import Stage2Model from '../models/sequelize/stage2.model';
import { IStage2FE, ICell } from '../models/dto/stage2.dto';
import { isAdmin } from './auth.manager';
import { rowToModel } from './pair.manager';
import { PairDTO } from 'models/dto/pair.dto';

const className = 'Stage2 Manager : ';

export const updateCells = async (cell1: ICell, cell2: ICell): Promise<boolean> => {
  logProcess(className + 'updateCells', 'start');
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
    const record = await Stage2Model.findOne({ where: { tournamentId, step, order: rowIndex } });
    if (record) {
      await record.update({ pair });
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
    const count = await Stage2Model.count({ where: { tournamentId, step: 0 } });
    logProcess(className + 'countStage2', `end (${count})`);
    return count;
  } catch (error) {
    logProcess(className + 'countStage2', error);
    logger.error('countStage2 : ', error);
    return 0;
  }
};

export const generateStage2Rows = async (
  tournamentId: number,
  structure: ICell[][],
  user: UserDTO
): Promise<ICell[][]> => {
  logProcess(className + 'generateStage2Rows', 'start');
  const transaction = await dbConnection.transaction();
  const cells: ICell[][] = new Array(structure.length).fill([]);
  try {
    for (let ii = 0; ii < structure.length; ii++) {
      for (let jj = 0; jj < structure[ii].length; jj++) {
        const options = {
          transaction,
          where: { tournamentId, order: jj, step: ii },
          associations: [Stage2Model.associations.pair],
        };
        let record: Stage2Model | null;
        let created: boolean;
        if (isAdmin(user)) [record, created] = await Stage2Model.findOrCreate(options);
        else record = await Stage2Model.findOne(options);
        if (record?.pair) structure[ii][jj].pair = rowToModel(record.pair, 0);
        if (ii === 0) logger.info(`Pushing ${ii} , ${jj} : `, structure[ii][jj].pair);
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
    await Stage2Model.destroy({ where: { tournamentId } });
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
