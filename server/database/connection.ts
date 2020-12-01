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
import { SyncOptions } from 'sequelize';
import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import config, { SequelizeConfiguration } from './config/config';
// Other
import util from 'util';
import chalk from 'chalk';
import { Environment } from '../../src/@common/models';

let connection: Sequelize;

interface SequelizeSyncOptions extends SyncOptions{
	restartIdentity?:boolean
}
async function loadModels(): Promise<Sequelize> {
  // FIXME: should import types from @commmon/typings
  const envConfig: SequelizeConfiguration =
    config[process.env.NODE_ENV ? (process.env.NODE_ENV as Environment) : Environment.development];
  const uri: string = process.env[envConfig.useEnvVar]!;
  if (!isProductionMode()) logger.info(`URI : ${chalk.red.bold(util.inspect(uri))}`);
  const connectionOptions: SequelizeOptions = {
    ...envConfig,
    models: [__dirname + '/*.model.ts'],
    modelMatch: (filename: string, member: string) =>
      filename.substring(0, filename.indexOf('.model')) === member.toLowerCase(),
  };

  // If NODE_ENV == 'test' and IS_DOCKER test are running in CI and I'm trying to connect to a container without SSL
	if(process.env.NODE_ENV === 'test' && process.env.IS_DOCKER && connectionOptions.dialectOptions) {
		// @ts-ignore
		delete connectionOptions.dialectOptions.ssl;
	}
  return new Sequelize(uri, connectionOptions);
}

export async function authenticate(options?: SequelizeSyncOptions): Promise<Sequelize> {
  if (connection) {
    logger.info(chalk.cyan.bold('Connection found! Database connected!'));
    return connection;
  }
  const sequelizeConnection = await loadModels();
  await sequelizeConnection.authenticate(options);
  logger.info(chalk.cyan.bold('Database connected!'));
  return sequelizeConnection;
}

export async function sync(options?: SequelizeSyncOptions): Promise<Sequelize> {
  if (connection) return connection;
  const sequelizeConnection = await loadModels();
  connection = await sequelizeConnection.sync(options);
  logger.info(chalk.cyan.bold('Database synchronization complete!'));
  return connection;
}

export async function createSchemaAndSync(schema:string, options?: SequelizeSyncOptions): Promise<Sequelize> {
	if (connection) return connection;
	const sequelizeConnection = await loadModels();
	await sequelizeConnection.createSchema(schema, {});
	connection = await sequelizeConnection.sync({...options, schema});
	logger.info(chalk.cyan.bold('Database synchronizatio1n complete!'));
	return connection;
}

export const getDbConnection = async () => (connection ? connection : await authenticate());
