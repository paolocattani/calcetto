import { Router } from 'express';
import { logger } from '../core/logger';
import { isDevMode } from '../core/debug';
import Player from '../model/sequelize/player.model';
import Pair from '../model/sequelize/pair.model';

const router = Router();

router.use('/', (req, res, next) => {
  if (isDevMode()) logger.info(`Pair Manager : ${req.method} ${req.originalUrl.replace('/api/pair', '')} `);
  next();
});

router.get('/list', async (req, res, next) => {
  // logger.info('Associatrions : ', Pair.associations);
  try {
    const tId = req.query.tId ?? 1;
    logger.info('/list.tId : ', tId);
    const pairsList = await Pair.findAll({
      where: { tournamentId: tId },
      order: [['id', 'DESC']],
      // include: [{ model: Player }]
      include: [Pair.associations.tournament, Pair.associations.player1, Pair.associations.player2]
    });

    const modelList = pairsList.map(row => {
      return {
        id: row.id,
        tId: row.tournamentId,
        pair1: {
          id: row.player1?.id ?? null,
          alias: row.player1?.alias ?? '',
          name: row.player1?.name ?? '',
          surname: row.player1?.surname ?? ''
        },
        pair2: {
          id: row.player2?.id ?? null,
          alias: row.player2?.alias ?? '',
          name: row.player2?.name ?? '',
          surname: row.player2?.surname ?? ''
        }
      };
    });
    logger.info('/list -> pairsList : ', pairsList);
    return res.json(modelList);
  } catch (err) {
    return next(err);
  }
});

router.post('/', async (req, res, next) => {
  const { body } = req;
  const { pair1, pair2 } = body;
  const model = {
    id: body.id ? body.id : null,
    tournamentId: body.tId ? parseInt(body.tId) : 1
  };
  const player1 = await Player.findOne({ where: { id: pair1.id } });
  const player2 = await Player.findOne({ where: { id: pair2.id } });

  logger.info('Model : ', model);
  logger.info('Player1 : ', player1);
  logger.info('Player2 : ', player2);
  try {
    let pair: Pair | null = null;
    if (model.id) pair = await Pair.findOne({ where: { id: model.id } });
    if (pair) {
      pair.$set('player1', player1 as any);
      pair.$set('player2', player2 as any);
      await pair.update(model);
      logger.info(`updated => ${pair.toString()}`);
    } else {
      pair = await Pair.create(model);
      pair.$set('player1', player1 as any);
      pair.$set('player2', player2 as any);

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
