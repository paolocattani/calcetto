import { Router, NextFunction, Response, Request } from 'express';
// Core
import { logger } from '../core/logger';
import {asyncMiddleware, withAuth, withAdminRights, controllerLogger, withTestAuth} from '../core/middleware';
// Managers
import {
	listAll,
	findById,
	findByNameAndDate,
	parseBody,
	update,
	deleteTournament,
	convertEntityToDTO,
} from '../manager/tournament.manager';
// Models
import Tournament from '../database/tournament.model';
import {TournamentDTO, UserDTO} from '../../src/@common/dto';
import { AppRequest } from './index';
import { entityNotFound, failure, missingParameters, serverError, success } from './common.response';
import { OmitHistory, OmitGeneric } from '../../src/@common/models/common.models';
import {
	DeleteTournamentRequest,
	DeleteTournamentResponse,
	FetchTournamentsResponse,
	SaveTournamentRequest,
	SaveTournamentResponse,
	UpdateTournamentRequest,
	UpdateTournamentResponse,
} from '../../src/@common/models/tournament.model';

// all API path must be relative to /api/v2/tournament
const router = Router();
router.use('/', (req: Request, res: Response, next: NextFunction) =>
	controllerLogger(req, next, 'Tournament Controller', '/api/v2/tournament')
);

// GET
router.get(
	'/list',
	withAuth,
	asyncMiddleware(async (req: AppRequest, res: Response) => listController(res,req.user!))
);

router.post(
	'/test/list',
	withTestAuth,
	asyncMiddleware(async (req: AppRequest, res: Response) => listController(res,req.user!))
);

router.get(
	'/:tId',
	withAuth,
	asyncMiddleware(async (req: AppRequest, res: Response) => {
		try {
			if (!req.params.tId) {
				return missingParameters(res);
			}
			const t = await findById(req.user!, parseInt(req.params.tId));
			if (!t) {
				return entityNotFound(res);
			}
			const tournament = await findById(req.user!, parseInt(req.params.tId));
			return success<FetchTournamentsResponse>(
				res,
				{ label: 'tournament:loaded_1' },
				{ tournamentsList: [tournament!] }
			);
		} catch (err) {
			return serverError('GET tournament/{tId} error ! : ', err, res);
		}
	})
);

// PUT
router.put(
	'/update',
	withAuth,
	asyncMiddleware(async (req: AppRequest, res: Response) => {
		try {
			const request: UpdateTournamentRequest = req.body;
			const tournament = await update(req.user!, parseBody(request.tournament));
			return success<UpdateTournamentResponse>(res, { label: 'tournament:saved' }, { tournament });
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
	asyncMiddleware(async (req: AppRequest, res: Response) => {
		const request: OmitHistory<SaveTournamentRequest> = req.body;
		const model = parseBody(request.tournament);
		const user = req.user!;
		try {
			let t: Tournament | TournamentDTO | null = await findByNameAndDate(model.name, model.date, user);
			if (t) {
				logger.info(`Tournament ${model.name} already exists....`);
				return failure(res, { label: 'tournament:duplicated', options: { name: model.name } });
			}
			model.ownerId = user.id;
			t = await Tournament.create(model);
			const tournament = convertEntityToDTO(t);
			logger.info(`Created Tournament => ${t}`);
			return success<SaveTournamentResponse>(res, { label: 'tournament:saved' }, { tournament });
		} catch (err) {
			return serverError('POST tournament/new error ! : ', err, res);
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
			const request: DeleteTournamentRequest = req.body;
			await deleteTournament(parseBody(request.tournament));
			return success<DeleteTournamentResponse>(
				res,
				{ label: 'tournament:deleted' },
				{ tournament: request.tournament }
			);
		} catch (error) {
			return serverError('DELETE tournament/delete error ! : ', error, res);
		}
	})
);

const listController = async (res:Response, user:UserDTO) =>{
	try {
		const tournamentsList = await listAll(user);
		return success<FetchTournamentsResponse>(
			res,
			{ label: tournamentsList.length > 1 ? 'tournament:loaded_2' : 'tournament:loaded_1' },
			{ tournamentsList }
		);
	} catch (err) {
		return serverError('GET tournament/list error : ', err, res);
	}
}


export default router;
