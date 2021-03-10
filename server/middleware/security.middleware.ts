//--------- API Quota / Slow down request : Prevente brute force attack

import { NextFunction, Response, Request } from 'express';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import { getClientIp } from 'request-ip';
import { AppRequest } from '../controller';
import { unauthorized } from '../controller/common.response';
import { logger } from '../core/logger';
import { getRedisClient } from '../database/config/redis/connection';
import { ConfigManager } from '../manager/config.manager';
import chalk from 'chalk';

const TOO_MANY_REQUEST = 'common:too_many_requests';
//--------- Gather client info
export const clientInfo = (req: Request, res: Response, next: NextFunction) => {
	let clientIp = getClientIp(req);
	req.clientIp = clientIp || undefined;
	if (clientIp) {
		logger.info(chalk.yellowBright(`Incoming request from ${clientIp}`));
	}
	next();
};

//---------> Prevent brute force attack and DDoS
// https://medium.com/@animirr/brute-force-protection-node-js-examples-cd58e8bd9b8d#2368
const redisClient = getRedisClient(1);
const maxWrongAttemptsByIPperMinute = async () => {
	const config = await ConfigManager.findByKey('MAX_ATTEMPS_PER_MINUTE');
	return config && config.value ? parseInt(config.value) : 5;
};
const maxWrongAttemptsByIPperDay = async () => {
	const config = await ConfigManager.findByKey('MAX_ATTEMPS_PER_DAY');
	return config && config.value ? parseInt(config.value) : 25;
};
let maxPerMinute: number;
let limiterMinute: RateLimiterRedis;
const limiterFastBruteByIP = async () => {
	if (!maxPerMinute) {
		maxPerMinute = await maxWrongAttemptsByIPperMinute();
	}
	if (!limiterMinute) {
		limiterMinute = new RateLimiterRedis({
			storeClient: redisClient,
			keyPrefix: 'login_fail_ip_per_minute',
			points: maxPerMinute,
			duration: 30,
			blockDuration: 60 * 10, // Block for 10 minutes, if 5 wrong attempts per 30 seconds
		});
	}
	return limiterMinute;
};
let maxPerDay: number;
let limiterDay: RateLimiterRedis;
const limiterSlowBruteByIP = async () => {
	if (!maxPerDay) {
		maxPerDay = await maxWrongAttemptsByIPperDay();
	}
	if (!limiterDay) {
		limiterDay = new RateLimiterRedis({
			storeClient: redisClient,
			keyPrefix: 'login_fail_ip_per_day',
			points: maxPerDay,
			duration: 60 * 60 * 24,
			blockDuration: 60 * 60 * 24, // Block for 1 day, if 100 wrong attempts per day
		});
	}
	return limiterDay;
};

export const consumeRequest = async (req: AppRequest) => {
	const clientIp = req.clientIp;
	if (clientIp) {
		await limiterMinute.consume(clientIp);
		await limiterDay.consume(clientIp);
	}
};
// eslint-disable-next-line sonarjs/cognitive-complexity
export const limitRequest = async (req: AppRequest, res: Response, next: NextFunction) => {
	try {
		//const clientIp = req.clientIp;
		const clientIp = req.socket.remoteAddress;
		if (!limiterDay || !limiterMinute) {
			await limiterSlowBruteByIP();
			await limiterFastBruteByIP();
		}
		if (clientIp) {
			const resFastByIP = await limiterMinute.get(clientIp);
			const resSlowByIP = await limiterDay.get(clientIp);
			let retrySecs = 0;

			if (resFastByIP) {
				logger.info(`LimitRequest -> ${clientIp} : ${resFastByIP.consumedPoints}/${maxPerMinute} per minute`);
			}
			if (resSlowByIP) {
				logger.info(`LimitRequest -> ${clientIp} : ${resSlowByIP.consumedPoints}/${maxPerDay} per day `);
			}

			// Check if IP is already blocked
			if (resSlowByIP !== null && resSlowByIP.consumedPoints > maxPerDay) {
				retrySecs = Math.round(resSlowByIP.msBeforeNext / 1000) || 1;
				logger.info(
					chalk.redBright(`LimitRequest -> ${clientIp} exceed max request per minute ! Wait for ${retrySecs} seconds.`)
				);
			} else if (resFastByIP !== null && resFastByIP.consumedPoints > maxPerMinute) {
				retrySecs = Math.round(resFastByIP.msBeforeNext / 1000) || 1;
				logger.info(
					chalk.redBright(`LimitRequest -> ${clientIp} exceed max request per day ! Wait for ${retrySecs} seconds.`)
				);
			}
			if (retrySecs > 0) {
				res.set('Retry-After', String(retrySecs));
				return unauthorized(res, { label: TOO_MANY_REQUEST, options: { interval: String(retrySecs) } });
			}

			if (resSlowByIP) {
				res.set('Retry-After', (Math.round(resSlowByIP.msBeforeNext / 1000) || 1).toString());
				res.set('X-RateLimit-Limit', maxPerMinute.toString());
				res.set('X-RateLimit-Remaining', resSlowByIP.remainingPoints.toString());
				// res.set('X-RateLimit-Reset', new Date(Date.now() + resSlowByIP.msBeforeNext).toString());
			}
			next();
		}
	} catch (error) {
		logger.error(chalk.redBright('security middleware error'), error);
		return unauthorized(res, { label: TOO_MANY_REQUEST });
	}
};
