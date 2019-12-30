import { Router, Application as ExpressApplication } from 'express';
import util from 'util';
import Player from '../model/sequelize/player.model';
import { logger } from '../core/logger';

export const playerManager = (router: Router): Router =>
  router

    .get('/api/player', async (_req, res, next) => {
      try {
        const users = await Player.findAll({ include: [Player] });
        return res.json(users);
      } catch (err) {
        return next(err);
      }
    })

    .post('/api/player', async (req, res, next) => {
      logger.info(`player controller : req.body => ${util.inspect(req.body)}`);
      try {
        const player = await Player.create(req.body);
        logger.info(`player controller : created Player => ${player.toString()}`);
        return res.json(player);
      } catch (err) {
        return next(err);
      }
    });
/*
export async function create(req: Request, res: Response) {
    logger.info(`player controller : req.body => ${util.inspect(req.body)}`);
    try {
        const player = await Player.create(req.body as Object);
        logger.info(`player controller : created Player => ${util.inspect(player)}`);
        return res.json(player);
    }
    catch (err) {
        return next(err);
    }
}
*/
