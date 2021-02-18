import { Request, Response, NextFunction } from 'express';
import chalk from 'chalk';
import { AppRequest } from '../controller';
// Models
import { User } from '../database/models';
// Core
import { logger } from '../core/logger';
import { isDevMode } from '../core/debug';
import { unauthorized } from '../controller/common.response';
import { getCookies } from '../controller/auth/cookies.utils';
import { isAdmin } from '../manager/auth.manager';
import { safeVerifyToken } from '../controller/auth/auth.utils';
import { Message, SessionStatus } from '../../src/@common/models';
import { sendNotification } from '../events/events';

// dev logger
export const routeLogger = (req: Request, res: Response, next: NextFunction) => {
	if (isDevMode()) logger.info(`Serving route : ${chalk.greenBright.bold(req.originalUrl)}`);
	next();
};

export const controllerLogger = (req: Request, next: NextFunction, controller: string, path: string) => {
	if (isDevMode()) logger.info(`${controller} Controller : ${req.method} ${req.originalUrl.replace(path, '')} `);
	next();
};

export const cacheControl = (req: Request, res: Response, next: NextFunction) => {
	// Period in second, this one is 5 minutes
	const period = 60 * 5;
	// you only want to cache for GET requests
	// for the other requests set strict no caching parameters
	res.set('Cache-control', req.method == 'GET' ? `public, max-age=${period}` : 'no-store');

	next();
};

export const doNotCacheThis = (req: Request, res: Response, next: NextFunction) => {
	res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
	res.set('Pragma', 'no-cache');
	res.set('Expires', '0');

	next();
};

// Da utilizzare per le funzioni async, altrimenti viene ritornata una Promise
export const asyncMiddleware = (fn: any) => (req: Request, res: Response, next: NextFunction) => {
	Promise.resolve(fn(req, res, next)).catch(next);
};

// Controllo autenticazione. Da utilizzare per tutte le API che richiedono autenticazione
export const withAuth = async (req: AppRequest, res: Response, next: NextFunction) => {
	const [token, uuid] = getCookies(req);
	if (!token || typeof token != 'string' || !uuid) {
		logger.error(chalk.redBright('Come back with more cookies... -> '));
		return unauthorized(res, { label: 'common:server.unauthorized' });
	}
	const [user, isTokenValid] = safeVerifyToken(token);
	if (isTokenValid && user) {
		// Controllo se l'utente esiste ancora a db
		const userDb = await User.findByPk(user.id);
		if (userDb) {
			req.user = user;
			req.uuid = uuid;
			next();
		}
	} else {
		logger.error(chalk.redBright('Unauthorized: Token Expired '));
		const message: Message = {
			status: SessionStatus.SESSION_EXPIRED,
			label: 'auth:expired_alert',
		};
		sendNotification(res, message, true);
		return unauthorized(res, { label: 'auth:expired' });
	}
};

// Controllo se l'utente ha le autorizzazioni di amminstratore, altrimenti picche
export const withAdminRights = (req: AppRequest, res: Response, next: NextFunction) => {
	if (!isAdmin(req.user)) {
		return unauthorized(res, { label: 'auth:expired' });
	} else next();
};

// Check authorization for test
export const withTestAuth = (req: AppRequest, res: Response, next: NextFunction) => {
	const { secret } = req.body;
	if (process.env.NODE_ENV !== 'test' || secret !== process.env.SERVER_SECRET) {
		return unauthorized(res, { label: 'common:server.unauthorized' });
	}
	next();
};

//TODO: Controllo accessi
export const auditControl = (req: Request, res: Response, next: NextFunction) => {
	next();
};
