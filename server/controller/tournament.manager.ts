import { Router, NextFunction, Response, Request } from 'express';
import { logger } from '../core/logger';
import Tournament from '../model/sequelize/tournament.model';
import { isDevMode } from '../core/debug';
import chalk from 'chalk';
import { asyncMiddleware } from '../core/middleware';
import { getSecret } from '../core/utils';
import jwt from 'jsonwebtoken';
import User from 'model/sequelize/user.model';
import { isAdmin, getUserFromToken } from './auth.manager';

// all API path must be relative to /api/v1/tournament
const router = Router();
router.use('/', (req, res, next) => {
  if (isDevMode())
    logger.info(`Tournament Manager : ${req.method} ${req.originalUrl.replace('/api/v1/tournament', '')} `);
  next();
});

router.get(
  '/list',
  asyncMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const t: Tournament[] = await Tournament.findAll({ order: [['name', 'DESC']] });
      if (t) logger.info(chalk.greenBright('Tournament fetched !'));
      res.json(t);
    } catch (err) {
      logger.error(chalk.redBright('Error while fetching tournament ! : ', err));
      return next(err);
    }
  })
);

router.get(
  '/:tId',
  asyncMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tId = req.params.tId ? parseInt(req.params.tId) : 0;
      const t: Tournament | null = await Tournament.findOne({ where: { id: tId } });
      res.json(t);
    } catch (err) {
      logger.error(chalk.redBright('Error while fetching tournament ! : ', err));
      return next(err);
    }
  })
);

router.post(
  '/',
  asyncMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    const model = req.body;

    try {
      const isEditable = isAdmin(req.cookies.token);
      const user = await getUserFromToken(req.cookies.token);
      if (isEditable && user) model.ownerId = user.id;
      let t = await Tournament.findOne({ where: { name: model.name } });
      if (t) {
        logger.info(`tournament ${model.name} already exists, updating....`);
        /*
         * FIXME: perchè dovrei aggiornare un torneo gia esistente ?
         * if (isEditable) await t.update(model);
         */
        return res.json(t);
      }
      if (isEditable) {
        t = await Tournament.create(model);
        logger.info(`tournament controller : created Tournament => ${t}`);
      } else {
        t = null;
        logger.info('tournament controller : Torneo non creato in quanto utente non possiede i permessi necessari');
      }
      return res.json(t);
    } catch (err) {
      return next(err);
    }
  })
);

export default router;
