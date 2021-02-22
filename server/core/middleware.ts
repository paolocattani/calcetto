import { Request, Response, NextFunction } from 'express';
import chalk from 'chalk';
import { AppRequest } from '../controller';
// Models
import { User } from '../database/models';
// Core
import { logger } from '../core/logger';
import { isDevMode } from '../core/debug';
import { unauthorized } from '../controller/common.response';
import { isAdmin } from '../manager/auth.manager';
import { safeVerifyToken } from '../controller/auth/auth.utils';
import { Message, SessionStatus } from '../../src/@common/models';
import { sendNotification } from '../events/events';
import RateLimiter from 'ratelimiter';
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
const notify = (res: Response) => {
	logger.error(chalk.redBright('Unauthorized: Token Expired '));
	const message: Message = {
		status: SessionStatus.SESSION_EXPIRED,
		label: 'auth:expired_alert',
	};
	sendNotification(res, message, true);
	return unauthorized(res, { label: 'auth:expired' });
};
export const withAuth = async (req: AppRequest, res: Response, next: NextFunction) => {
	try {
		const { jwt, uuid } = req.session;
		if (!jwt || !uuid) {
			logger.error(chalk.redBright('Come back with more cookies... -> '));
			return unauthorized(res, { label: UNAUTHORIZED });
		}
		const [user, isTokenValid] = safeVerifyToken(jwt);
		if (isTokenValid && user) {
			// Controllo se l'utente esiste ancora a db
			const userDb = await User.findByPk(user.id);
			if (userDb) {
				req.user = user;
				req.uuid = uuid;
				next();
			}
		}
	} catch (error) {
		return notify(res);
	}
	return notify(res);
};

//--------- Check if user has admin rights
export const withAdminRights = (req: AppRequest, res: Response, next: NextFunction) => {
	if (!isAdmin(req.user)) {
		return unauthorized(res, { label: 'auth:expired' });
	}
	next();
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

//--------- API Quota / Slow down request : Prevente brute force attack
// https://github.com/microlinkhq/async-ratelimiter
export const apiQuota = async (req: Request, res: Response, next: NextFunction) => {
	let clientIp = getClientIp(req);
	logger.info('clientIP : ', clientIp);
	if (clientIp) {
		if (clientIp === '::1') {
			clientIp = 'localhost';
		}
		const limit = new RateLimiter({ id: clientIp, db: getRedisClient(1), max: 2500, duration: 3600000 });
		limit.get(function (err, limit) {
			if (err) {
				return next(err);
			}

			res.set('X-RateLimit-Limit', limit.total.toString());
			res.set('X-RateLimit-Remaining', (limit.remaining - 1).toString());
			res.set('X-RateLimit-Reset', limit.reset.toString());

			// all good
			logger.info('%s Remaining %s/%s', clientIp, limit.remaining - 1, limit.total);
			if (limit.remaining) return next();

			// not good
			var delta = (limit.reset * 1000 - Date.now()) | 0;
			var after = (limit.reset - Date.now() / 1000) | 0;
			res.set('Retry-After', after.toString());
			return unauthorized(res, { label: UNAUTHORIZED, options: { interval: after } });
		});
	} else {
		next();
	}
};

export const slowDownAPIRequest = async (req: Request, res: Response, next: NextFunction) => {};
