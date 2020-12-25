import { Router, Response, NextFunction, Request } from 'express';

// Core
import { logger } from '../core/logger';
import { asyncMiddleware, withAuth, withAdminRights, controllerLogger } from '../core/middleware';

import { AppRequest } from './index';
import { updatePlacement } from '../manager/pair.manager';
import { deleteStage1, generateStage1Rows, updateCell } from '../manager/stage1.manager';
import { Stage1Error, UpdateCellRequest, UpdateCellResponse, UpdatePlacementRequest, UpdatePlacementResponse } from '../../src/@common/models';
import { failure, success } from './common.response';
import { subscribe } from '../events/events';

const router = Router();
router.use('/', (req: Request, res: Response, next: NextFunction) =>
	controllerLogger(req, next, 'Stage1 Controller', '/api/v1/stage1')
);

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
			? success<UpdatePlacementResponse>(res, { label: 'stage1:position_done' })
			: failure<Stage1Error>(res, { label: 'stage1:position_not_done' });
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
		const { tId, stageName, pair1Id, pair2Id, score }:UpdateCellRequest = req.body;
		try {
			await updateCell(tId, stageName, pair1Id, pair2Id, score);
			return success<UpdateCellResponse>(res,{label:'stage1:cell_done' },{ saved: true });
		} catch (error) {
			logger.error('/cell error', error);
			return failure<Stage1Error>(res,{label:'stage1:cell_done' });
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
		const { rows, stageName } = req.body;
		const { user,uuid } = req;
		try {
			const result = await generateStage1Rows(rows, stageName, user!);
			// logger.info('STAGE1 RESULT : ', result);
			subscribe(user!, uuid!, result[0].pair.tournamentId);
			return res.status(200).json(result);
		} catch (error) {
			logger.error('Error while update matrix  : ', error);
			return failure<Stage1Error>(res,{label:'stage1:cell_done' });
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
			return res.status(200).json({ saved: true });
		} catch (error) {
			logger.error('Error while update matrix  : ', error);
			return failure<Stage1Error>(res,{label:'stage1:cell_done' });
		}
	})
);

export default router;
