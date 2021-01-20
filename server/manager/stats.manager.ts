import { logProcess } from '../core/logger';
import { Op } from 'sequelize';
import { StatsPairs, StatsPlayer } from '../database';
import { StatsPlayerDTO } from '../../src/@common/dto/stats/stats.players.dto';
import { StatsPairDTO } from '../../src/@common/dto/stats/stats.pairs.dto';
import { convertEntityToDTO as convertPlayerEntityToDTO } from './player.manager';

// Const
const className = 'Stats Manager : ';

export const getStatsByPlayer = async (playerId: number) => {
	logProcess(className + 'getStatsByPlayer', 'start');
	try {
		const entity = await StatsPlayer.findOne({ where: { playerId } });
		return entity ? playerEntity2DTO(entity) : undefined;
	} catch (error) {
		logProcess(className + 'getStatsByPlayer', ` Error : ${error}`);
	}
	logProcess(className + 'getStatsByPlayer', 'end');
	return undefined;
};

export async function getStatsByPairs(player1Id: number, player2Id: number) {
	logProcess(className + 'getStatsByPairs', 'start');
	try {
		const entity = await StatsPairs.findOne({
			where: {
				[Op.or]: [{ [Op.and]: { player1Id, player2Id } }, { [Op.and]: { pair1Id: player2Id, pair2Id: player1Id } }],
			},
		});
		return entity ? pairEntity2DTO(entity) : undefined;
	} catch (error) {
		logProcess(className + 'getStatsByPairs', ` Error : ${error}`);
	}
	logProcess(className + 'getStatsByPairs', 'end');
	return undefined;
}

export const playerEntity2DTO = (stats: StatsPlayer): StatsPlayerDTO => ({
	...stats,
	player: convertPlayerEntityToDTO(stats.player, 1, false, stats.player.label || ''),
});

export const pairEntity2DTO = (stats: StatsPairs): StatsPairDTO => ({
	...stats,
	player1: convertPlayerEntityToDTO(stats.player1, 1, false, stats.player1.label || ''),
	player2: convertPlayerEntityToDTO(stats.player2, 1, false, stats.player2.label || ''),
});
