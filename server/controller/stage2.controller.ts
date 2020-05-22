import { Router, NextFunction, Response } from 'express';
// Utils
import chalk from 'chalk';
// Core
import { logger } from '../core/logger';
import { isDevMode } from '../core/debug';
import { asyncMiddleware, withAuth, withAdminRights } from '../core/middleware';
// Managers
import { generateStage2Rows, countStage2, updateCells, deleteStage2 } from '../manager/stage2.manager';
// Models
import { AppRequest } from './index';

// all API path must be relative to /api/v1/tournament
const router = Router();
router.use('/', (req, res, next) => {
  if (isDevMode()) logger.info(`Stage2 Controller : ${req.method} ${req.originalUrl.replace('/api/v1/stage2', '')} `);
  next();
});

// Generazione struttura / reperimento dati
router.post(
  '/',
  withAuth,
  asyncMiddleware(async (req: AppRequest, res: Response, next: NextFunction) => {
    try {
      const { tournamentId, structure } = req.body;
      const model = await generateStage2Rows(tournamentId, structure, req.user!);
      return res.status(200).json(model);
    } catch (err) {
      logger.error(chalk.redBright('Error while fetching Stage2 ! : ', err));
      return res.status(500).json({ message: 'Internal Error' });
    }
  })
);

// Count numero di incontri step0
router.post(
  '/count',
  withAuth,
  asyncMiddleware(async (req: AppRequest, res: Response, next: NextFunction) => {
    try {
      const { tournamentId } = req.body;
      const count = await countStage2(tournamentId);
      return res.status(200).json({ count });
    } catch (err) {
      logger.error(chalk.redBright('Error while counting Stage2 ! : ', err));
      return res.status(500).json({ message: 'Internal Error' });
    }
  })
);

// Aggiornamento celle ( coppia 1 vs coppia2 e vincitore)
router.post(
  '/cells',
  withAuth,
  withAdminRights,
  asyncMiddleware(async (req: AppRequest, res: Response, next: NextFunction) => {
    try {
      const { cell1, cell2 } = req.body;
      const count = await updateCells(cell1, cell2);
      return res.status(200).json({ count });
    } catch (err) {
      logger.error(chalk.redBright('Error updating cells ! : ', err));
      return res.status(500).json({ message: 'Internal Error' });
    }
  })
);

// Cancellazione Stage2
router.delete(
  '/',
  withAuth,
  withAdminRights,
  asyncMiddleware(async (req: AppRequest, res: Response, next: NextFunction) => {
    const { tId } = req.body;
    await deleteStage2(tId);
    return res.status(200).json({ saved: true });
  })
);

export default router;
