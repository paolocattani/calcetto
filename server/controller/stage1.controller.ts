import { Router, Response } from 'express';

// Core
import { logger } from '../core/logger';
import { asyncMiddleware, withAuth, withAdminRights } from '../middleware';

import { AppRequest } from './index';
import { updatePlacement } from '../manager/pair.manager';
import { deleteStage1, generateStage1Rows, updateCell } from '../manager/stage1.manager';
import {
	FetchStage1Request,
	FetchStage1Response,
	SessionStatus,
	Stage1Error,
	UpdateCellRequest,
	UpdateCellResponse,
	UpdatePlacementRequest,
	UpdatePlacementResponse,
} from '../../src/@common/models';
import { failure, success } from './common.response';
import { sendNotifications, subscribe } from '../events/events_old';
import { TournamentProgress } from '../../src/@common/dto';

const router = Router();

// GET

// PUT
router.put(
	'/update/placement',
	withAuth,
	withAdminRights,
	asyncMiddleware(async (req: AppRequest, res: Response) => {
		const { rows }: UpdatePlacementRequest = req.body;
		const result = await updatePlacement(rows);
		return result
			? success<UpdatePlacementResponse>(res, { key: 'stage1:position_done' })
			: failure<Stage1Error>(res, { key: 'stage1:position_not_done' });
	})
);

/**
 * Aggiornamento record specifico
 */
router.put(
	'/update/cell',
	withAuth,
	withAdminRights,
	asyncMiddleware(async (req: AppRequest, res: Response) => {
		const { tId, stageName, pair1Id, pair2Id, score }: UpdateCellRequest = req.body;
		try {
			await updateCell(tId, stageName, pair1Id, pair2Id, score);
			const message = { status: SessionStatus.STAGE1_UPDATE, label: 'common:notification.updating' };
			sendNotifications(message, tId, TournamentProgress.Stage1);
			return success<UpdateCellResponse>(res, { key: 'stage1:cell_done' }, { saved: true });
		} catch (error) {
			logger.error('/cell error', error);
			return failure<Stage1Error>(res, { key: 'stage1:cell_done' });
		}
	})
);

// POST
/**
 *
 * Reperimento e aggiornamento tabella Stage1.
 * Riceva da FE : rows e stageName
 *  @param stageName : nome della tabella ( girone )
 *  @param rows : righe del girone
 *
 */
router.post(
	'/',
	withAuth,
	asyncMiddleware(async (req: AppRequest, res: Response) => {
		const { stageName, pairsList }: FetchStage1Request = req.body;
		const { user, uuid } = req;
		try {
			const result = await generateStage1Rows(pairsList, stageName, user!);
			// logger.info('STAGE1 RESULT : ', result);
			subscribe(user!, uuid!, result[0].pair.tournamentId, TournamentProgress.Stage1);
			return success<FetchStage1Response>(res, { key: 'stage1:loaded' }, { rows: result, stageName, pairsList });
		} catch (error) {
			logger.error('Error while update matrix  : ', error);
			return failure<Stage1Error>(res, { key: 'stage1:error' });
		}
	})
);

// DELETE
router.delete(
	'/',
	withAuth,
	withAdminRights,
	asyncMiddleware(async (req: AppRequest, res: Response) => {
		try {
			const { tId } = req.body;
			await deleteStage1(tId);
			return success<UpdateCellResponse>(res, { key: 'stage1:deleted' }, { saved: true });
		} catch (error) {
			logger.error('Error while update matrix  : ', error);
			return failure<Stage1Error>(res, { key: 'stage1:error' });
		}
	})
);

export default router;
