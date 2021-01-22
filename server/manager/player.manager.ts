// Models/Types
import { PlayerDTO, PlayerRole } from '../../src/@common/dto';
import { Player } from '../database/models';
// Logger utils
import { logProcess } from '../core/logger';
import { WhereOptions } from 'sequelize';
import { getWhereFromMap } from '../core/utils';

// Const
const className = 'Player Manager : ';

export const listAllInTournament = async (tId: number): Promise<PlayerDTO[]> => {
	try {
		logProcess(className + 'listAllInTournament', 'start');
		const users = await Player.scope('withPairs').findAll({
			order: [
				['alias', 'DESC'],
				['name', 'DESC'],
				['surname', 'DESC'],
			],
		});
		logProcess(className + 'listAllInTournament', 'users fetched');

		const result = users
			.filter((player) => {
				// Se il giocatore non ha alias e nome lo escludo in quanto non sarebbe identificabile nella selezione delle coppie
				if (player.alias === '' && player.name === '') {
					return false;
				}
				// Se non è ancora stato assegnato a nessuno coppia allora è disponibile
				if (!player.pair1 && !player.pair2) {
					return true;
				}
				/*
				 * Se il giocatore è gia stato assegnato ad una coppia ( in posizione 1 o 2 )
				 * che appartiene al torneo che sto analizzando allora lo devo escludere
				 * perchè non è piu tra quelli selezionabili
				 */
				return !(
					(player.pair1 && player.pair1.find((e) => e.tournamentId === tId)) ||
					(player.pair2 && player.pair2.find((e) => e.tournamentId === tId))
				);
			})
			// Rimappo per escludere le associazioni
			.map((player, ii) => convertEntityToDTO(player, ii, player.editable, player.label));
		logProcess(className + 'listAllInTournament', 'end');
		return result;
	} catch (error) {
		logProcess(className + 'listAllInTournament', ` Error : ${error}`);
		return [];
	}
};

export const listAll = async (): Promise<PlayerDTO[]> => {
	try {
		logProcess(className + 'listAll', 'start');
		const users = await Player.scope('withPairs').findAll({ order: [['id', 'ASC']] });
		logProcess(className + 'listAll', 'end');
		return users.map((player, ii) => convertEntityToDTO(player, ii, player?.editable ?? false, player?.label ?? ''));
	} catch (error) {
		logProcess(className + 'listAll', ` Error : ${error}`);
		return [];
	}
};

export const create = async (model: PlayerDTO): Promise<PlayerDTO> => {
	let player: Player | null = null;
	try {
		logProcess(className + 'create', 'start');
		if (model.id === 0) model.id = null;
		player = await findByNameSurname(model.name, model.surname);
		if (player) {
			logProcess(className + 'create', ' : Player already exists!');
			throw new Error('Player already exists!');
		}

		player = await Player.create(model);
		logProcess(className + 'create', `created => ${player.toString()}`);
	} catch (error) {
		logProcess(className + 'create', ` Error : ${error}`);
	}
	logProcess(className + 'create', 'end');
	return convertEntityToDTO(player!, model.rowNumber, model.editable, model.label);
};

export const update = async (model: PlayerDTO): Promise<PlayerDTO> => {
	let player: Player | null = null;
	try {
		logProcess(className + 'update', 'start');
		if (model.id) player = await Player.findByPk(model.id);
		if (player) {
			await player.update(model);
			logProcess(className + 'update', `updated => ${player.toString()}`);
		}
	} catch (error) {
		logProcess(className + 'update', ` Error : ${error}`);
	}
	logProcess(className + 'update', 'end');
	return convertEntityToDTO(player!, model.rowNumber, model.editable, model.label);
};

export const findByNameSurname = async (name: string, surname: string): Promise<Player | null> => {
	let player: Player | null = null;
	try {
		logProcess(className + 'findById', 'start');
		const params = new Map<string, WhereOptions | Object>();
		params.set('name', name);
		params.set('surname', surname);
		player = await findByParams(params);
	} catch (error) {
		logProcess(className + 'findById', ` Error : ${error}`);
	}
	logProcess(className + 'findById', 'end');
	return player;
};

export const findById = async (id: number): Promise<Player | null> => {
	let player: Player | null = null;
	try {
		logProcess(className + 'findById', 'start');
		player = await Player.findByPk(id);
	} catch (error) {
		logProcess(className + 'findById', ` Error : ${error}`);
	}
	logProcess(className + 'findById', 'end');
	return player;
};

export const deletePlayer = (models: Player[]): Promise<number> =>
	Player.destroy({ where: { id: models.map((e) => e.id) } });

// Utils
export const findByParams = async (parameters: Map<string, WhereOptions | Object>): Promise<Player | null> => {
	try {
		logProcess(className + 'findByParams', 'start');
		const result: Player | null = await Player.findOne({
			where: { ...getWhereFromMap(parameters) },
			order: [['id', 'DESC']],
		});
		logProcess(className + 'findByParams', 'end');
		return result;
	} catch (error) {
		logProcess(className + 'findByParams', ` Error : ${error}`);
		return null;
	}
};

export const parseBody = (body: any): Player =>
	({
		id: body.id,
		name: body.name || '',
		surname: body.surname || '',
		alias: body.alias || '',
		role: body.role || PlayerRole.Striker,
		email: body.email || '',
		phone: body.phone || '',
		match_played: body.match_played || 0,
		match_won: body.match_won || 0,
		total_score: body.total_score || 0,
		editable: body.editable,
	} as Player);

/**
 * Converte l'entity in un DTO da passare al FE.
 *
 * @param player  Player entity
 */
export const convertEntityToDTO = (player: Player, index: number, editable: boolean, label: string): PlayerDTO => ({
	id: player?.id ?? 0,
	rowNumber: index,
	name: player?.name ?? '',
	surname: player?.surname ?? '',
	alias: player?.alias ?? '',
	label: label,
	email: player?.email ?? '',
	phone: player?.phone ?? '',
	role: player?.role ?? PlayerRole.GoalKeeper,
	match_played: player?.match_played ?? 0,
	match_won: player?.match_won ?? 0,
	total_score: player?.total_score ?? 0,
	editable: editable,
});
