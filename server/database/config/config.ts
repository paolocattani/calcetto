import { SequelizeOptions } from 'sequelize-typescript';
import { dbLogger as logger } from '../../core/logger';
import { Environment } from '../../../src/@common/models/common.models';
// https://github.com/sequelize/sequelize/issues/11371

export type EnvList = {
  [key in Environment]: SequelizeConfiguration;
};

export interface SequelizeConfiguration extends SequelizeOptions {
  useEnvVar: string;
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
    logging: (sqlString: string) => logger.warn(sqlString),
    pool: { max: 5, min: 0, acquire: 30000, idle: 10000 },
  },
  production: {
    useEnvVar: 'DATABASE_URL', // Default name on Heroku
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    pool: { max: 5, min: 0, acquire: 30000, idle: 10000 },
  },
};

export default config;
