import { Response } from 'express';
// Utils
import chalk from 'chalk';
// Core
import { logger } from '../core/logger';
import { asyncMiddleware, withAuth, withAdminRights, doNotCacheThis } from '../core/middleware';
// Managers
import { generateStage2Rows, countStage2, updateCells, deleteStage2 } from '../manager/stage2.manager';
// Models
import { AppRequest } from './index';
import { fetchPairsStage2 } from '../manager/pair.manager';
import { missingParameters, serverError, success } from './common.response';
import {
	CountStage2PairsRequest,
	CountStage2PairsResponse,
	DeleteStage2Request,
	DeleteStage2Response,
	FetchStage2PairsResponse,
	FetchStage2Request,
	FetchStage2Response,
	Message,
	SessionStatus,
	UpdateStage2CellRequest,
	UpdateStage2CellResponse,
} from '../../src/@common/models';
import { sendNotifications, subscribe } from '../events/events';
import { TournamentProgress } from '../../src/@common/dto';

// all API path must be relative to /api/v2/stage2
import { AppRouter } from './router';
const router = AppRouter.getInstance();

// Generazione struttura / reperimento dati
router.post(
	'/',
	withAuth,
	asyncMiddleware(async (req: AppRequest, res: Response) => {
		try {
			let { tournamentId, count }: FetchStage2Request = req.body;
			const { user, uuid } = req;
			if (!count || count === 0) {
				count = await countStage2(tournamentId);
			}
			const model = await generateStage2Rows(tournamentId, count, req.user!);
			subscribe(user!, uuid!, tournamentId, TournamentProgress.Stage2);
			return success<FetchStage2Response>(res, { label: 'stage2:loaded' }, { cells: model, count });
		} catch (error) {
			logger.error(chalk.redBright('Error while fetching Stage2 ! : ', error));
			return serverError('POST stage2/ error ! : ', error, res);
		}
	})
);

router.get(
	'/pairs/:tournamentId',
	withAuth,
	doNotCacheThis,
	asyncMiddleware(async (req: AppRequest, res: Response) => {
		try {
			if (!req.params.tournamentId) {
				return missingParameters(res);
			}
			const tournamentId = parseInt(req.params.tournamentId);
			const pairs = await fetchPairsStage2(tournamentId);
			return success<FetchStage2PairsResponse>(res, { label: 'stage2:pairs' }, { pairs });
		} catch (error) {
			logger.error(chalk.redBright('Error while fetching pairs Stage2 ! : ', error));
			return serverError('GET stage2/pairs/:tournamentId error ! : ', error, res);
		}
	})
);

// Count numero di incontri step0
router.post(
	'/count',
	withAuth,
	doNotCacheThis,
	asyncMiddleware(async (req: AppRequest, res: Response) => {
		try {
			const { tournamentId }: CountStage2PairsRequest = req.body;
			const count = await countStage2(tournamentId);
			return success<CountStage2PairsResponse>(res, { label: 'stage2:count' }, { count });
		} catch (error) {
			logger.error(chalk.redBright('Error while counting Stage2 ! : ', error));
			return serverError('POST stage2/count error ! : ', error, res);
		}
	})
);

// Aggiornamento celle ( coppia 1 vs coppia2 e vincitore)
router.post(
	'/cells',
	withAuth,
	withAdminRights,
	asyncMiddleware(async (req: AppRequest, res: Response) => {
		try {
			const { cells }: UpdateStage2CellRequest = req.body;
			await updateCells(cells);
			const tournamentId = cells[0].pair!.tournamentId;
			const message: Message = {
				status: SessionStatus.STAGE2_UPDATE,
				label: 'common:notification.updating',
				data: { tournamentId },
			};
			sendNotifications(message, tournamentId, TournamentProgress.Stage2);
			return success<UpdateStage2CellResponse>(res, { label: 'stage2:updated_cell' });
		} catch (error) {
			logger.error(chalk.redBright('Error while updating Stage2 cell ! : ', error));
			return serverError('POST stage2/cells error ! : ', error, res);
		}
	})
);

// Cancellazione Stage2
router.delete(
	'/',
	withAuth,
	withAdminRights,
	asyncMiddleware(async (req: AppRequest, res: Response) => {
		try {
			const { tId }: DeleteStage2Request = req.body;
			await deleteStage2(tId);
			return success<DeleteStage2Response>(res, { label: 'stage2:loaded' });
		} catch (error) {
			logger.error(chalk.redBright('Error while deleting Stage2 ! : ', error));
			return serverError('DELETE stage2/ error ! : ', error, res);
		}
	})
);

export default router;
