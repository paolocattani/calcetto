import { SequelizeOptions } from 'sequelize-typescript';
// import { dbLogger as logger } from '@core/logger';
import { Environment } from '@common/models/common.models';
// https://github.com/sequelize/sequelize/issues/11371

type SequelizeEnvList = {
	[key in Environment]: SequelizeConfiguration;
};

export interface SequelizeConfiguration extends SequelizeOptions {
	useEnvVar: string;
	databaseVersion?: string;
	schema?: string;
	dialectOptions?: {
		ssl?: {
			require?: boolean;
			rejectUnauthorized?: boolean;
		};
	};
}

// Sequelize configuration
const config: SequelizeEnvList = {
	development: {
		useEnvVar: 'DATABASE_URL',
		dialect: 'postgres',
		minifyAliases: true,
		logging: false, //(sqlString: string) => logger.warn(sqlString),
		pool: { max: 5, min: 0, acquire: 30000, idle: 10000 },
	},
	test: {
		useEnvVar: 'DATABASE_URL',
		dialect: 'postgres',
		minifyAliases: true,
		logging: false, //(sqlString: string) => logger.warn(sqlString),
		pool: { max: 5, min: 0, acquire: 30000, idle: 10000 },
		dialectOptions: {
			ssl: {
				require: true,
				rejectUnauthorized: false,
			},
		},
	},
	production: {
		useEnvVar: 'DATABASE_URL', // Default name on Heroku
		dialect: 'postgres',
		logging: false,
		minifyAliases: true,
		pool: { max: 5, min: 0, acquire: 30000, idle: 10000 },
		dialectOptions: {
			ssl: {
				require: true,
				rejectUnauthorized: false,
			},
		},
	},
};

export default config;
