import { Router, Request, Response, NextFunction } from 'express';
import chalk from 'chalk';
import { logger } from '../core/logger';
import { isDevMode } from '../core/debug';
// Models
import Pair from '../models/sequelize/pair.model';
import { asyncMiddleware, withAuth } from '../core/middleware';
import { Op } from 'sequelize';
import { AppRequest } from 'controller';
import { rowToModel } from '../manager/pair.manager';

const router = Router();

router.use('/', (req, res, next) => {
  if (isDevMode()) logger.info(`Pair Controller : ${req.method} ${req.originalUrl.replace('/api/v1/pair', '')} `);
  next();
});

router.get(
  '/list/',
  withAuth,
  asyncMiddleware(async (req: AppRequest, res: Response, next: NextFunction) => {
    try {
      const {
        user,
        query: { tId },
      } = req;
      if (!tId) return res.status(500).json({ message: 'Missing tournament' });
      logger.info(`Looking for pairs in tournament ${chalk.greenBright(tId.toString())}`);
      const pairsList = await Pair.findAll({
        where: {
          tournamentId: tId,
          [Op.or]: [{ '$tournament.ownerId$': user!.id }, { '$tournament.public$': true }],
        },
        order: [['id', 'ASC']],
        include: [Pair.associations.tournament, Pair.associations.player1, Pair.associations.player2],
      });
      const modelList = pairsList.map((row, index) => rowToModel(row, index));
      // logger.info('modelList : ', modelList);
      return res.json(modelList);
    } catch (err) {
      logger.error('/list -> error: ', err);
      return next(err);
    }
  })
);

router.post(
  '/',
  withAuth,
  asyncMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    const { body } = req;
    const { player1, player2, id, tId, alias, stage1Name, paid1, paid2 } = body;
    try {
      let pair: Pair | null = null;
      const model = {
        id: id ? id : null,
        tournamentId: parseInt(tId),
        alias,
        player1Id: player1?.id ?? null,
        player2Id: player2?.id ?? null,
        stage1Name,
        paid1: paid1 === 'Si' ? true : false,
        paid2: paid2 === 'Si' ? true : false,
      };
      if (model.id) pair = await Pair.findOne({ where: { id: model.id } });
      // creazione coppia
      if (pair) {
        await pair.update(model);
        logger.info(`updated => ${pair.toString()}`);
      } else {
        pair = await Pair.create(model);
        logger.info(`created => ${pair.toString()}`);
      }
      return res.status(200).json(pair);
    } catch (err) {
      return next(err);
    }
  })
);

router.delete(
  '/',
  withAuth,
  asyncMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    let models: Array<Pair> = req.body || [];
    let rowsAffected = 0;
    const result = await Pair.destroy({ where: { id: models.map((e) => e.id) } });
    logger.info(result);
    return res.status(200).json({ message: `Rows deleted : ${rowsAffected}` });
  })
);

export default router;
