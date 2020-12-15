// Core
import '../../core/env';
import { logger } from '../../core/logger';
import {withAuth, asyncMiddleware, controllerLogger, withTestAuth} from '../../core/middleware';
// Types
import { AppRequest } from '../index';
import { Router, Request, Response, NextFunction } from 'express';
// Auth Manager
import {
	convertEntityToDTO,
	parseBody,
	deleteUser,
	comparePasswords,
	registerUser,
	findUserByEmailOrUsername,
	checkIfExist,
	findUserByEmailAndUsername,
	addUserCookies,
	isValidRegister,
	removeUserCookies,
} from '../../manager/auth.manager';
// Models
import User from '../../database/user.model';
// Common Responses
import { missingParameters, success, failure, entityNotFound, serverError, unauthorized } from '../common.response';
// @Commmon
import {
	AuthenticationResponse,
	DeleteUserRequest,
	DeleteUserResponse,
	LoginRequest,
	RegistrationRequest,
	UpdateUserRequest,
	OmitGeneric,
	OmitHistory,
} from '../../../src/@common/models';
import { HTTPStatusCode } from '../../../src/@common/models/HttpStatusCode';

const router = Router();

const wrongCredentials = (res: Response) =>
	failure(res, { label: 'auth:server.error.wrong_credential' }, 'Wrong credentials', HTTPStatusCode.Unauthorized);

router.use('/', (req: Request, res: Response, next: NextFunction) =>
	controllerLogger(req, next, 'Auth Controller', '/api/v2/auth')
);

router.get(
	'/check',
	withAuth,
	asyncMiddleware(async (req: AppRequest, res: Response) => {
		const additional: OmitGeneric<AuthenticationResponse> = { user: req.user };
		return success(
			res,
			{
				label: 'auth:server.error.wrong_credential',
				options: { username: req.user!.name },
			},
			additional
		);
	})
);

router.get(
	'/logout',
	withAuth,
	asyncMiddleware(async (req: AppRequest, res: Response) => {
		removeUserCookies(res);
		return success(res, { label: 'auth:logout' });
	})
);

router.post(
	'/register',
	asyncMiddleware(async (req: Request, res: Response) => {
		logger.info('/register start ');
		const registrationInfo = req.body as OmitHistory<RegistrationRequest>;
		return await registrationController(res,registrationInfo);
	})
);

router.put(
	'/update',
	withAuth,
	asyncMiddleware(async (req: AppRequest, res: Response) => {
		try {
			let model = parseBody(req.body as OmitHistory<UpdateUserRequest>);
			logger.info('/update : ', model);
			const user = await findUserByEmailAndUsername(model.email, model.username);
			if (!user) {
				return entityNotFound(res);
			}
			await user.update(model);
			// TODO: aggiornare anche il giocare associato con i dati comuni
			return success<AuthenticationResponse>(
				res,
				{ label: 'common:server.updated' },
				{ user: convertEntityToDTO(user) }
			);
		} catch (error) {
			return serverError('PUT auth/update error ! : ', error, res);
		}
	})
);

router.post(
	'/login',
	withAuth,
	asyncMiddleware(async (req: Request, res: Response) => {
		const { username, password } = req.body as OmitHistory<LoginRequest>;
		return await loginUserController(res,username,password);
	})
);

router.delete(
	'/delete',
	withAuth,
	asyncMiddleware(async (req: AppRequest, res: Response) => {
		const { password } = req.body as OmitHistory<DeleteUserRequest>;
		const { email, username } = req.user!;
		return await deleteUserController(res,username,email,password);
	})
);

// Test
router.post(
	'/test/register',
	withTestAuth,
	asyncMiddleware(async (req: Request, res: Response) => {
		logger.info('/register start ');
		const registrationInfo = req.body as OmitHistory<RegistrationRequest>;
		return await registrationController(res,registrationInfo);
	})
);

router.delete(
	'/test/delete',
	withTestAuth,
	asyncMiddleware(async (req: AppRequest, res: Response) => {
		const { password, email, username } = req.body;
		return await deleteUserController(res,username,email,password);
	})
);

router.post(
	'/test/login',
	withTestAuth,
	asyncMiddleware(async (req: Request, res: Response) => {
		const { username, password } = req.body as OmitHistory<LoginRequest>;
		return await loginUserController(res,username,password);
	})
);

const loginUserController = async (res:Response,username:string,password:string) => {
	try {
		logger.info('/login start ');
		if (!username || !password) {
			return missingParameters(res);
		}
		const user = await findUserByEmailOrUsername(username);
		// utente non trovato
		if (!user) {
			return entityNotFound(res);
		}
		const isValid = await comparePasswords(user.email, password, user.password);
		if (!isValid) {
			return wrongCredentials(res);
		}

		const userDTO = convertEntityToDTO(user);
		addUserCookies(userDTO, res);
		return success<AuthenticationResponse>(
			res,
			{ label: 'auth:welcome', options: { username: userDTO.name } },
			{ user: userDTO }
		);
	} catch (error) {
		return serverError('POST auth/login error ! : ', error, res);
	}

}

const registrationController = async (res:Response,registrationInfo:OmitHistory<RegistrationRequest>) => {
	try {
		// Ripeto i controlli di validità sui dati anche qui in caso siano in qualche modo stati
		// bypassati quelli a FE.
		const errors = isValidRegister(registrationInfo);
		if (errors.length !== 0) {
			return failure(
				res,
				{ label: 'auth:error.generic' },
				'Registration data is not valid',
				HTTPStatusCode.BadRequest,
				{ errors }
			);
		}
		const model: User = parseBody(registrationInfo);
		const user = await checkIfExist(model);
		if (user) {
			return failure(
				res,
				{ label: 'auth:server.error.already_exists' },
				'Email or Username alrealdy exists.',
				HTTPStatusCode.BadRequest,
				{
					errors: [{ label: 'auth:server.error.already_exists' }],
				}
			);
		}
		const record = await registerUser(model, registrationInfo.playerRole);
		if (record) {
			addUserCookies(record, res);
			logger.info('/register end ');
			return success<AuthenticationResponse>(
				res,
				{ label: 'auth:welcome', options: { username: record.name } },
				{ user: record }
			);
		} else {
			throw new Error('Server Error.!');
		}
	} catch (error) {
		return serverError('POST auth/register error ! : ', error, res, {
			// eslint-disable-next-line quotes
			errors: ["Errore server non previsto. E' stata avviata la procedura di autodistruzione."],
		});
	}
}

const deleteUserController = async (res:Response,username:string,email:string,password:string) => {
	try {
			logger.info('/test/delete start ');
			const user = await findUserByEmailAndUsername(email, username);
			if (!user) {
		return entityNotFound(res);
	}

	if (!(await comparePasswords(email, password, user.password)))
		return res.status(HTTPStatusCode.BadRequest).json(wrongCredentials);

	await deleteUser(user);
	logger.info('/test/delete end ');
	removeUserCookies(res);
	return success<DeleteUserResponse>(res, { label: 'auth:server.deleted', options: { username: user.name } });
	} catch (error) {
		return serverError('DELETE auth/test/delete error ! : ', error, res);
	}
}

export default router;
