// Server
import { CorsOptions } from 'cors';
import { AbstractServer } from './AbstractServer';
import { Application as ExpressApplication } from 'express';
// Db
import { sync, authenticate, createSchemaAndSync } from '../database/config/connection';
import { Sequelize } from 'sequelize-typescript';
import generator from '../generator/generator';
// Routes
import routes from '../controller/index';
// Utils
import '../core/env';
import chalk from 'chalk';
import { logger } from '../core/logger';
import { isDevMode, isProductionMode, isTestMode } from '../core/debug';
import { migrationUp } from '../database/migrations';

const defaultName: string = 'ApplicationServer Calcetto';
const defaultPort: number = isProductionMode() ? Number(process.env.PORT) : Number(process.env.SERVER_PORT);
const defaultCPUs: number = Number(process.env.SERVER_WORKERS);

// https://expressjs.com/en/resources/middleware/cors.html
const applicationCorsOption: CorsOptions = {
	// Access-Control-Allow-Credentials
	credentials: true,
	preflightContinue: true,
	optionsSuccessStatus: 200,
	// Access-Control-All,ow-Methods
	methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
	// Access-Control-Allow-Headers
	allowedHeaders: ['Origin', 'Content-Type', 'Accept', 'mode', 'credentials'],
	// Access-Control-Expose-Headers
	exposedHeaders: [],
	// Access-Control-Max-Age ( Do not repeat PRE-FLIGHT request for 60 seconds )
	maxAge: 60,
	// Access-Control-Allow-Origin
	origin: (origin, callback) =>
		[process.env.CLIENT_HOST, 'http://127.0.0.1:5000'].indexOf(origin!) !== -1 || !origin
			? callback(null, true)
			: callback(new Error(`Not allowed by CORS : ${origin}`)),
};

export default class AppServer extends AbstractServer {
	connection: Sequelize | null;
	constructor(applicationName = defaultName, applicationPort = defaultPort, applicationCPUs = defaultCPUs) {
		super(applicationName, applicationPort, applicationCPUs, applicationCorsOption);
		this.connection = null;
	}

	public async connect(): Promise<Sequelize> {
		// Always run db migrations, befor load sequelize models
		await migrationUp();

		const force = process.env.SERVER_FORCE && process.env.SERVER_FORCE.toLowerCase() === 'true';
		logger.info(
			(force ? chalk.redBright.bold(' [ FORCE ] ') : chalk.greenBright.bold(' [ NORMAL ] ')).concat(
				chalk.cyan.bold('Starting database synchronization...')
			)
		);

		// Dev and Test can use THE FORCE :
		// “Don’t underestimate the Force.” – Darth Vader
		if ((isDevMode() || isTestMode()) && force) {
			this.connection = await sync({ force });
			await generator(false);
			// Always start from clean db on test
		} else if (isTestMode()) {
			/*
				When test on local we just user "public" schema.
				In CI multiple jobs runs at the same time so we need to use schemas.
				( Each job use a differente schema )
			*/
			this.connection = process.env.TEST_SCHEMA
				? await createSchemaAndSync(process.env.TEST_SCHEMA, { force: true, restartIdentity: true })
				: await sync({ force: true });
		} else {
			this.connection = await authenticate();
		}

		return this.connection;
	}

	public routes(application: ExpressApplication): void {
		routes(application);
	}
}
