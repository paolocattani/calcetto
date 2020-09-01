import { Router, Request, Response, NextFunction, query } from 'express';
import chalk from 'chalk';
import { logger } from '../core/logger';
import { isDevMode } from '../core/debug';
import { dbConnection } from '../models/server/AppServer';
// Models
import { Pair } from '../models/sequelize';
import { PairDTO } from '../models/dto';
import { asyncMiddleware, withAuth } from '../core/middleware';
import { AppRequest } from './index';
import { listInTournament, findAlias } from '../manager/pair.manager';
import { missingParamsResponse } from './common';

const router = Router();

router.use('/', (req, res, next) => {
  if (isDevMode()) logger.info(`Pair Controller : ${req.method} ${req.originalUrl.replace('/api/v1/pair', '')} `);
  next();
});

router.get(
  '/alias',
  withAuth,
  asyncMiddleware(async (req: AppRequest, res: Response, next: NextFunction) => {
    try {
      const {
        query: { player1Id, player2Id },
      } = req;
      logger.info('/alias : ', player1Id, player2Id, query);
      if (!player1Id || !player2Id) {
        return res.status(500).json({ message: 'Missing players' });
      }
      const alias = await findAlias(parseInt(player1Id as string), parseInt(player2Id as string));
      return res.status(200).json({ alias });
    } catch (err) {
      logger.error('/alias -> error: ', err);
      return res.sendStatus(300);
    }
  })
);

router.put(
  '/selected',
  withAuth,
  asyncMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    const { body } = req;
    const rows = body.pairs as PairDTO[];
    const stage1Name = body.stage1Name;
    if (rows.length === 0) {
      return missingParamsResponse(res);
    }
    const transaction = await dbConnection.transaction();
    try {
      // Reset selection
      await Pair.update({ stage2Selected: false }, { where: { tournamentId: rows[0].tId, stage1Name }, transaction });
      // Update selection
      await Pair.update(
        { stage2Selected: true },
        {
          where: { tournamentId: rows[0].tId, stage1Name, id: rows.map((e) => e.id!) },
          transaction,
        }
      );
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
    }
    return res.status(200).json({ code: 200 });
  })
);

router.get(
  '/list/',
  withAuth,
  asyncMiddleware(async (req: AppRequest, res: Response, next: NextFunction) => {
    try {
      const { user, query } = req;
      if (!query.tId) {
        return res.status(500).json({ message: 'Missing tournament' });
      }
      const tId = parseInt(query.tId as string);
      logger.info(`Looking for pairs in tournament ${chalk.greenBright(tId.toString())}`);
      const modelList = await listInTournament(tId, user!);
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
    const {
      body: { stage2Selected, player1, player2, id, tId, alias, stage1Name, paid1, paid2 },
    } = req;
    try {
      let pair: Pair | null = null;
      const model = {
        id: id ? id : null,
        tournamentId: parseInt(tId),
        alias,
        player1Id: player1?.id ?? null,
        player2Id: player2?.id ?? null,
        stage2Selected: !!stage2Selected,
        stage1Name,
        // TODO:
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
