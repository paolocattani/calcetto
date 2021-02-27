import { Environment } from '../../../../src/@common/models/common.models';
import { ClientOpts } from 'redis';
// https://github.com/sequelize/sequelize/issues/11371

type RedisEnvList = {
	[key in Environment]: ClientOpts;
};

// Redis configuration
const config: RedisEnvList = {
	development: {
		url: process.env.REDISCLOUD_URL,
	},
	test: {
		url: process.env.REDISCLOUD_URL,
	},
	production: {
		url: process.env.REDISCLOUD_URL,
	},
};

export default config;
