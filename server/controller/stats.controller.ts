import { Router, Request, Response } from 'express';
import { StatsPairDTO } from '../../src/@common/dto/stats/stats.pairs.dto';
import {
	StatsError,
	StatsPairFromPlayerResponse,
	StatsPairRequest,
	StatsPairResponse,
	StatsPlayerResponse,
} from '../../src/@common/models/stats.model';
import { logger } from '../core/logger';
import { withAuth, doNotCacheThis, asyncMiddleware } from '../core/middleware';
import { findById } from '../manager/pair.manager';

import { getStatsByPairs, getStatsByPlayer } from '../manager/stats.manager';
import { missingParameters, serverError, success } from './common.response';

const router = Router();
const STATS_LOADED = 'stats:loaded';

router.get(
	'/player/:playerId',
	withAuth,
	doNotCacheThis,
	asyncMiddleware(async (req: Request, res: Response) => {
		try {
			if (!req.params.playerId) {
				return missingParameters(res);
			}
			const playerId = parseInt(req.params.playerId);
			const statsPlayer = await getStatsByPlayer(playerId);
			return success<StatsPlayerResponse>(res, { label: STATS_LOADED }, { statsPlayer });
		} catch (error) {
			return serverError('GET player/list/:tId error ! : ', error, res);
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

			const stats = new Map<number, StatsPairDTO>();
			for (const pairId of pairs) {
				const { player1, player2 } = await findById(pairId);
				if (player1 && player2) {
					const statsPair = await getStatsByPairs(player1.id, player2.id);
					stats.set(pairId, statsPair);
				}
			}
			return success<StatsPairResponse>(res, { label: STATS_LOADED }, { stats });
		} catch (error) {
			return serverError('GET stats/pair error ! : ', error, res);
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
			return success<StatsPairFromPlayerResponse>(res, { label: STATS_LOADED }, { stats });
		} catch (error) {
			return serverError('GET stats/pair error ! : ', error, res);
		}
	})
);

export default router;
