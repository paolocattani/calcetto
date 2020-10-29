//
// scotch.io/tutorials/getting-started-with-node-express-and-postgres-using-sequelize
// https://truetocode.com/using-sequelize-with-typescript-and-express-import-all-model-files/
// https://github.com/RobinBuschmann/sequelize-typescript
//

// Core
import '../core/env';
import { logger } from '../core/logger';
import { isProductionMode } from '../core/debug';
// Sequelize
import { Options, SyncOptions } from 'sequelize';
import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import config from './config/config';
// Other
import util from 'util';
import chalk from 'chalk';

let connection: Sequelize;
async function loadModels(): Promise<Sequelize> {
  const envConfig: any | string | SequelizeOptions | Options = isProductionMode()
    ? config.production
    : config.development;
  const uri: string = process.env[envConfig.use_env_variable]!;
  if (!isProductionMode()) logger.info(`URI : ${chalk.red.bold(util.inspect(uri))}`);
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
  return uri
    ? new Sequelize(uri, connectionOptions)
    : new Sequelize(envConfig.database, envConfig.username, envConfig.password, connectionOptions);
}

export async function authenticate(options?: SyncOptions): Promise<Sequelize> {
  console.log('authenticate');
  if (connection) {
    console.log('authenticate. Connection found');
    logger.info(chalk.cyan.bold('Connection found! Database connected!'));
    return connection;
  }
  console.log('authenticate. Connection not');
  const sequelizeconnection = await loadModels();
  await sequelizeconnection.authenticate(options);
  logger.info(chalk.cyan.bold('Database connected!'));
  return sequelizeconnection;
}

export async function sync(options?: SyncOptions): Promise<Sequelize> {
  if (connection) return connection;
  const sequelizeconnection = await loadModels();
  connection = await sequelizeconnection.sync(options);
  logger.info(chalk.cyan.bold('Database synchronization complete!'));
  return connection;
}

export const getDbConnection = async () => (connection ? connection : await authenticate());
