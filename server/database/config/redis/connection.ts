import { Environment } from '@common/models';
import { isProductionMode } from '@common/utils/env.utils';
import { logger } from '@core/logger';
import redis from 'redis';
import config from './config';

export const getRedisEnv = () =>
	config[process.env.NODE_ENV ? (process.env.NODE_ENV as Environment) : Environment.development];

export function getRedisClient(db?: number) {
	const client = redis.createClient(db && !isProductionMode() ? { ...getRedisEnv(), db } : getRedisEnv());
	client.on('error', (err) => logger.error('Redis error : ', err));
	return client;
}
