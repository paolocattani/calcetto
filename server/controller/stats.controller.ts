import { Request, Response, Router } from 'express';
import {
	StatsPairMap,
	StatsPairFromPlayerResponse,
	StatsPairRequest,
	StatsPairResponse,
	StatsPlayerResponse,
	StatsPlayerMap,
	StatsPlayerRequest,
	StatsBestPlayersResponse,
	StatsBestPlayersRequest,
	StatsBestPairsRequest,
	StatsBestPairsResponse,
	StatsSummaryResponse,
} from '../../src/@common/models/stats.model';
import { formatDate } from '../../src/@common/utils/date.utils';
import { withAuth, doNotCacheThis, asyncMiddleware } from '../core/middleware';
import { findById } from '../manager/pair.manager';

import { getBestPairs, getBestPlayers, getStatsByPairs, getStatsByPlayer } from '../manager/stats.manager';
import { failure, missingParameters, serverError, success } from './common.response';
const router = Router();

const STATS_LOADED = 'stats:loaded';
const STATS_ERROR = 'stats:error';

router.get(
	'/summary',
	withAuth,
	doNotCacheThis,
	asyncMiddleware(async (req: Request, res: Response) => {
		try {
			const aWeekAgo = new Date();
			aWeekAgo.setDate(aWeekAgo.getDate() - 7);
			const aWeekAgoString = formatDate(aWeekAgo, '-');
			const aMonthAgo = new Date();
			aMonthAgo.setMonth(aMonthAgo.getMonth() - 1);
			const aMonthAgoString = formatDate(aMonthAgo, '-');

			const pairEver = await getBestPairs();
			const pairWeek = await getBestPairs(aWeekAgoString);
			const pairMonth = await getBestPairs(aMonthAgoString);
			const playerEver = await getBestPlayers();
			const playerWeek = await getBestPlayers(aWeekAgoString);
			const playerMonth = await getBestPlayers(aMonthAgoString);
			return pairEver && playerEver
				? success<StatsSummaryResponse>(
						res,
						{ label: STATS_LOADED },
						{
							pairs: { ever: pairEver, month: pairMonth, week: pairWeek },
							players: { ever: playerEver, month: playerMonth, week: playerWeek },
						}
				  )
				: failure<StatsSummaryResponse>(res, { label: STATS_ERROR });
		} catch (error) {
			return serverError('GET stats/pair/best error ! : ', error, res);
		}
	})
);

router.get(
	'/player/bests',
	withAuth,
	doNotCacheThis,
	asyncMiddleware(async (req: Request, res: Response) => {
		try {
			const { from }: StatsBestPlayersRequest = req.query;
			const stats = await getBestPlayers(from);
			return stats
				? success<StatsBestPlayersResponse>(res, { label: STATS_LOADED }, { stats })
				: failure<StatsBestPlayersResponse>(res, { label: STATS_ERROR });
		} catch (error) {
			return serverError('GET stats/player/best error ! : ', error, res);
		}
	})
);
router.get(
	'/pair/bests',
	withAuth,
	doNotCacheThis,
	asyncMiddleware(async (req: Request, res: Response) => {
		try {
			const { from }: StatsBestPairsRequest = req.query;
			const stats = await getBestPairs(from);
			return stats
				? success<StatsBestPairsResponse>(res, { label: STATS_LOADED }, { stats })
				: failure<StatsBestPairsResponse>(res, { label: STATS_ERROR });
		} catch (error) {
			return serverError('GET stats/pair/best error ! : ', error, res);
		}
	})
);

router.post(
	'/player',
	withAuth,
	asyncMiddleware(async (req: Request, res: Response) => {
		try {
			const { players }: StatsPlayerRequest = req.body;
			if (!players || players.length === 0) {
				return missingParameters(res);
			}
			const stats: StatsPlayerMap = {};
			for (const playerId of players) {
				const statsPplayer = await getStatsByPlayer(playerId);
				if (statsPplayer) {
					stats[`${playerId}`] = statsPplayer;
				}
			}
			return success<StatsPlayerResponse>(res, { label: STATS_LOADED }, { stats });
		} catch (error) {
			return serverError('POST stats/player error ! : ', error, res);
		}
	})
);

router.post(
	'/pair',
	withAuth,
	asyncMiddleware(async (req: Request, res: Response) => {
		try {
			const { pairs }: StatsPairRequest = req.body;
			if (!pairs || pairs.length === 0) {
				return missingParameters(res);
			}

			const stats: StatsPairMap = {};
			for (const pairId of pairs) {
				const pair = await findById(pairId);
				if (pair && pair.player1 && pair.player2) {
					const statsPair = await getStatsByPairs(pair.player1.id!, pair.player2.id!);
					if (statsPair) {
						stats[`${pairId}`] = statsPair;
					}
				}
			}
			return success<StatsPairResponse>(res, { label: STATS_LOADED }, { stats });
		} catch (error) {
			return serverError('POST stats/pair error ! : ', error, res);
		}
	})
);

router.get(
	'/pair',
	withAuth,
	doNotCacheThis,
	asyncMiddleware(async (req: Request, res: Response) => {
		try {
			const { player1Id: player1IdString, player2Id: player2IdString } = req.query;
			if (!player1IdString || player2IdString) {
				return missingParameters(res);
			}
			let player1Id: number = parseInt(player1IdString as string);
			let player2Id: number = parseInt(player2IdString as string);
			const stats = await getStatsByPairs(player1Id, player2Id);
			return stats
				? success<StatsPairFromPlayerResponse>(res, { label: STATS_LOADED }, { stats })
				: failure<StatsPairFromPlayerResponse>(res, { label: STATS_ERROR });
		} catch (error) {
			return serverError('GET stats/pair error ! : ', error, res);
		}
	})
);

export default router;
