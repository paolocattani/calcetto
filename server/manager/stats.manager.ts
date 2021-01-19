import { logProcess } from '../core/logger';
import { Op } from 'sequelize';
import { StatsPairs, StatsPlayer } from '../database';

// Const
const className = 'Stats Manager : ';

export const getStatsByPlayer = async (playerId: number): Promise<StatsPlayer> => {
	logProcess(className + 'getStatsByPlayer', 'start');
	try {
		return await StatsPlayer.findOne({ where: { playerId } });
	} catch (error) {
		logProcess(className + 'getStatsByPlayer', ` Error : ${error}`);
	}
	logProcess(className + 'getStatsByPlayer', 'end');
};

export async function getStatsByPairs(player1Id: number, player2Id: number): Promise<StatsPairs> {
	logProcess(className + 'getStatsByPairs', 'start');
	try {
		return await StatsPairs.findOne({
			where: {
				[Op.or]: [{ [Op.and]: { player1Id, player2Id } }, { [Op.and]: { pair1Id: player2Id, pair2Id: player1Id } }],
			},
		});
	} catch (error) {
		logProcess(className + 'getStatsByPairs', ` Error : ${error}`);
	}
	logProcess(className + 'getStatsByPairs', 'end');
}
