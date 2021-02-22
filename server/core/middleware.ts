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
import RateLimiter from 'async-ratelimiter';
import { getClientIp } from 'request-ip';
import { getRedisClient } from '../database/config/redis/connection';

const UNAUTHORIZED = 'common:server.unauthorized';
//--------- Log route
export const routeLogger = (req: Request, res: Response, next: NextFunction) => {
	if (isDevMode()) logger.info(`Serving route : ${chalk.greenBright.bold(req.originalUrl)}`);
	next();
};

//--------- Log controller name
export const controllerLogger = (req: Request, next: NextFunction, controller: string, path: string) => {
	if (isDevMode()) logger.info(`${controller} Controller : ${req.method} ${req.originalUrl.replace(path, '')} `);
	next();
};

//--------- Default cache control
export const cacheControl = (req: Request, res: Response, next: NextFunction) => {
	// Period in second, this one is 5 minutes
	const period = 60 * 5;
	// you only want to cache for GET requests
	// for the other requests set strict no caching parameters
	res.set('Cache-control', req.method == 'GET' ? `public, max-age=${period}` : 'no-store');

	next();
};

//--------- Do not cache this request
export const doNotCacheThis = (req: Request, res: Response, next: NextFunction) => {
	res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
	res.set('Pragma', 'no-cache');
	res.set('Expires', '0');

	next();
};

//--------- Resolve promises
export const asyncMiddleware = (fn: any) => (req: Request, res: Response, next: NextFunction) => {
	Promise.resolve(fn(req, res, next)).catch(next);
};

//--------- Check authorization :
export const withAuth = async (req: AppRequest, res: Response, next: NextFunction) => {
	logger.info('withAuth :', req.session);
	try {
		const { user, uuid } = req.session;
		if (!user || !uuid) {
			logger.error(chalk.redBright('Come back with more cookies... -> '));
			return unauthorized(res, { label: UNAUTHORIZED });
		}
		// Controllo se l'utente esiste ancora a db
		const userDb = await User.findByPk(user.id);
		if (userDb) {
			req.user = user;
			req.uuid = uuid;
			next();
		} else {
			logger.error(chalk.redBright('Unauthorized: Token Expired '));
			const message: Message = {
				status: SessionStatus.SESSION_EXPIRED,
				label: 'auth:expired_alert',
			};
			sendNotification(res, message, true);
			return unauthorized(res, { label: 'auth:expired' });
		}
	} catch (error) {
		logger.error(chalk.redBright('Unauthorized: Token Expired '));
		const message: Message = {
			status: SessionStatus.SESSION_EXPIRED,
			label: 'auth:expired_alert',
		};
		sendNotification(res, message, true);
		return unauthorized(res, { label: 'auth:expired' });
	}
};

//--------- Check if user has admin rights
export const withAdminRights = (req: AppRequest, res: Response, next: NextFunction) => {
	if (!isAdmin(req.user)) {
		return unauthorized(res, { label: 'auth:expired' });
	} else next();
};

//--------- Check authorization for test
export const withTestAuth = (req: AppRequest, res: Response, next: NextFunction) => {
	const { secret } = req.body;
	if (process.env.NODE_ENV !== 'test' || secret !== process.env.SERVER_SECRET) {
		return unauthorized(res, { label: UNAUTHORIZED });
	}
	next();
};

//--------- Audit Control : TODO:
export const auditControl = (req: Request, res: Response, next: NextFunction) => {
	next();
};

//--------- API Quota : Prevente brute force attack
const rateLimiter = new RateLimiter({
	db: getRedisClient(),
	max: 2500,
	duration: 3600000,
});

// Prevent brute force attack
// https://github.com/microlinkhq/async-ratelimiter
export const apiQuota = async (req: Request, res: Response, next: NextFunction) => {
	const clientIp = getClientIp(req);
	if (clientIp) {
		const limit = await rateLimiter.get({ id: clientIp });

		if (!res.writableEnded && !res.headersSent) {
			res.setHeader('X-Rate-Limit-Limit', limit.total);
			res.setHeader('X-Rate-Limit-Remaining', Math.max(0, limit.remaining - 1));
			res.setHeader('X-Rate-Limit-Reset', limit.reset);
		}

		return !limit.remaining ? unauthorized(res, { label: UNAUTHORIZED }) : next();
	}
	next();
};
