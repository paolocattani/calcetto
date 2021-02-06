import { logProcess } from '../core/logger';
import { Op, QueryTypes } from 'sequelize';
import { StatsPairs, StatsPlayer } from '../database/models';
import { StatsPlayerDTO } from '../../src/@common/dto/stats/stats.players.dto';
import { StatsPairDTO } from '../../src/@common/dto/stats/stats.pairs.dto';
import { convertEntityToDTO as convertPlayerEntityToDTO } from './player.manager';
import { logEntity } from '../core/utils';

// Const
const className = 'Stats Manager : ';

export const getBestPlayers = async (from?: Date) => {
	const methodName = className + 'getBestPlayers';
	logProcess(methodName, 'start');
	let result: StatsPlayerDTO[] = [];
	try {
		const rowsLimit = 10;
		const list: Array<StatsPlayer> = await StatsPlayer.sequelize!.query(
			`	select *
				from getPlayerStats${from ? `(${from})` : '()'}
				join player player on player.id=sp.playerid
				order by totwin desc
				fetch first ${rowsLimit} only`,
			{ type: QueryTypes.SELECT }
		);
		if (list) {
			result = list.map(playerEntity2DTO);
		}
	} catch (error) {
		logProcess(methodName, 'error', error);
	}
	logProcess(methodName, 'end');
	return result;
};
export const getBestPairs = async (from?: Date) => {
	const methodName = className + 'getBestPairs';
	logProcess(methodName, 'start');
	let result: StatsPairDTO[] = [];
	try {
		const rowsLimit = 10;
		const list: Array<StatsPairs> = await StatsPairs.sequelize!.query(
			`	select *
				from getPairStats${from ? `(${from})` : '()'}
				join player player1 on player1.id=sp.player1id
				join player player2 on player2.id=sp.player2id
				order by totwin desc
				fetch first ${rowsLimit} only`,
			{ type: QueryTypes.SELECT }
		);
		if (list) {
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
