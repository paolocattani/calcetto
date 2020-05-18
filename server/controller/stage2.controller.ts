import { Router, NextFunction, Response, Request } from 'express';
// Utils
import chalk from 'chalk';
// Core
import { logger } from '../core/logger';
import { isDevMode } from '../core/debug';
import { asyncMiddleware, withAuth } from '../core/middleware';
// Managers
import { generateStage2Rows } from '../manager/stage2.manager';
// Models
import { AppRequest } from './index';

// all API path must be relative to /api/v1/tournament
const router = Router();
router.use('/', (req, res, next) => {
  if (isDevMode()) logger.info(`Stage2 Controller : ${req.method} ${req.originalUrl.replace('/api/v1/stage2', '')} `);
  next();
});

router.post(
  '/',
  withAuth,
  asyncMiddleware(async (req: AppRequest, res: Response, next: NextFunction) => {
    try {
      const { tournamentId, structure } = req.body;
      const model = await generateStage2Rows(tournamentId, structure, req.user!);
      //logger.info('generateStage2Rows :', model);
      return res.status(200).json(model);
    } catch (err) {
      logger.error(chalk.redBright('Error while fetching Stage2 ! : ', err));
      return res.status(500).json({ message: 'Internal Error' });
    }
  })
);

export default router;
