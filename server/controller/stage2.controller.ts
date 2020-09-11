import { Router, NextFunction, Response, Request } from 'express';
// Utils
import chalk from 'chalk';
// Core
import { logger } from '../core/logger';
import { asyncMiddleware, withAuth, withAdminRights, logController } from '../core/middleware';
// Managers
import { generateStage2Rows, countStage2, updateCells, deleteStage2 } from '../manager/stage2.manager';
// Models
import { AppRequest } from './index';
import { fetchPairsStage2 } from '../manager/pair.manager';

// all API path must be relative to /api/v1/stage2
const router = Router();
router.use('/', (req: Request, res: Response, next: NextFunction) =>
  logController(req, next, 'Stage2 Controller', '/api/v1/stage2')
);

// Generazione struttura / reperimento dati
router.post(
  '/',
  withAuth,
  asyncMiddleware(async (req: AppRequest, res: Response, next: NextFunction) => {
    try {
      const { tournamentId, rowsNumber } = req.body;
      let count = rowsNumber;
      if (rowsNumber === 0) {
        count = await countStage2(tournamentId);
      }
      const model = await generateStage2Rows(tournamentId, count, req.user!);
      return res.status(200).json(model);
    } catch (err) {
      logger.error(chalk.redBright('Error while fetching Stage2 ! : ', err));
      return res.status(500).json({ message: 'Internal Error' });
    }
  })
);

router.get(
  '/pairs/:tournamentId',
  withAuth,
  asyncMiddleware(async (req: AppRequest, res: Response, next: NextFunction) => {
    try {
      const { tournamentId } = req.params;
      const pairs = await fetchPairsStage2(parseInt(tournamentId));
      return res.status(200).json({ pairs });
    } catch (err) {
      logger.error(chalk.redBright('Error while fetching stage2 pairs ! : ', err));
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
