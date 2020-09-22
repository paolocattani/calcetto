import { Router, NextFunction, Response, Request } from 'express';
// Core
import { logger } from '../core/logger';
import { asyncMiddleware, withAuth, withAdminRights, logController } from '../core/middleware';
// Managers
import { listAll, findById, findByNameAndDate, parseBody, update } from '../manager/tournament.manager';
// Models
import Tournament from '../entity/tournament.model';
import { TournamentDTO } from '../../src/@common/dto';
import { AppRequest } from './index';
import { entityNotFound, failure, missingParameters, serverError, success } from './common.response';
import { OmitHistory, OmitGeneric } from '../../src/@common/models/common.models';
import {
  FetchTournamentsResponse,
  SaveTournamentRequest,
  SaveTournamentResponse,
  UpdateTournamentRequest,
  UpdateTournamentResponse,
} from '../../src/@common/models/tournament.model';

// all API path must be relative to /api/v2/tournament
const router = Router();
router.use('/', (req: Request, res: Response, next: NextFunction) =>
  logController(req, next, 'Tournament Controller', '/api/v2/tournament')
);

// GET
router.get(
  '/list',
  withAuth,
  asyncMiddleware(async (req: AppRequest, res: Response, next: NextFunction) => {
    try {
      const tournamentsList = await listAll(req.user!);
      const additional: OmitGeneric<FetchTournamentsResponse> = { tournamentsList };
      return success(res, 'Tornei caricati...', 'Fetch complete.', additional);
    } catch (err) {
      return serverError('GET tournament/list error : ', err, res);
    }
  })
);

router.get(
  '/:tId',
  withAuth,
  asyncMiddleware(async (req: AppRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.params.tId) {
        return missingParameters(res);
      }
      const t = await findById(req.user!, parseInt(req.params.tId));
      if (!t) {
        return entityNotFound(res);
      }
      const tournament = await findById(req.user!, parseInt(req.params.tId));
      const additional: OmitGeneric<FetchTournamentsResponse> = { tournamentsList: [tournament] };
      return success(res, 'Tornei caricati...', 'Fetch complete.', additional);
    } catch (err) {
      return serverError('GET tournament/{tId} error ! : ', err, res);
    }
  })
);

// PUT
router.put(
  '/update',
  withAuth,
  asyncMiddleware(async (req: AppRequest, res: Response, next: NextFunction) => {
    try {
      const tournament = await update(req.user!, parseBody(req.body as UpdateTournamentRequest));
      const additional: OmitGeneric<UpdateTournamentResponse> = { tournament };
      return success(res, 'Torneo salvato', 'Save complete', additional);
    } catch (err) {
      return serverError('PUT tournament/update error ! : ', err, res);
    }
  })
);

// POST
router.post(
  '/new',
  withAuth,
  withAdminRights,
  asyncMiddleware(async (req: AppRequest, res: Response, next: NextFunction) => {
    const model = parseBody(req.body.tournament as OmitHistory<SaveTournamentRequest>);
    const user = req.user!;
    try {
      let t: Tournament | TournamentDTO | null = await findByNameAndDate(model.name, model.date, user);
      if (t) {
        logger.info(`Tournament ${model.name} already exists....`);
        return failure(res, 'Torneo gia presente', `Tournament ${model.name} already exists`);
      }
      model.ownerId = user.id;
      t = await Tournament.create(model);
      logger.info(`Created Tournament => ${t}`);
      const additional: OmitGeneric<SaveTournamentResponse> = { tournament: t };
      return success(res, 'Torneo salvato', 'Save complete', additional);
    } catch (err) {
      return serverError('POST tournament/new error ! : ', err, res);
    }
  })
);

export default router;
