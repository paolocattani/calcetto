import { logProcess, logger } from '../core/logger';
import { getBaseLog } from '../core/utils';
// Db
import { dbConnection } from '../models/server/AppServer';
// Models
import { UserDTO } from '../models/dto/user.dto';
import Stage2Model from '../models/sequelize/stage2.model';
import { IStage2FE, ICell } from '../models/dto/stage2.dto';
import { isAdmin } from './auth.manager';
import { rowToModel } from './pair.manager';

const className = 'Stage2 Manager : ';

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
        // logger.info(`Pushing ${ii} , ${jj} : `, structure[ii][jj]);
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

export const parseBody = ({ tournamentId, pairId, step, order, rank }: any): IStage2FE => ({
  tournamentId,
  pairId,
  step,
  order,
  rank,
});
