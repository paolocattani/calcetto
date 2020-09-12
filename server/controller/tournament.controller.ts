import { Router, NextFunction, Response, Request } from 'express';
// Utils
import chalk from 'chalk';
// Core
import { logger } from '../core/logger';
import { asyncMiddleware, withAuth, withAdminRights, logController } from '../core/middleware';
// Managers
import { listAll, findById, findByNameAndDate, parseBody, update } from '../manager/tournament.manager';
// Models
import Tournament from '../models/sequelize/tournament.model';
import { TournamentDTO } from '../../src/@common/dto';
import { AppRequest } from './index';
import { failure, success, unexpectedServerError } from './common';

// all API path must be relative to /api/v1/tournament
const router = Router();
router.use('/', (req: Request, res: Response, next: NextFunction) =>
  logController(req, next, 'Tournament Controller', '/api/v1/tournament')
);

// GET
router.get(
  '/list',
  withAuth,
  asyncMiddleware(async (req: AppRequest, res: Response, next: NextFunction) => {
    try {
      return res.status(200).json(await listAll(req.user!));
    } catch (err) {
      logger.error(chalk.redBright('Error while fetching tournament ! : ', err));
      return unexpectedServerError(res);
    }
  })
);

router.get(
  '/:tId',
  withAuth,
  asyncMiddleware(async (req: AppRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.params.tId) return res.status(500).json({ message: 'Invalid data' });
      const t = await findById(req.user!, parseInt(req.params.tId));
      if (!t) return res.status(500).json({ message: 'Not found' });
      return res.status(200).json(await findById(req.user!, parseInt(req.params.tId)));
    } catch (err) {
      logger.error(chalk.redBright('Error while fetching tournament ! : ', err));
      return unexpectedServerError(res);
    }
  })
);

// PUT
router.put(
  '/',
  withAuth,
  asyncMiddleware(async (req: AppRequest, res: Response, next: NextFunction) => {
    try {
      const tournament = await update(req.user!, parseBody(req.body));
      return success(res, 'Torneo salvato', 'Save complete', { tournament });
    } catch (err) {
      return unexpectedServerError(res);
    }
  })
);

// POST
router.post(
  '/',
  withAuth,
  withAdminRights,
  asyncMiddleware(async (req: AppRequest, res: Response, next: NextFunction) => {
    const model = parseBody(req.body);
    const user = req.user!;
    try {
      let t: Tournament | TournamentDTO | null = await findByNameAndDate(model.name, model.date, user);
      if (t) {
        logger.info(`Tournament ${model.name} already exists....`);
        return failure(res, 'Torneo gia presente', `Tournament ${model.name} already exists`);
      }
      model.ownerId = user.id;
      t = await Tournament.create(model);
      logger.info(`Created Tournament => ${t}`);
      return success(res, 'Torneo salvato', 'Save complete', { tournament: t });
    } catch (err) {
      return unexpectedServerError(res);
    }
  })
);

export default router;
