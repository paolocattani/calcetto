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
    const users = await Player.findAll({ order: [['id', 'DESC']] });
    return res.json(users);
  } catch (err) {
    return next(err);
  }
});

router.post('/', async (req, res, next) => {
  const model = req.body;
  logger.info('Model : ', model);
  if (model.id === 0) model.id = null;
  try {
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
  } catch (err) {
    return next(err);
  }
});

router.delete('/', async (req, res, next) => {
  const models: Player[] | [] = req.body || [];
  let rowsAffected = 0;
  for (const model of models) {
    const player = await Player.findByPk(model.id);
    if (player) {
      // soft delete ( paranoid! )
      await player?.destroy();
      // delete
      // await player?.destroy({ force:true });
      rowsAffected++;
    }
  }
  return res.status(200).json({ message: `Rows deleted : ${rowsAffected}` });
});

export default router;
