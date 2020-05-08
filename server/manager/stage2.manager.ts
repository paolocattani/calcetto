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

export const generateStage2Rows = async (tournamentId: number, rowCount: number, user: UserDTO): Promise<ICell[][]> => {
  const transaction = await dbConnection.transaction();
  const N = getBaseLog(2, rowCount) + 1;
  const result = new Array(N).fill([]);
  try {
    let counter = rowCount * 2;
    for (let ii = 0; ii < N; ii++) {
      counter /= 2;
      let bounce = true;
      let index = 0;
      let temp: ICell[] = [];
      for (let jj = 0; jj < counter; jj++) {
        if (bounce) index++;
        bounce = !bounce;
        let record: Stage2Model | null;
        let created = false;
        /*
        if (isAdmin(user))
          [record, created] = await Stage2Model.findOrCreate({
            transaction,
            where: { tournamentId, order: index, step: ii },
            // @ts-ignore
            include: [Stage2Model.associations.pair],
          });
        else
          record = await Stage2Model.findOne({
            transaction,
            where: { tournamentId, order: index, step: ii },
            include: [Stage2Model.associations.pair],
          });
*/
        temp.push({
          id: index,
          parentId: ii === 0 ? 0 : jj + 1,
          name: `${ii}-${jj + 1}`,
          pair: /*record?.pair ? rowToModel(record.pair, record.pair.id - 1) :*/ undefined,
          winner: false,
        });
      }
      result[ii].push(...temp);
    }
    await transaction.commit();
    logger.info('generateStructure : ', result);
  } catch (error) {
    await transaction.rollback();
    logProcess(className + 'updateCell', error);
    logger.error('updateCell : ', error);
    throw new Error(`updateCell  : ${error}`);
  }
  logProcess(className + 'updateCell', 'end');

  return result;
};

export const parseBody = ({ tournamentId, pairId, step, order, rank }: any): IStage2FE => ({
  tournamentId,
  pairId,
  step,
  order,
  rank,
});
