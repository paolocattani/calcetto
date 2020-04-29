import { Router, NextFunction, Response, Request } from 'express';
// Utils
import chalk from 'chalk';
// Core
import { logger } from '../core/logger';
import { isDevMode } from '../core/debug';
import { asyncMiddleware, withAuth } from '../core/middleware';
// Managers
import { listAll, parseBody } from '../manager/stage2.manager';
// Models
import { AppRequest } from './index';
import { IStage2FE } from 'models/dto/stage2.dto';

// all API path must be relative to /api/v1/tournament
const router = Router();
router.use('/', (req, res, next) => {
  if (isDevMode()) logger.info(`Stage2 Manager : ${req.method} ${req.originalUrl.replace('/api/v1/stage2', '')} `);
  next();
});

router.get(
  '/list',
  withAuth,
  asyncMiddleware(async (req: AppRequest, res: Response, next: NextFunction) => {
    try {
      const stage2 = parseBody(req.body);
      return res.status(200).json(await listAll(stage2.tournamentId, stage2.step));
    } catch (err) {
      logger.error(chalk.redBright('Error while fetching tournament ! : ', err));
      return res.status(500).json({ message: 'Internal Error' });
    }
  })
);

router.post(
  '/',
  withAuth,
  asyncMiddleware(async (req: AppRequest, res: Response, next: NextFunction) => {
    try {
      // mi aspetto di ricevere un array di IStage2FE

      const stage2 = req.body.stage2.map((e: any) => parseBody(e));
      const sld = await listAll(stage2.tournamentId, stage2.step);
      return res.status(200).json({ message: 'TODO' });
    } catch (err) {
      logger.error(chalk.redBright('Error while fetching tournament ! : ', err));
      return res.status(500).json({ message: 'Internal Error' });
    }
  })
);

export default router;
