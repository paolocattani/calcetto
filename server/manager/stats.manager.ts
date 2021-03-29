import { logProcess } from '@core/logger';
import { Op, QueryTypes } from 'sequelize';
import { Player, StatsPairs, StatsPlayer } from '../database/models';
import { StatsPlayerDTO } from '@common/dto/stats/stats.players.dto';
import { StatsPairDTO } from '@common/dto/stats/stats.pairs.dto';
import { convertEntityToDTO as convertPlayerEntityToDTO } from './player.manager';
import { asyncForEach, logEntity } from '@core/utils';

// Const
const className = 'Stats Manager : ';

export const getBestPlayers = async (from?: string) => {
	const methodName = className + 'getBestPlayers';
	logProcess(methodName, 'start');
	const result: StatsPlayerDTO[] = [];
	try {
		const rowsLimit = 10;
		const list: Array<StatsPlayer> = await StatsPlayer.sequelize!.query(
			// eslint-disable-next-line quotes
			`select * from :from
				order by totwin desc
				fetch first :rowsLimit rows only`,
			{
				replacements: {
					from: `getPlayerStats${from ? `(${from})` : '()'}`,
					rowsLimit,
				},
				type: QueryTypes.SELECT,
				raw: false,
				// logging: logger.info,
				model: StatsPlayer,
				mapToModel: true,
			}
		);
		if (list) {
			await asyncForEach(list, async (p) => {
				const player = await Player.findByPk(p.playerid);
				p.player = player!;
				const dto = playerEntity2DTO(p);
				result.push(dto);
			});
		}
	} catch (error) {
		logProcess(methodName, 'error', error);
	}
	logProcess(methodName, 'end');
	return result;
};
export const getBestPairs = async (from?: string) => {
	const methodName = className + 'getBestPairs';
	logProcess(methodName, 'start');
	let result: StatsPairDTO[] = [];
	try {
		const rowsLimit = 10;
		const list: Array<StatsPairs> = await StatsPairs.sequelize!.query(
			// eslint-disable-next-line quotes
			`select * from :from
			order by totwin desc
			fetch first :rowsLimit rows only`,
			{
				replacements: {
					from: `getPairStats${from ? `(${from})` : '()'}`,
					rowsLimit,
				},
				type: QueryTypes.SELECT,
				raw: false,
				// logging: logger.info,
				model: StatsPairs,
				mapToModel: true,
			}
		);
		if (list) {
			await asyncForEach(list, async (p) => {
				const player1 = await Player.findByPk(p.player1id);
				p.player1 = player1!;
				const player2 = await Player.findByPk(p.player2id);
				p.player2 = player2!;
				const dto = pairEntity2DTO(p);
				result.push(dto);
			});
			result = list.map(pairEntity2DTO);
		}
	} catch (error) {
		logProcess(methodName, 'error', error);
	}
	logProcess(methodName, 'end');
	return result;
};

export const getStatsByPlayer = async (playerid: number) => {
	const methodName = className + 'getStatsByPlayer';
	logProcess(methodName, 'start');
	let result: StatsPlayerDTO | null = null;
	try {
		const entity = await StatsPlayer.findOne({ where: { playerid } });
		result = entity ? playerEntity2DTO(entity) : null;
	} catch (error) {
		logProcess(methodName, 'error', error);
	}
	logProcess(methodName, 'end');
	return result;
};

export async function getStatsByPairs(player1Id: number, player2Id: number) {
	const methodName = className + 'getStatsByPairs';
	logProcess(methodName, 'start');
	let result: StatsPairDTO | null = null;
	try {
		const entity = await StatsPairs.findOne({
			where: {
				[Op.or]: [{ [Op.and]: { player1Id, player2Id } }, { [Op.and]: { player1Id: player2Id, player2Id: player1Id } }],
			},
		});
		result = entity ? pairEntity2DTO(entity) : null;
	} catch (error) {
		logProcess(methodName, 'error', error);
	}
	logProcess(methodName, 'end');
	return result;
}

export const playerEntity2DTO = (stats: StatsPlayer): StatsPlayerDTO => ({
	...JSON.parse(logEntity(stats)),
	player: convertPlayerEntityToDTO(stats.player, 1, false, stats.player.label || ''),
});

export const pairEntity2DTO = (stats: StatsPairs): StatsPairDTO => ({
	...JSON.parse(logEntity(stats)),
	player1: convertPlayerEntityToDTO(stats.player1, 1, false, stats.player1.label || ''),
	player2: convertPlayerEntityToDTO(stats.player2, 1, false, stats.player2.label || ''),
});
