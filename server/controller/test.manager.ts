import { Router, Application as ExpressApplication } from 'express';
import util from 'util';
import Player from '../model/sequelize/player.model';
import { logger } from '../core/logger';

export const testManager = (router: Router): Router =>
  router.get('/api/testSSR', async (_req, res, next) => {
    try {
      const users = await Player.findAll({ include: [Player] });
      return res.json(users);
    } catch (err) {
      return next(err);
    }
  });
