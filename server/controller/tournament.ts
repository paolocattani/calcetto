import { Router, response } from 'express';
import util from 'util';
import { logger } from '../core/logger';
import Tournament from '../model/sequelize/tournament.model';
import { isDevMode } from '../core/debug';
import * as Validator from '../core/validator';
import chalk from 'chalk';

// all API path must be relative to /api/tournament
const router = Router();
router.use('/', (req, res, next) => {
  if (isDevMode()) logger.info(`Tournament Manager : ${req.method} ${req.originalUrl.replace('/api/tournament', '')} `);
  next();
});

router.get('/list', async (req, res, next) => {
  try {
    const t: Tournament[] = await Tournament.findAll({
      attributes: ['id', 'name'],
      group: ['id', 'name'],
      order: [['name', 'DESC']]
    });
    if (t) logger.info(chalk.greenBright('Tournment Fetched !'));
    res.json(t);
  } catch (err) {
    logger.error(chalk.redBright('Error while fetching tournament ! : ', err));
    return next(err);
  }
});

router.post('/', async (req, res, next) => {
  const model = req.body;
  const message = Validator.stringValidator(model.name, true);
  if (message !== '') {
    if (isDevMode()) {
      logger.info(message);
      res.send(401).json({ message });
    } else res.send(401);
    return;
  }

  try {
    let t = await Tournament.findOne({ where: { name: model.name } });
    if (t) {
      logger.info(`tournament ${model.name} already exists!`);
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
