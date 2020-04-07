import { logProcess } from '../core/logger';
import { TournamentDTO } from 'model/dto/tournament.dto';
import Tournament from '../model/sequelize/tournament.model';
import { Op } from 'sequelize';

const className = 'Tournament Manager : ';

export const listAll = async (userId: number): Promise<TournamentDTO[]> => {
  try {
    logProcess(className + 'listAll', 'start');

    const t: Tournament[] = await Tournament.findAll({
      where: { [Op.or]: [{ ownerId: userId }, { public: true }] },
      order: [
        ['date', 'DESC'],
        ['name', 'DESC']
      ]
    });
    logProcess(className + 'listAll', `end. Found : (${t.length})`);
    if (!t) return [];
    return t.map(e => convertEntityToDTO(e));
  } catch (error) {
    logProcess(className + 'listAll', ` Error : ${error}`);
    return [];
  }
};
export const update = async (userId: number, model: TournamentDTO): Promise<boolean> => {
  logProcess(className + 'update', 'start');
  try {
    const t = await Tournament.findOne({
      where: { [Op.and]: { id: model.id, [Op.or]: [{ ownerId: userId }, { public: true }] } }
    });
    if (!t) return false;
    await t.update({ progress: model.progress });
  } catch (error) {
    logProcess(className + 'update', 'error');
    return false;
  }
  logProcess(className + 'update', 'end');
  return true;
};

export const findById = async (userId: number, tId: number): Promise<TournamentDTO | null> => {
  try {
    logProcess(className + 'findById', 'start');
    const t = await Tournament.findOne({
      where: { [Op.and]: { id: tId, [Op.or]: [{ ownerId: userId }, { public: true }] } }
    });
    logProcess(className + 'findById', 'end');
    if (!t) return null;
    return convertEntityToDTO(t);
  } catch (error) {
    logProcess(className + 'findById', ` Error : ${error}`);
    return null;
  }
};

export const findByNameAndDate = async (name: string, date: Date): Promise<TournamentDTO | null> => {
  try {
    logProcess(className + 'findByNameAndDate', 'start');

    const t: Tournament | null = await Tournament.findOne({
      where: {
        name,
        date: { [Op.gte]: date, [Op.lte]: date }
      }
    });
    logProcess(className + 'findByNameAndDate', 'end');
    if (!t) return null;
    return convertEntityToDTO(t);
  } catch (error) {
    logProcess(className + 'findByNameAndDate', ` Error : ${error}`);
    return null;
  }
};

/**
 * Converte l'entity in un DTO da passare al FE.
 * @param user  Tournament entity
 */
export const convertEntityToDTO = (t: Tournament | null): TournamentDTO => ({
  id: t?.id,
  name: t?.name ?? '',
  date: t?.date ?? new Date(),
  progress: t?.progress ?? 'New',
  public: t?.public ?? false,
  label: t?.label ?? '',
  ownerId: t?.ownerId
});

export const parseBody = (body: any) =>
  ({
    id: body.id ?? null,
    name: body.name ?? null,
    date: body.date ?? null,
    progress: body.progress ?? null,
    public: body.public ?? null,
    label: body.label ?? null,
    ownerId: body?.ownerId
  } as TournamentDTO);
