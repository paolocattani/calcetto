import { Router, Request, Response, NextFunction } from 'express';
import chalk from 'chalk';
import { logger } from '../core/logger';
import { getDbConnection } from '../database/connection';
// Models
import { Pair } from '../database';
import { asyncMiddleware, withAuth, controllerLogger, withAdminRights } from '../core/middleware';
import { AppRequest } from './index';
import { listInTournament, findAlias, rowToModel } from '../manager/pair.manager';
import { missingParameters, serverError, success } from './common.response';
import {
  DeletePairsRequest,
  FetchPairsResponse,
  FindAliasRequest,
  FindAliasResponse,
  SavePairRequest,
  SavePairResponse,
  SelectPairsRequest,
  SelectPairsResponse,
} from '../../src/@common/models';

const router = Router();
router.use('/', (req: Request, res: Response, next: NextFunction) =>
  controllerLogger(req, next, 'Pair Controller', '/api/v1/pair')
);

// GET
router.get(
  '/list/',
  withAuth,
  withAdminRights,
  asyncMiddleware(async (req: AppRequest, res: Response) => {
    try {
      const { user, query } = req;
      if (!query.tId) {
        return missingParameters(res);
      }
      const tId = parseInt(query.tId as string);
      logger.info(`Looking for pairs in tournament ${chalk.greenBright(tId.toString())}`);
      const pairsList = await listInTournament(tId, user!);
      return success<FetchPairsResponse>(res, 'Coppie caricate...', { pairsList });
    } catch (err) {
      return serverError('GET pair/list error : ', err, res);
    }
  })
);

router.get(
  '/alias',
  withAuth,
  withAdminRights,
  asyncMiddleware(async (req: AppRequest, res: Response) => {
    try {
      // FIXME:
      const { player1Id, player2Id } = (req.query as unknown) as FindAliasRequest;
      logger.info('/alias : ', player1Id, player2Id);
      if (!player1Id || !player2Id) {
        return missingParameters(res);
      }
      const alias = await findAlias(parseInt(player1Id as string), parseInt(player2Id as string));
      return success<FindAliasResponse>(res, 'Coppie caricate...', { alias });
    } catch (err) {
      return serverError('GET pair/alias error : ', err, res);
    }
  })
);

// PUT
// Seleziona coppie per fase2
router.put(
  '/selected',
  withAuth,
  withAdminRights,
  asyncMiddleware(async (req: Request, res: Response) => {
    const request: SelectPairsRequest = req.body;
    const { pairsList, stage1Name } = request;
    if (pairsList.length === 0) {
      return missingParameters(res);
    }
    const connection = await getDbConnection();
    const transaction = await connection.transaction();
    try {
      // Reset selection
      await Pair.update(
        { stage2Selected: false },
        { where: { tournamentId: pairsList[0].tId, stage1Name }, transaction }
      );
      // Update selection
      await Pair.update(
        { stage2Selected: true },
        {
          where: { tournamentId: pairsList[0].tId, stage1Name, id: pairsList.map((e) => e.id!) },
          transaction,
        }
      );
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      return serverError('PUT pair/selected error : ', err, res);
    }
    return success<SelectPairsResponse>(res, pairsList.length > 1 ? 'Coppie selezionate...' : 'Coppia selezionata...');
  })
);

// POST
router.post(
  '/new',
  withAuth,
  withAdminRights,
  asyncMiddleware(async (req: Request, res: Response) => {
    const { pair: dto }: SavePairRequest = req.body;
    try {
      let pair: Pair | null = null;
      if (dto.id) pair = await Pair.findOne({ where: { id: dto.id } });
      // creazione coppia
      if (pair) {
        await pair.update(dto);
        logger.info(`updated => ${pair.toString()}`);
      } else {
        pair = await Pair.create(dto);
        logger.info(`created => ${pair.toString()}`);
      }
      return success<SavePairResponse>(res, 'Coppia salvata...', { pair: rowToModel(pair, pair.id) });
    } catch (err) {
      return serverError('POST pair/ error : ', err, res);
    }
  })
);

// DELETE
router.delete(
  '/delete',
  withAuth,
  withAdminRights,
  asyncMiddleware(async (req: Request, res: Response) => {
    try {
      const request: DeletePairsRequest = req.body;
      if (request.pairsList.length === 0) {
        return missingParameters(res);
      }
      await Pair.destroy({ where: { id: request.pairsList.map((e) => e.id!) } });
      return success(res, request.pairsList.length > 1 ? 'Coppie eliminate...' : 'Coppia eliminata...', {
        pairsList: request.pairsList,
      });
    } catch (err) {
      return serverError('DELETE pair/delete error : ', err, res);
    }
  })
);

export default router;
