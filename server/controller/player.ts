import { Router, Application as ExpressApplication } from 'express';
import util from 'util';
import Player from '../model/sequelize/player.model';
import { logger } from '../core/logger';
import { isDevMode } from '../core/debug';

const router = Router();
router.use('/', (req, res, next) => {
  if (isDevMode()) logger.info(`Player Manager : ${req.method} ${req.originalUrl.replace('/api/player', '')} `);
  next();
});

router.get('/list', async (req, res, next) => {
  try {
    const users = await Player.findAll();
    return res.json(users);
  } catch (err) {
    return next(err);
  }
});

router.post('/', async (req, res, next) => {
  const model = req.body;

  try {
    const player = await Player.create(model);
    logger.info(`created => ${player.toString()}`);
    return res.send(200).json(player);
  } catch (err) {
    return next(err);
  }
});

export default router;
