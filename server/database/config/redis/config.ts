import { Environment } from '../../../../src/@common/models/common.models';
import { ClientOpts } from 'redis';
// https://github.com/sequelize/sequelize/issues/11371

type RedisEnvList = {
	[key in Environment]: ClientOpts;
};

// Redis configuration
const config: RedisEnvList = {
	development: {
		url: process.env.REDIS_DEV_URL,
	},
	test: {
		url: process.env.REDIS_TEST_URL,
	},
	production: {
		url: process.env.REDIS_PROD_URL,
	},
};

export default config;
