import { logProcess } from '../core/logger';
import { TournamentDTO, TournamentProgress, UserDTO, UserRole } from '../../src/@common/dto';
import { Tournament } from '../database/models';
import { Op, WhereOptions } from 'sequelize';
import { getWhereFromMap, lowerWrapper, dateInRageWrapper } from '../core/utils';
import { Message, SessionStatus } from '../../src/@common/models';
import { sendNotifications } from '../events/events';

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

//
export const deleteTournament = async (tournament: TournamentDTO): Promise<number> =>
	await Tournament.destroy({ where: { id: tournament.id } });
export const deleteAllTournament = async (): Promise<void> => await Tournament.truncate({ cascade: true });

// Aggiorna un torneo esistente
export const update = async (user: UserDTO, model: TournamentDTO): Promise<TournamentDTO> => {
	logProcess(className + 'update', 'start');
	try {
		const params = new Map<string, WhereOptions | Object | number>();
		params.set('id', model.id!);
		const t = await findByParams(params, user);
		if (!t) {
			logProcess(className + 'update', 'end : Tournament not found');
			return model;
		}
		/*
			Se sto passando da TournamentProgress.PairsSelection a TournamentProgress.Stage1
			aggiorno i client collegati che c'è un nuovo torneo disponibile
		*/
		if (t.public && t.progress === TournamentProgress.PairsSelection && model.progress === TournamentProgress.Stage1) {
			const message: Message = {
				status: SessionStatus.TOURNAMENT_NEW,
				label: 'common:notification.tournament_new',
				data: { name: model.name, date: model.date },
			};
			sendNotifications(message);
		}
		/*
			Se sto passando da TournamentProgress.Stage1 a TournamentProgress.Stage2
			aggiorno i client collegati che è disponibile una nuova fase
		*/
		if (t.public && t.progress === TournamentProgress.Stage1 && model.progress === TournamentProgress.Stage2) {
			const message: Message = {
				status: SessionStatus.TOURNAMENT_UPDATE,
				label: 'common:notification.tournament_update',
				data: { name: model.name, date: model.date },
			};
			sendNotifications(message);
		}
		/*
			Se sto passando da TournamentProgress.Stage1 a TournamentProgress.PairsSelection
			aggiorno i client collegati che il torneo non è piu disponibile
			FIXME: Questa casistica è gia coperta da STAGE1_DELETE
		*/
		if (t.public && t.progress === TournamentProgress.Stage1 && model.progress === TournamentProgress.PairsSelection) {
			const message: Message = {
				status: SessionStatus.TOURNAMENT_DELETE,
				label: 'common:notification.tournament_delete',
				data: { name: model.name, date: model.date },
			};
			sendNotifications(message);
		}
		const result = await t.update({
			progress: model.progress,
			autoOrder: model.autoOrder,
		});
		logProcess(className + 'update', 'end');
		return convertEntityToDTO(result);
	} catch (error) {
		logProcess(className + 'update', 'error');
		return model;
	}
};

// Cerca un torneo tramite ID
export const findById = async (user: UserDTO, tId: number): Promise<TournamentDTO | null> => {
	logProcess(className + 'findById', 'start');
	const params = new Map<string, WhereOptions | Object>();
	params.set('id', tId);
	const result = await findByParams(params, user);
	logProcess(className + 'findById', 'end');
	return result ? convertEntityToDTO(result) : null;
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
	return result ? convertEntityToDTO(result) : null;
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
 * @param t : Tournament tournament entity
 */
export const convertEntityToDTO = (t: Tournament): TournamentDTO => ({
	id: t?.id,
	name: t?.name ?? '',
	date: t?.date ?? new Date(),
	progress: t?.progress ?? TournamentProgress.New,
	public: t?.public ?? false,
	autoOrder: t?.autoOrder ?? true,
	label: t?.label ?? '',
	ownerId: t?.ownerId ?? 0,
});

export const parseBody = (body: any) =>
	({
		id: body.id ?? null,
		name: body.name ?? null,
		date: body.date ?? null,
		progress: body.progress ?? null,
		public: body.public ?? null,
		autoOrder: body.autoOrder ?? null,
		label: body.label ?? null,
		ownerId: body?.ownerId,
	} as TournamentDTO);
