import { Router, Response, NextFunction, Request } from 'express';

// Core
import { logger } from '../core/logger';
import { asyncMiddleware, withAuth, withAdminRights, controllerLogger } from '../core/middleware';

import { AppRequest } from './index';
import { deleteStage1, updatePlacement, generateStage1Rows, updateCell } from '../manager/stage1.manager';
import { UpdatePlacementRequest, UpdatePlacementResponse } from '../../src/@common/models';
import { failure, success } from './common.response';

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
      ? success<UpdatePlacementResponse>(res, 'Posizionamento aggiornato...')
      : failure<UpdatePlacementResponse>(res, 'Posizionamento non aggiornato...');
  })
);

/**
 * Aggiornamento record specifico
 */
router.post(
  '/update/cell',
  withAuth,
  withAdminRights,
  asyncMiddleware(async (req: AppRequest, res: Response) => {
    const { tId, tableName, pair1Id, pair2Id, score } = req.body;
    try {
      await updateCell(tId, tableName, pair1Id, pair2Id, score);
      return res.status(200).json({ saved: true });
    } catch (error) {
      logger.error('/cell error', error);
      return res.status(500).json({ error, saved: false });
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
    const { user } = req;
    try {
      const result = await generateStage1Rows(rows, stageName, user!);
      logger.info('STAGE1 RESULT : ', result);
      return res.status(200).json(result);
    } catch (error) {
      logger.error('Error while update matrix  : ', error);
      return res.status(500).json({ error });
    }
  })
);

// DELETE
router.delete(
  '/',
  withAuth,
  withAdminRights,
  asyncMiddleware(async (req: AppRequest, res: Response) => {
    const { tId } = req.body;
    await deleteStage1(tId);
    return res.status(200).json({ saved: true });
  })
);

export default router;
