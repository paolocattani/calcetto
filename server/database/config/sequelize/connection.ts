//
// scotch.io/tutorials/getting-started-with-node-express-and-postgres-using-sequelize
// https://truetocode.com/using-sequelize-with-typescript-and-express-import-all-model-files/
// https://github.com/RobinBuschmann/sequelize-typescript
//

// Core
import '../../../core/env';
import { logger } from '../../../core/logger';
import { isProductionMode } from '../../../core/debug';
// Sequelize
import { SyncOptions } from 'sequelize';
import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import config from './config';
// Other
import util from 'util';
import chalk from 'chalk';
import { Environment } from '../../../../src/@common/models';
import { isTsEnv } from '../../../core/utils';

let connection: Sequelize;

interface SequelizeSyncOptions extends SyncOptions {
	restartIdentity?: boolean;
}

export const getSequelizeEnv = () => config[process.env.NODE_ENV ? process.env.NODE_ENV : Environment.development];

async function loadModels(schema?: string): Promise<Sequelize> {
	const envConfig = getSequelizeEnv();
	const uri = process.env[envConfig.useEnvVar]!;
	if (!isProductionMode()) {
		logger.info(`URI : ${chalk.red.bold(util.inspect(uri))}`);
	}
	const connectionOptions: SequelizeOptions = {
		...envConfig,
		models: [`${__dirname}/../models/**/*.model.${isTsEnv() ? 'ts' : 'js'}`],
		define: { schema },
	};

	// If NODE_ENV == 'test' and IS_DOCKER test are running in CI and I'm trying to connect to a container without SSL
	if (process.env.NODE_ENV === 'test' && process.env.IS_DOCKER && connectionOptions.dialectOptions) {
		// @ts-ignore
		delete connectionOptions.dialectOptions.ssl;
	}
	return new Sequelize(uri, connectionOptions);
}

export async function authenticate(options?: SequelizeSyncOptions): Promise<Sequelize> {
	if (connection) {
		return connection;
	}
	connection = await loadModels();
	await connection.authenticate(options);
	logger.info(chalk.cyan.bold('Database connected!'));
	return connection;
}

export async function sync(options?: SequelizeSyncOptions): Promise<Sequelize> {
	connection = await loadModels();
	await connection.sync(options);
	logger.info(chalk.cyan.bold('Database synchronization complete!'));
	return connection;
}

export async function createSchemaAndSync(schema: string, options?: SequelizeSyncOptions): Promise<Sequelize> {
	connection = await loadModels(schema);
	await connection.dropSchema(schema, {});
	await connection.createSchema(schema, {});
	await connection.sync({ ...options, schema, searchPath: schema });
	logger.info(chalk.cyan.bold(`Database synchronizatio1n complete on schema ${schema}!`));
	return connection;
}

export const getDbConnection = async () => (connection ? connection : await authenticate());
