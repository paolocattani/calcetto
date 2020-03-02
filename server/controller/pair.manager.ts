import { Router } from 'express';
import chalk from 'chalk';
import { logger } from '../core/logger';
import { isDevMode } from '../core/debug';
// Models
import Pair from '../model/sequelize/pair.model';

const router = Router();

router.use('/', (req, res, next) => {
  if (isDevMode()) logger.info(`Pair Manager : ${req.method} ${req.originalUrl.replace('/api/pair', '')} `);
  next();
});

router.get('/list/', async (req, res, next) => {
  try {
    const tId = req.query.tId ?? 1;
    logger.info(`Looking for pairs in tournament ${chalk.greenBright(tId)}`);
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
  const { player1, player2, id, tId, pairAlias, stage1Name, paid1, paid2 } = body;
  try {
    let pair: Pair | null = null;
    const model = {
      id: id ? id : null,
      tournamentId: parseInt(tId),
      pairAlias,
      player1Id: player1?.id ?? null,
      player2Id: player2?.id ?? null,
      stage1Name,
      paid1: paid1 === 'Si' ? true : false,
      paid2: paid2 === 'Si' ? true : false
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
      surname: row.player1?.surname ?? '',
      label: row.player1?.alias ?? '',
      role: row.player1?.role ?? null,
      match_played: row.player1?.match_played ?? 0,
      match_won: row.player1?.match_won ?? 0,
      total_score: row.player1?.total_score ?? 0,
      editable: row.player1.editable
    },
    player2: {
      id: row.player2?.id ?? null,
      alias: row.player2?.alias ?? '',
      name: row.player2?.name ?? '',
      surname: row.player2?.surname ?? '',
      label: row.player2?.alias ?? '',
      role: row.player2?.role ?? null,
      match_played: row.player2?.match_played ?? 0,
      match_won: row.player2?.match_won ?? 0,
      total_score: row.player2?.total_score ?? 0,
      editable: row.player2.editable
    },
    pairAlias: row.pairAlias,
    stage1Name: row.stage1Name,
    paid1: row.paid1 ? 'Si' : 'No',
    paid2: row.paid2 ? 'Si' : 'No',
    label: valueFormatter(row)
  };
}

function valueFormatter(row: any) {
  const { pairAlias, id, player1, player2 } = row;
  if (pairAlias && pairAlias !== '') return `${pairAlias} ( ${id} )`;
  if (!player1 || !player2) return '';
  const value = `${player1.alias ? player1.alias : player1.name} - ${
    player2.alias ? player2.alias : player2.name
  } ( ${id} )`;

  return value;
}
