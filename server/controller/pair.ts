import { Router } from 'express';
import Pair from '../model/sequelize/pair.model';
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
  const { body } = req;
  const model = {
    id: body.id ? body.id : null,
    tournamentId: body.tId ? body.tId : 1,
    first_playerId: body.pair1.id ? body.pair1.id : null,
    second_playerId: body.pair2.id ? body.pair1.id : null
  };
  logger.info('Model : ', model);
  try {
    let pair: Pair | null = null;
    if (model.id) pair = await Pair.findOne({ where: { id: model.id } });
    if (pair) {
      pair.update(model);
      logger.info(`updated => ${pair.toString()}`);
    } else {
      pair = await Pair.create(model);
      logger.info(`created => ${pair.toString()}`);
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
