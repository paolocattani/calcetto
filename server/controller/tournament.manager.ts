import { Router } from 'express';
import { logger } from '../core/logger';
import Tournament from '../model/sequelize/tournament.model';
import { isDevMode } from '../core/debug';
import chalk from 'chalk';

// all API path must be relative to /api/tournament
const router = Router();
router.use('/', (req, res, next) => {
  if (isDevMode()) logger.info(`Tournament Manager : ${req.method} ${req.originalUrl.replace('/api/tournament', '')} `);
  next();
});

router.get('/list', async (req, res, next) => {
  try {
    const t: Tournament[] = await Tournament.findAll({ order: [['name', 'DESC']] });
    if (t) logger.info(chalk.greenBright('Tournament fetched !'));
    res.json(t);
  } catch (err) {
    logger.error(chalk.redBright('Error while fetching tournament ! : ', err));
    return next(err);
  }
});

router.get('/:tId', async (req, res, next) => {
  try {
    const tId = req.params.tId ? parseInt(req.params.tId) : 0;
    const t: Tournament | null = await Tournament.findOne({ where: { id: tId } });
    res.json(t);
  } catch (err) {
    logger.error(chalk.redBright('Error while fetching tournament ! : ', err));
    return next(err);
  }
});

router.post('/', async (req, res, next) => {
  const model = req.body;
  try {
    let t = await Tournament.findOne({ where: { name: model.name } });
    if (t) {
      logger.info(`tournament ${model.name} already exists, updating....`);
      await t.update(model);
      return res.json(t);
    }
    t = await Tournament.create(model);
    logger.info(`tournament controller : created Tournament => ${t}`);
    return res.json(t);
  } catch (err) {
    return next(err);
  }
});

export default router;
