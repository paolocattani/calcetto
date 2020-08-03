import { Router, NextFunction, Response, Request } from 'express';
// Utils
import chalk from 'chalk';
// Core
import { logger } from '../core/logger';
import { isDevMode } from '../core/debug';
import { asyncMiddleware, withAuth } from '../core/middleware';
// Managers
import { listAll, findById, findByNameAndDate, parseBody, update } from '../manager/tournament.manager';
// Models
import Tournament from '../models/sequelize/tournament.model';
import { TournamentDTO } from '../models/dto/tournament.dto';
import { AppRequest } from './index';
import { isAdmin } from '../manager/auth.manager';

// all API path must be relative to /api/v1/tournament
const router = Router();
router.use('/', (req, res, next) => {
  if (isDevMode())
    logger.info(`Tournament Controller : ${req.method} ${req.originalUrl.replace('/api/v1/tournament', '')} `);
  next();
});

router.get(
  '/list',
  withAuth,
  asyncMiddleware(async (req: AppRequest, res: Response, next: NextFunction) => {
    try {
      return res.status(200).json(await listAll(req.user!));
    } catch (err) {
      logger.error(chalk.redBright('Error while fetching tournament ! : ', err));
      return res.status(500).json({ message: 'Internal Error' });
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
      return res.status(500).json({ message: 'Internal Error' });
    }
  })
);

router.put(
  '/',
  withAuth,
  asyncMiddleware(async (req: AppRequest, res: Response, next: NextFunction) => {
    const result = await update(req.user!, parseBody(req.body));
    return res.sendStatus(result ? 200 : 500);
  })
);

router.post(
  '/',
  withAuth,
  asyncMiddleware(async (req: AppRequest, res: Response, next: NextFunction) => {
    const model = parseBody(req.body);
    const user = req.user!;
    try {
      let t: Tournament | TournamentDTO | null = await findByNameAndDate(model.name, model.date, user);
      if (t) {
        logger.info(`Tournament ${model.name} already exists....`);
        return res.json(t);
      }
      if (isAdmin(user)) {
        model.ownerId = user.id;
        t = await Tournament.create(model);
        logger.info(`tournament controller : created Tournament => ${t}`);
        res.status(200);
      } else {
        logger.info('tournament controller : Torneo non creato in quanto utente non possiede i permessi necessari');
        res.status(401).json({ message: 'Non autorizzato. Permessi insufficienti' });
      }
      return res.json(t);
    } catch (err) {
      return next(err);
    }
  })
);

export default router;
