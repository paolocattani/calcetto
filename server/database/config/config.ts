import { SequelizeOptions } from 'sequelize-typescript';
import { dbLogger as logger } from '../../core/logger';
import { Environment } from '../../../src/@common/models/common.models';
// https://github.com/sequelize/sequelize/issues/11371

export type EnvList = {
  [key in Environment]: SequelizeConfiguration;
};

export interface SequelizeConfiguration extends SequelizeOptions {
  useEnvVar: string;
	databaseVersion?:string;
	schema?:string;
}

// Sequelize configuration
const config: EnvList = {
  development: {
    useEnvVar: 'DEV_URL',
    dialect: 'postgres',
    logging: (sqlString: string) => logger.warn(sqlString),
    pool: { max: 5, min: 0, acquire: 30000, idle: 10000 },
  },
  test: {
    useEnvVar: 'TEST_URL',
    dialect: 'postgres',
		schema: process.env.TEST_SCHEMA,
		databaseVersion: '11.5.0',
    logging: (sqlString: string) => logger.warn(sqlString),
    pool: { max: 5, min: 0, acquire: 30000, idle: 10000 },
    /*
		dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
     */
  },
  production: {
    useEnvVar: 'DATABASE_URL', // Default name on Heroku
    dialect: 'postgres',
    logging: false,
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
