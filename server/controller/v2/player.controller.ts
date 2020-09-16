import { Router, Request, Response, NextFunction } from 'express';
import { PlayerDTO } from '../../../src/@common/dto';
import { HTTPStatusCode } from '../../../src/@common/models/HttpStatusCode';
import { withAuth, asyncMiddleware, logController, withAdminRights } from '../../core/middleware';
import {
  create,
  deletePlayer,
  parseBody,
  listAll,
  listAllInTournament,
  update,
  findByNameSurname,
} from '../../manager/player.manager';
import { failure, success, unexpectedServerError } from '../common.response';

const router = Router();
router.use('/', (req: Request, res: Response, next: NextFunction) =>
  logController(req, next, 'Player Controller', '/api/v1/player')
);

router.get(
  '/list/:tId',
  withAuth,
  withAdminRights,
  asyncMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tournamentList = await listAllInTournament(req.params.tId ? parseInt(req.params.tId) : 0);
      return success(res, 'Operazione completata', 'List complete.', { tournamentList });
    } catch (err) {
      return next(err);
    }
  })
);

router.get(
  '/list',
  withAuth,
  asyncMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tournamentList = await listAll();
      return success(res, 'Operazione completata', 'List complete.', { tournamentList });
    } catch (err) {
      return unexpectedServerError(res);
    }
  })
);

router.put(
  '/',
  withAuth,
  withAdminRights,
  asyncMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    const model = req.body as PlayerDTO;
    try {
      let player = await findByNameSurname(model.name, model.surname);
      if (!player) {
        return failure(res, 'Giocatore non trovato', 'Player not found', HTTPStatusCode.BadRequest, { player: model });
      }
      await update(model);
      return success(res, 'Giocatore aggiornato', 'Player updated', { player });
    } catch (err) {
      return unexpectedServerError(res);
    }
  })
);

router.post(
  '/',
  withAuth,
  withAdminRights,
  asyncMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    const model = req.body as PlayerDTO;
    try {
      if (!model.name || !model.surname) {
        return failure(res, 'Dati obbligatori mancanti.', 'Missing mandatory fields');
      }
      let player = await findByNameSurname(model.name, model.surname);
      if (player) {
        return failure(res, 'Esiste già un utente con questi dati.', 'Player already exists');
      }
      const dto = await create(model);
      return success(res, 'Giocatore creato', 'Player created', { player: dto });
    } catch (err) {
      return next(err);
    }
  })
);

router.delete(
  '/',
  withAuth,
  asyncMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const rowsAffected = await deletePlayer(req.body.map((e: any) => parseBody(e)));
      return success(res, rowsAffected > 1 ? 'Giocatori eliminati' : 'Giocatore eliminato', 'Players deleted');
    } catch (error) {
      return unexpectedServerError(res);
    }
  })
);

export default router;
