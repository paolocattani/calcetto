import { Router } from 'express';
import { logger } from '../core/logger';
import { isDevMode } from '../core/debug';
// Models
import Player from '../model/sequelize/player.model';
import Pair from '../model/sequelize/pair.model';
// dbConnection
import { dbConnection } from '../model/server/AppServer';
const router = Router();

router.use('/', (req, res, next) => {
  if (isDevMode()) logger.info(`Pair Manager : ${req.method} ${req.originalUrl.replace('/api/pair', '')} `);
  next();
});

router.get('/list/:tId', async (req, res, next) => {
  try {
    const tId = req.query.tId ?? 1;
    const pairsList = await Pair.findAll({
      where: { tournamentId: tId, '$tournament.public$': true },
      order: [['id', 'ASC']],
      include: [Pair.associations.tournament, Pair.associations.player1, Pair.associations.player2]
    });

    const modelList = pairsList.map((row, index) => rowToModel(row, index));
    return res.json(modelList);
  } catch (err) {
    logger.error('/list -> error: ', err);
    return next(err);
  }
});

router.post('/', async (req, res, next) => {
  const { body } = req;
  const { pair1, pair2 } = body;
  const t = await dbConnection.transaction();
  try {
    let pair: Pair | null = null;
    const player1 = await Player.findOne({ where: { id: pair1.id } });
    const player2 = await Player.findOne({ where: { id: pair2.id } });
    const model = {
      id: body.id ? body.id : null,
      tournamentId: body.tId && body.tId !== '' ? parseInt(body.tId) : 1
    };
    if (model.id) pair = await Pair.findOne({ where: { id: model.id } });
    if (pair) {
      await pair.update(model), { transaction: t };
      logger.info(`updated => ${pair.toString()}`);
    } else {
      pair = await Pair.create(model, { transaction: t });
      logger.info(`created => ${pair.toString()}`);
    }
    if (player1) await pair.$set('player1', player1 as any, { transaction: t });
    if (player2) await pair.$set('player2', player2 as any, { transaction: t });
    t.commit();
    return res.status(200).json(pair);
  } catch (err) {
    t.rollback();
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

function rowToModel(row: Pair, index: number) {
  return {
    id: row.id,
    rowNumber: index + 1,
    tId: row.tournamentId,
    player1: {
      id: row.player1?.id ?? null,
      alias: row.player1?.alias ?? '',
      name: row.player1?.name ?? '',
      surname: row.player1?.surname ?? ''
    },
    player2: {
      id: row.player2?.id ?? null,
      alias: row.player2?.alias ?? '',
      name: row.player2?.name ?? '',
      surname: row.player2?.surname ?? ''
    },
    pairAlias: row.pairAlias,
    stage1Name: row.stage1Name,
    label: valueFormatter(row)
  };
}

function valueFormatter(row: any) {
  const { pairAlias, id, player1, player2 } = row;
  if (pairAlias && pairAlias !== '') return `${pairAlias} ( ${id} )`;
  const value = `${player1.alias ? player1.alias : player1.name} - ${
    player2.alias ? player2.alias : player2.name
  } ( ${id} )`;

  return value;
}
