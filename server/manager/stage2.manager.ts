import { logProcess } from '../core/logger';
import Stage2 from '../model/sequelize/stage2.model';
import { IStage2FE } from 'model/dto/stage2.dto';

const className = 'Stage2 Manager : ';

export const listAll = async (tournamentId: number, step?: number): Promise<Stage2[]> => {
  try {
    logProcess(className + 'listAll', 'start');

    const s2: Stage2[] = await Stage2.findAll({
      where: step ? { step, tournamentId } : { tournamentId },
      order: [
        ['step', 'ASC'],
        ['order', 'ASC'],
      ],
    });
    logProcess(className + 'listAll', `end. Found : (${s2.length})`);
    if (!s2) return [];
    return s2.map((e) => e);
  } catch (error) {
    logProcess(className + 'listAll', ` Error : ${error}`);
    return [];
  }
};

export const parseBody = ({ tournamentId, pairId, step, order, rank }: any): IStage2FE => ({
  tournamentId,
  pairId,
  step,
  order,
  rank,
});
