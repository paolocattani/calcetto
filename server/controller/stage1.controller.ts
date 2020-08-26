import { Router, Response, NextFunction } from 'express';

// Core

import { logger } from '../core/logger';
import { isDevMode } from '../core/debug';
import { asyncMiddleware, withAuth, withAdminRights } from '../core/middleware';

import { AppRequest } from './index';
import { deleteStage1, updatePlacement, generateStage1Rows, getOpposite, updateCell } from '../manager/stage1.manager';

const router = Router();
router.use('/', (req, res, next) => {
  if (isDevMode()) logger.info(`Stage1 Controller : ${req.method} ${req.originalUrl.replace('/api/v1/stage1', '')} `);
  next();
});

router.post(
  '/placement',
  withAuth,
  withAdminRights,
  asyncMiddleware(async (req: AppRequest, res: Response, next: NextFunction) => {
    const { rows } = req.body;
    await updatePlacement(rows);
    return res.status(200).json({ saved: true });
  })
);

/**
 * Cancellazione record
 */
router.delete(
  '/',
  withAuth,
  withAdminRights,
  asyncMiddleware(async (req: AppRequest, res: Response, next: NextFunction) => {
    const { tId } = req.body;
    await deleteStage1(tId);
    return res.status(200).json({ saved: true });
  })
);

/**
 * Aggiornamento record specifico
 */
router.post(
  '/cell',
  withAuth,
  withAdminRights,
  asyncMiddleware(async (req: AppRequest, res: Response, next: NextFunction) => {
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
  asyncMiddleware(async (req: AppRequest, res: Response, next: NextFunction) => {
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

export default router;
