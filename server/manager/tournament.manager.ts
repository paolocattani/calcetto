import { logProcess, logger } from '../core/logger';
import { TournamentDTO, TournamentProgress } from '../models/dto/tournament.dto';
import Tournament from '../models/sequelize/tournament.model';
import { Op, WhereAttributeHash, Sequelize, WhereOptions } from 'sequelize';
import { UserDTO, UserRole } from '../models/dto/user.dto';
import { getWhereFromMap, justADate, castWrapper, lowerWrapper, dateInRageWrapper } from '../core/utils';

const className = 'Tournament Manager : ';
const defaultFilter = (user: UserDTO) => ({ [Op.or]: [{ ownerId: user.id }, { public: true }] });
export const listAll = async (user: UserDTO): Promise<TournamentDTO[]> => {
  try {
    logProcess(className + 'listAll', 'start');
    /*
     * Per utenti non admin mostro solo i torneo che sono alla fase 1,
     *  perchè dalla selezione torneo passano direttamente alla fase 1
     *  ( senza passare per la selezione giocatori )
     */
    const t: Tournament[] = await Tournament.findAll({
      where:
        user.role !== UserRole.Admin
          ? {
              progress: [TournamentProgress.Stage1, TournamentProgress.Stage2],
              ...defaultFilter(user),
            }
          : { ...defaultFilter(user) },
      order: [
        ['date', 'DESC'],
        ['name', 'DESC'],
      ],
    });

    logProcess(className + 'listAll', `end. Found : (${t.length})`);
    return t.map((e) => convertEntityToDTO(e) as TournamentDTO);
  } catch (error) {
    logProcess(className + 'listAll', ` Error : ${error}`);
    return [];
  }
};

// Aggiorna un torneo esistente
export const update = async (user: UserDTO, model: TournamentDTO): Promise<boolean> => {
  logProcess(className + 'update', 'start');
  try {
    const params = new Map<string, WhereOptions | Object>();
    params.set('id', model.id);
    const t = await findByParams(params, user);
    if (!t) return false;
    else await t.update({ progress: model.progress });
  } catch (error) {
    logProcess(className + 'update', 'error');
    return false;
  }
  logProcess(className + 'update', 'end');
  return true;
};

// Cerca un torneo tramite ID
export const findById = async (user: UserDTO, tId: number): Promise<TournamentDTO | null> => {
  logProcess(className + 'findById', 'start');
  const params = new Map<string, WhereOptions | Object>();
  params.set('id', tId);
  const result = await findByParams(params, user);
  logProcess(className + 'findById', 'end');
  return convertEntityToDTO(result);
};

// Cerca trmite nome e data
export const findByNameAndDate = async (name: string, date: Date, user: UserDTO): Promise<TournamentDTO | null> => {
  logProcess(className + 'findByNameAndDate', 'start');
  const result: Tournament | null = await Tournament.findOne({
    where: {
      [Op.and]: [lowerWrapper('name', name), dateInRageWrapper('date', date, date)],
      ...defaultFilter(user),
    },
    order: [
      ['date', 'DESC'],
      ['name', 'DESC'],
    ],
  });
  logProcess(className + 'findByNameAndDate', 'end');
  return convertEntityToDTO(result);
};

export const findByParams = async (
  parameters: Map<string, WhereOptions | Object>,
  user: UserDTO
): Promise<Tournament | null> => {
  try {
    logProcess(className + 'findByParams', 'start');
    const result: Tournament | null = await Tournament.findOne({
      where: { ...getWhereFromMap(parameters), ...defaultFilter(user) },
      order: [
        ['date', 'DESC'],
        ['name', 'DESC'],
      ],
    });
    logProcess(className + 'findByParams', 'end');
    return result;
  } catch (error) {
    logProcess(className + 'findByParams', ` Error : ${error}`);
    return null;
  }
};

/**
 * Converte l'entity in un DTO da passare al FE.
 * @param user  Tournament entity
 */
export const convertEntityToDTO = (t: Tournament | null): TournamentDTO | null =>
  t
    ? {
        id: t?.id,
        name: t?.name ?? '',
        date: t?.date ?? new Date(),
        progress: t?.progress ?? TournamentProgress.New,
        public: t?.public ?? false,
        label: t?.label ?? '',
        ownerId: t?.ownerId,
      }
    : null;

export const parseBody = (body: any) =>
  ({
    id: body.id ?? null,
    name: body.name ?? null,
    date: body.date ?? null,
    progress: body.progress ?? null,
    public: body.public ?? null,
    label: body.label ?? null,
    ownerId: body?.ownerId,
  } as TournamentDTO);
