import { logger, dbLogger } from '../../core/logger';
import { Umzug, SequelizeStorage } from 'umzug';
import { Sequelize } from 'sequelize';
import { SequelizeConfiguration } from '../config/sequelize/config';
import { getSequelizeEnv } from '../config/sequelize/connection';
import { isTsEnv } from '../../core/utils';

// https://github.com/sequelize/umzug/blob/master/examples/1.sequelize-typescript/umzug.ts
// https://github.com/sequelize/umzug

const envConfig: SequelizeConfiguration = getSequelizeEnv();
const uri: string = process.env[envConfig.useEnvVar]!;
export type UmzugContext = {
	context: Sequelize;
};
export const sequelize = new Sequelize(uri, envConfig);

export const umzug = new Umzug({
	migrations: {
		glob: [`./*migration.${isTsEnv() ? 'ts' : 'js'}`, { cwd: __dirname }],
	},
	context: sequelize,
	storage: new SequelizeStorage({ sequelize }),
	logger: dbLogger,
});

export type Migration = typeof umzug._types.migration;

// Checks migrations and run them if they are not already applied. To keep
// track of the executed migrations, a table (and sequelize model) called SequelizeMeta
// will be automatically created (if it doesn't exist already) and parsed.
export const migrationUp = async () => {
	logger.info('Running migration up...');
	await umzug.up();
	logger.info('Migration up complete');
};
export const migrationDown = async () => {
	logger.info('Running migration down...');
	await umzug.down();
	logger.info('Migration down complete');
};
