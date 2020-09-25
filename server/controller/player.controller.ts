import { Router, Request, Response, NextFunction } from 'express';
import { OmitGeneric } from '../../src/@common/models/common.models';
import {
  DeletePlayersRequest,
  DeletePlayersResponse,
  FetchPlayersResponse,
  UpdatePlayerRequest,
  UpdatePlayerResponse,
} from '../../src/@common/models/player.model';
import { withAuth, asyncMiddleware, logController, withAdminRights } from '../core/middleware';
import {
  create,
  deletePlayer,
  parseBody,
  listAll,
  listAllInTournament,
  update,
  findByNameSurname,
  findById,
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
      return success(res, 'Giocatori caricati..', additional);
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
      return success(res, 'Giocatori caricati..', additional);
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
      let player = await findById(dto.id);
      if (!player) {
        return entityNotFound(res);
      }
      // Aggiungere controlli
      let playerTest = await findByNameSurname(dto.name, dto.surname);
      if (playerTest && playerTest.id !== player.id) {
        return failure(res, 'Esiste già un giocatore con questi dati.', 'Player already exists');
      }
      await update(dto);
      const additional: OmitGeneric<UpdatePlayerResponse> = { player };
      return success(res, 'Giocatore aggiornato...', additional);
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
        return failure(res, 'Esiste già un giocatore con questi dati.', 'Player already exists');
      }
      const dto = await create(model);
      const additional: OmitGeneric<UpdatePlayerResponse> = { player: dto };

      return success(res, 'Giocatore creato...', additional);
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
      const request: DeletePlayersRequest = req.body;
      const rowsAffected = await deletePlayer(request.players.map((e: any) => parseBody(e)));
      const additional: OmitGeneric<DeletePlayersResponse> = { playersList: request.players };
      return success(res, rowsAffected > 1 ? 'Giocatori eliminati...' : 'Giocatore eliminato...', additional);
    } catch (error) {
      return serverError('DELETE player/delete error ! : ', error, res);
    }
  })
);

export default router;
