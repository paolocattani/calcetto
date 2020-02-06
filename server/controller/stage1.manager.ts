import { Router, Application as ExpressApplication } from 'express';
import util from 'util';
import Stage1Model from '../model/sequelize/s1Matrix.model';
import { logger } from '../core/logger';
import { isDevMode } from '../core/debug';

const router = Router();
router.use('/', (req, res, next) => {
  if (isDevMode()) logger.info(`Stage 1 Manager : ${req.method} ${req.originalUrl.replace('/api/stage1', '')} `);
  next();
});

router.post('/', async (req, res, next) => {
  const model = req.body;
  logger.info('Model : ', model);
  if (model.id === 0) model.id = null;
  try {
    /*
    let player: Player | null = null;
    if (model.id) player = await Player.findOne({ where: { id: model.id } });
    if (player) {
      player.update(model);
      logger.info(`updated => ${player.toString()}`);
    } else {
      player = await Player.create(model);
      logger.info(`created => ${player.toString()}`);
    }
    return res.status(200).json(player);
    */
  } catch (err) {
    return next(err);
  }
});

export default router;
