import { Environment } from '../../../../src/@common/models';
import config from './config';
import redis from 'redis';

export const getRedisEnv = () =>
	config[process.env.NODE_ENV ? (process.env.NODE_ENV as Environment) : Environment.development];

export const getRedisClient = () => redis.createClient(getRedisEnv());
