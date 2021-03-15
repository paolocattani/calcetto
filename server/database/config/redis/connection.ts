import { Environment } from '../../../../src/@common/models';
import config from './config';
import redis from 'redis';
import { isProductionMode } from '../../../../src/@common/utils/env.utils';

export const getRedisEnv = () =>
	config[process.env.NODE_ENV ? (process.env.NODE_ENV as Environment) : Environment.development];

/**
 * 0 : session
 * 1 : rate limit
 * @param db
 */
export function getRedisClient(db?: number) {
	return redis.createClient(db && !isProductionMode() ? { ...getRedisEnv(), db } : getRedisEnv());
}
