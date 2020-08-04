import { dbLogger as logger } from '../core/logger';
// https://github.com/sequelize/sequelize/issues/11371

// Sequelize configuration
export default {
  development: {
    use_env_variable: 'DEV_URL',
    logging: (sqlString: string) => logger.warn(sqlString),
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    logging: false,
  },
};
