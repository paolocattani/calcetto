import { Router, Application as ExpressApplication } from 'express';
import Pair from '../model/sequelize/player.model';
import { logger } from '../core/logger';
import { isDevMode } from '../core/debug';

const router = Router();

router.use('/', (req, res, next) => {
  if (isDevMode()) logger.info(`Pair Manager : ${req.method} ${req.originalUrl.replace('/api/pair', '')} `);
  next();
});

router.get('/list', async (req, res, next) => {
  try {
    const users = await Pair.findAll({ order: [['id', 'DESC']] });
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
    let pair: Pair | null = null;
    if (model.id) pair = await Pair.findOne({ where: { id: model.id } });
    if (pair) {
      // pair.update(model);
      logger.info(`updated => ${pair.toString()}`);
    } else {
      // pair = await Pair.create(model);
      logger.info('created => ');
      // logger.info(`created => ${pair.toString()}`);
    }
    return res.status(200).json(pair);
  } catch (err) {
    return next(err);
  }
});

router.delete('/', async (req, res, next) => {
  const models: Pair[] | [] = req.body || [];
  let rowsAffected = 0;
  for (const model of models) {
    const pair = await Pair.findByPk(model.id);
    if (pair) {
      // soft delete ( paranoid! )
      await pair?.destroy();
      // delete
      // await player?.destroy({ force:true });
      rowsAffected++;
    }
  }
  return res.status(200).json({ message: `Rows deleted : ${rowsAffected}` });
});

export default router;
