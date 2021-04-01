//
// scotch.io/tutorials/getting-started-with-node-express-and-postgres-using-sequelize
// https://truetocode.com/using-sequelize-with-typescript-and-express-import-all-model-files/
// https://github.com/RobinBuschmann/sequelize-typescript
//

// Core
import { logger } from '@core/logger';
import { isProductionMode } from '@common/utils/env.utils';
// Sequelize
import { SyncOptions } from 'sequelize';
import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import config from './config';
// Other
import util from 'util';
import chalk from 'chalk';
import { Environment } from '@common/models';
import path from 'path';
import { fileExtension } from '@core/utils';
import { StatsPairs, StatsPlayer } from '../../models';

let connection: Sequelize;

interface SequelizeSyncOptions extends SyncOptions {
	restartIdentity?: boolean;
}

export const getSequelizeEnv = () =>
	config[process.env.NODE_ENV ? (process.env.NODE_ENV as Environment) : Environment.development];

async function loadModels(schema?: string): Promise<Sequelize> {
	const envConfig = getSequelizeEnv();
	const uri = process.env[envConfig.useEnvVar]!;
	const modelsPath = `${__dirname}/../../models/**/*.model.${fileExtension()}`;
	/* FIXME: this function does not get respected by sequelize
	const modelMatch = (filename: string) => {
		const isValid = !(force && ['stats.pairs.model', 'stats.players.model'].includes(filename.toLowerCase()));
		if (!isValid) {
			logger.warn(`Excluding model : ${chalk.redBright(filename)}`);
		}
		logger.info(`Model ${chalk.greenBright(filename)} : ${isValid} `);
		return isValid;
	};
	*/
	if (!isProductionMode()) {
		logger.info(`Sequelize URI : ${chalk.red.bold(util.inspect(uri))}`);
		logger.info(`Sequelize Models : '${chalk.green(path.resolve(modelsPath))}'`);
	}

	const connectionOptions: SequelizeOptions = {
		...envConfig,
		define: { schema },
		models: [modelsPath],
		// modelMatch,
	};

	// If NODE_ENV == 'test' and IS_DOCKER test are running in CI and I'm trying to connect to a container without SSL
	if (
		process.env.NODE_ENV === 'test' &&
		process.env.IS_DOCKER &&
		process.env.IS_DOCKER.toLowerCase() === 'true' &&
		connectionOptions.dialectOptions
	) {
		logger.warn('Removing SSL option ! ');
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
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
	logger.info(chalk.cyan.bold('Sequelize connected!'));
	return connection;
}

export async function sync(options?: SequelizeSyncOptions): Promise<Sequelize> {
	connection = await loadModels();
	const force = process.env.SERVER_FORCE && process.env.SERVER_FORCE.toLowerCase() === 'true';
	if (force) {
		connection.modelManager.removeModel(StatsPairs);
		connection.modelManager.removeModel(StatsPlayer);
	}
	await connection.sync(options);
	logger.info(chalk.cyan.bold('Sequelize synchronization complete!'));
	if (force) {
		connection.addModels([StatsPairs, StatsPlayer]);
	}
	return connection;
}

export async function createSchemaAndSync(schema: string, options?: SequelizeSyncOptions): Promise<Sequelize> {
	connection = await loadModels(schema);
	await connection.dropSchema(schema, {});
	await connection.createSchema(schema, {});
	await connection.sync({ ...options, schema, searchPath: schema });
	logger.info(chalk.cyan.bold(`Sequelize synchronizatio1n complete on schema ${schema}!`));
	return connection;
}

export const getDbConnection = async () => (connection ? connection : await authenticate());
