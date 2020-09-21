import { Router, Request, Response, NextFunction } from 'express';
import { OmitGeneric } from '../../src/@common/models/common.models';
import { FetchPlayersResponse, UpdatePlayerRequest, UpdatePlayerResponse } from '../../src/@common/models/player.model';
import { withAuth, asyncMiddleware, logController, withAdminRights } from '../core/middleware';
import {
  create,
  deletePlayer,
  parseBody,
  listAll,
  listAllInTournament,
  update,
  findByNameSurname,
} from '../manager/player.manager';
import { entityNotFound, failure, missingParameters, serverError, success } from './common.response';

const router = Router();
router.use('/', (req: Request, res: Response, next: NextFunction) =>
  logController(req, next, 'Player Controller', '/api/v2/player')
);

router.get(
  '/list/:tId',
  withAuth,
  withAdminRights,
  asyncMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const playersList = await listAllInTournament(req.params.tId ? parseInt(req.params.tId) : 0);
      const additional: OmitGeneric<FetchPlayersResponse> = { playersList };
      return success(res, 'Operazione completata', 'List complete.', additional);
    } catch (error) {
      return serverError('GET player/list/:tId error ! : ', error, res);
    }
  })
);

router.get(
  '/list',
  withAuth,
  asyncMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const playersList = await listAll();
      const additional: OmitGeneric<FetchPlayersResponse> = { playersList };
      return success(res, 'Operazione completata', 'List complete.', additional);
    } catch (error) {
      return serverError('GET player/list/ error ! : ', error, res);
    }
  })
);

router.put(
  '/update',
  withAuth,
  withAdminRights,
  asyncMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    const { player: dto } = req.body as UpdatePlayerRequest;
    try {
      let player = await findByNameSurname(dto.name, dto.surname);
      if (!player) {
        return entityNotFound(res);
      }
      await update(dto);
      const additional: OmitGeneric<UpdatePlayerResponse> = { player };
      return success(res, 'Giocatore aggiornato', 'Player updated', additional);
    } catch (error) {
      return serverError('PUT player/update error ! : ', error, res);
    }
  })
);

router.post(
  '/new',
  withAuth,
  withAdminRights,
  asyncMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    const { player: model } = req.body as UpdatePlayerRequest;
    try {
      if (!model.name || !model.surname) {
        return missingParameters(res);
      }
      let player = await findByNameSurname(model.name, model.surname);
      if (player) {
        return failure(res, 'Esiste già un utente con questi dati.', 'Player already exists');
      }
      const dto = await create(model);
      const additional: OmitGeneric<UpdatePlayerResponse> = { player: dto };

      return success(res, 'Giocatore creato', 'Player created', additional);
    } catch (error) {
      return serverError('POST player/new error ! : ', error, res);
    }
  })
);

router.delete(
  '/delete',
  withAuth,
  asyncMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const rowsAffected = await deletePlayer(req.body.map((e: any) => parseBody(e)));
      return success(res, rowsAffected > 1 ? 'Giocatori eliminati' : 'Giocatore eliminato', 'Players deleted');
    } catch (error) {
      return serverError('DELETE player/delete error ! : ', error, res);
    }
  })
);

export default router;
