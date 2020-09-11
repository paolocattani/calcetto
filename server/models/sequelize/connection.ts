//
// scotch.io/tutorials/getting-started-with-node-express-and-postgres-using-sequelize
// https://truetocode.com/using-sequelize-with-typescript-and-express-import-all-model-files/
// https://github.com/RobinBuschmann/sequelize-typescript
//

// Core
import '../../core/env';
import { logger } from '../../core/logger';
import { isProductionMode } from '../../core/debug';
// Sequelize
import { Options, SyncOptions } from 'sequelize';
import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import config from '../../config/config';
// Other
import util from 'util';
import chalk from 'chalk';

export default async function syncDb(options?: SyncOptions): Promise<Sequelize> {
  const envConfig: any | string | SequelizeOptions | Options = isProductionMode()
    ? config.production
    : config.development;
  const uri: string = process.env[envConfig.use_env_variable]!;
  if (!isProductionMode()) logger.info(`sequelize.index : uri ${chalk.red.bold(util.inspect(uri))}`);
  const connectionOptions: SequelizeOptions = {
    logging: envConfig.logging,
    dialect: 'postgres',
    dialectOptions: isProductionMode()
      ? {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        }
      : undefined,
    models: [__dirname + '/*.model.ts'],
    modelMatch: (filename: string, member: string) =>
      filename.substring(0, filename.indexOf('.model')) === member.toLowerCase(),
    pool: { max: 5, min: 0, acquire: 30000, idle: 10000 },
  };
  const sequelizeconnection = uri
    ? new Sequelize(uri, connectionOptions)
    : new Sequelize(envConfig.database, envConfig.username, envConfig.password, connectionOptions);

  const dbConnection = options ? await sequelizeconnection.sync(options) : await sequelizeconnection.sync();
  // const dbConnection = options ? await sequelizeconnection.authenticate(options) : await sequelizeconnection.authenticate();
  logger.info(chalk.cyan.bold('Database synchronization complete!'));
  return dbConnection;
}
