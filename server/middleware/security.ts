//--------- API Quota / Slow down request : Prevente brute force attack

import { NextFunction, Response, Request } from 'express';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import { getClientIp } from 'request-ip';
import { AppRequest } from '../controller';
import { unauthorized } from '../controller/common.response';
import { logger } from '../core/logger';
import { getRedisClient } from '../database/config/redis/connection';

//--------- Gather client info
export const clientInfo = (req: Request, res: Response, next: NextFunction) => {
	let clientIp = getClientIp(req);
	req.clientIp = clientIp || undefined;
	next();
};

//---------> Prevent brute force attack and DDoS
const redisClient = getRedisClient(1);
const maxWrongAttemptsByIPperMinute = 5;
const maxWrongAttemptsByIPperDay = 25;

const limiterFastBruteByIP = new RateLimiterRedis({
	storeClient: redisClient,
	keyPrefix: 'login_fail_ip_per_minute',
	points: maxWrongAttemptsByIPperMinute,
	duration: 30,
	blockDuration: 60 * 10, // Block for 10 minutes, if 5 wrong attempts per 30 seconds
});

export const preventBruteForceDDoS = async (req: AppRequest, res: Response, next: NextFunction) => {
	try {
		const clientIp = req.clientIp;
		logger.info('clientIP : ', clientIp);
		if (clientIp) {
			const rateLimiterRes = await rateLimiter.consume(clientIp);
			req.api = rateLimiterRes;
			res.set('Retry-After', (Math.round(rateLimiterRes.msBeforeNext / 1000) || 1).toString());
			res.set('X-RateLimit-Limit', rateLimiterOpts.points.toString());
			res.set('X-RateLimit-Remaining', rateLimiterRes.remainingPoints.toString());
			res.set('X-RateLimit-Reset', new Date(Date.now() + rateLimiterRes.msBeforeNext).toString());
			next();
		}
	} catch (error) {
		return unauthorized(res, { label: 'common:too_many_requests' });
	}
	return unauthorized(res, { label: 'common:too_many_requests' });
};
