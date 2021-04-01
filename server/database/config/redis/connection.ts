import { Environment } from '@common/models';
import config from './config';
import redis from 'redis';
import { isProductionMode } from '@common/utils/env.utils';
import { logger } from '@core/logger';

export const getRedisEnv = () =>
	config[process.env.NODE_ENV ? (process.env.NODE_ENV as Environment) : Environment.development];

export function getRedisClient(db?: number) {
	const client = redis.createClient(db && !isProductionMode() ? { ...getRedisEnv(), db } : getRedisEnv());
	client.on('error', logger.error);
	return client;
}
