// Core
import '../../core/env';
import { logger } from '../../core/logger';
import {
	withAuth,
	asyncMiddleware,
	controllerLogger,
	withTestAuth,
	limitRequest,
	consumeRequest,
} from '../../middleware';
// Types
import { AppRequest } from '../index';
import { Request, Response, NextFunction, Router } from 'express';
// Auth Manager
import {
	convertEntityToDTO,
	parseBody,
	deleteUser,
	registerUser,
	findUserByEmailOrUsername,
	findUserByEmailAndUsername,
	isValidRegister,
} from '../../manager/auth.manager';
// Models
import { User } from '../../database/models';
// Common Responses
import { success, failure, entityNotFound, serverError, genericError } from '../common.response';
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
	UnsubscribeResponse,
	CSRFResponse,
} from '../../../src/@common/models';
import { HTTPStatusCode } from '../../../src/@common/models/HttpStatusCode';
import { setSession, removeSession } from './cookies.utils';
import { comparePasswords } from './auth.utils';
import { unsubscribe } from '../../events/events';
import chalk from 'chalk';

const AUTH_WELCOME = 'auth:welcome';
const GENERIC_ERROR = 'auth:error.generic';
const WRONG_CREDENTIAL = 'auth:server.error.wrong_credential';
const router = Router();

/* FIXME:
router.get('/csrf', (req: Request, res: Response, next: NextFunction) => {
	const token = req.csrfToken();
	req.session.csrfSecret = token;
	res.set('xsrf-token', token);
	logger.info(`New csrf token ( ${token} for ${chalk.redBright(req.ip)}) !`);
	return success<CSRFResponse>(res, { label: '' }, { token });
});
*/

const registrationController = asyncMiddleware(async (req: Request, res: Response) => {
	logger.info('/register start ');
	const registrationInfo = req.body as OmitHistory<RegistrationRequest>;
	try {
		// Ripeto i controlli di validità sui dati anche qui in caso siano in qualche modo stati
		// bypassati quelli a FE.
		const errors = isValidRegister(registrationInfo);
		if (errors.length !== 0) {
			consumeRequest(req);
			return genericError(res, { errors });
		}
		const model: User = parseBody(registrationInfo);
		const user = await findUserByEmailOrUsername(model.username, model.email);
		if (user) {
			consumeRequest(req);
			return genericError(res, { errors: [{ label: GENERIC_ERROR }] });
		}
		const record = await registerUser(model, registrationInfo.playerRole);
		if (record) {
			setSession(record, req, res);
			logger.info('/register end ');
			return success<AuthenticationResponse>(
				res,
				{ label: AUTH_WELCOME, options: { username: record.name } },
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
});

const wrongCredentials = (res: Response) =>
	failure(res, { label: WRONG_CREDENTIAL }, 'Wrong credentials', HTTPStatusCode.Unauthorized);

router.get(
	'/check',
	withAuth,
	asyncMiddleware(async (req: AppRequest, res: Response) => {
		const additional: OmitGeneric<AuthenticationResponse> = { user: req.user };
		return success(res, { label: WRONG_CREDENTIAL, options: { username: req.user!.name } }, additional);
	})
);

router.get(
	'/logout',
	withAuth,
	asyncMiddleware(async (req: AppRequest, res: Response) => {
		removeSession(res, req);
		return success(res, { label: 'auth:logout' });
	})
);

router.post('/register', limitRequest, registrationController);

router.put(
	'/unsubscribe',
	withAuth,
	asyncMiddleware(async (req: AppRequest, res: Response) => {
		try {
			const { user, uuid } = req;
			unsubscribe(user!, uuid!);
			return success<UnsubscribeResponse>(res, { label: '' });
		} catch (err) {
			return serverError('PUT tournament/unsubscribe error ! : ', err, res);
		}
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
	limitRequest,
	asyncMiddleware(async (req: Request, res: Response) => {
		const { username, password } = req.body as OmitHistory<LoginRequest>;
		return await loginUserController(req, res, username, password);
	})
);

router.delete(
	'/delete',
	withAuth,
	asyncMiddleware(async (req: AppRequest, res: Response) => {
		const { password } = req.body as OmitHistory<DeleteUserRequest>;
		const { email, username } = req.user!;
		return await deleteUserController(req, res, username, email, password);
	})
);

// Test
router.post('/test/register', withTestAuth, registrationController);

router.delete(
	'/test/delete',
	withTestAuth,
	asyncMiddleware(async (req: AppRequest, res: Response) => {
		const { password, email, username } = req.body;
		return await deleteUserController(req, res, username, email, password);
	})
);

router.post(
	'/test/login',
	withTestAuth,
	asyncMiddleware(async (req: Request, res: Response) => {
		const { username, password } = req.body as OmitHistory<LoginRequest>;
		return await loginUserController(req, res, username, password);
	})
);

router.get(
	'/test/user',
	withTestAuth,
	asyncMiddleware(async (req: Request, res: Response) => {
		const { username, email } = req.query;
		const user = await findUserByEmailAndUsername(email as string, username as string);
		if (user) {
			const userDTO = convertEntityToDTO(user);
			return success<AuthenticationResponse>(
				res,
				{ label: AUTH_WELCOME, options: { username: userDTO.name } },
				{ user: userDTO }
			);
		} else {
			return entityNotFound(res);
		}
	})
);

const loginUserController = async (req: Request, res: Response, username: string, password: string) => {
	try {
		logger.info('/login start ');
		if (!username || !password) {
			consumeRequest(req);
			return genericError(res, { errors: [{ label: WRONG_CREDENTIAL }] });
		}
		const user = await findUserByEmailOrUsername(username, username);
		// User not found
		if (!user) {
			consumeRequest(req);
			return genericError(res, { errors: [{ label: WRONG_CREDENTIAL }] });
			// Do not expose information return entityNotFound(res);
		}
		// Compare passwords
		if (!(await comparePasswords(user.email, password, user.password))) {
			consumeRequest(req);
			return genericError(res, { errors: [{ label: WRONG_CREDENTIAL }] });
			// Do not expose information return wrongCredentials(res);
		}
		const userDTO = convertEntityToDTO(user);
		setSession(userDTO, req, res);
		return success<AuthenticationResponse>(
			res,
			{ label: AUTH_WELCOME, options: { username: userDTO.name } },
			{ user: userDTO }
		);
	} catch (error) {
		return serverError('POST auth/login error ! : ', error, res);
	}
};

const deleteUserController = async (req: Request, res: Response, username: string, email: string, password: string) => {
	try {
		logger.info('/delete start ');
		const user = await findUserByEmailAndUsername(email, username);
		if (!user) {
			return entityNotFound(res);
		}
		if (!(await comparePasswords(email, password, user.password))) {
			return wrongCredentials(res);
		}
		await deleteUser(user);
		logger.info('/delete end ');
		removeSession(res, req);
		return success<DeleteUserResponse>(res, { label: 'auth:server.deleted', options: { username: user.name } });
	} catch (error) {
		return serverError('DELETE auth/delete error ! : ', error, res);
	}
};

export default router;
