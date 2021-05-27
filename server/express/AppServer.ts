// Server
// Utils
import '@common/utils/env.utils';
import { isDevMode, isTestMode } from '@common/utils/env.utils';
import { logger } from '@core/logger';
import chalk from 'chalk';
import { CorsOptions } from 'cors';
import { Application as ExpressApplication } from 'express';
import { Server as SocketIoServer } from 'socket.io'; // socket.io
// Routes
import routes from '../controller/index';
import { getConnection } from '../database/config/mongo/connection';
import { getRedisClient } from '../database/config/redis/connection';
// Db
import { authenticate, createSchemaAndSync, sync } from '../database/config/sequelize/connection';
import { createViews, markAllAsApplied } from '../database/migrations';
import { handleSocket } from '../events/events';
import generator from '../generator/generator';
import { buildSchema } from '../graphql/schema';
import { AbstractServer } from './AbstractServer';

const defaultName = 'ApplicationServer Calcetto';
const defaultPort = Number(process.env.PORT);
const allowedOrigin = process.env.ORIGIN_WHITE_LIST
	? process.env.ORIGIN_WHITE_LIST.split(';')
	: ['http://localhost:5000', 'http://localhost:5001'];

// https://expressjs.com/en/resources/middleware/cors.html
const applicationCorsOption: CorsOptions = {
	// Access-Control-Allow-Credentials
	credentials: true,
	preflightContinue: false,
	optionsSuccessStatus: 200,
	// Access-Control-All,ow-Methods
	methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
	// Access-Control-Allow-Headers
	allowedHeaders: ['Origin', 'Content-Type', 'Accept', 'mode', 'credentials', 'X-Rate-Limit'],
	// Access-Control-Expose-Headers
	exposedHeaders: [],
	// Access-Control-Max-Age ( Do not repeat PRE-FLIGHT request for 60 seconds )
	maxAge: 60,
	// Access-Control-Allow-Origin
	origin: (origin, callback) =>
		allowedOrigin.indexOf(origin!) !== -1 || !origin
			? callback(null, true)
			: callback(new Error(`Not allowed by CORS : ${origin}`), origin),
};

export default class AppServer extends AbstractServer {
	constructor(applicationName = defaultName, applicationPort = defaultPort) {
		super(applicationName, applicationPort, allowedOrigin, applicationCorsOption);
	}

	public async connect(): Promise<void> {
		try {
			logger.info('Connecting to datasources...');
			const force = process.env.SERVER_FORCE && process.env.SERVER_FORCE.toLowerCase() === 'true';
			// If it's not a fresh new installation then run migrations
			if (!force) {
				//await migrationUp();
			}

			logger.info(
				'Mode :'.concat(force ? chalk.redBright.bold(' [ FORCE ] ') : chalk.greenBright.bold(' [ NORMAL ] '))
			);

			// Dev and Test can use THE FORCE :
			// “Don’t underestimate the Force.” – Darth Vader
			if ((isDevMode() || isTestMode()) && force) {
				// Mark all migrations as applied
				await markAllAsApplied();
				// Drop and create all tables
				this.sequelize = await sync({ force });
				// Create view
				await createViews();
				// Generate dummies data only on dev
				if (isDevMode()) {
					await generator(force);
				}
				// Always start from clean db on test
			} else if (isTestMode()) {
				/*
					When test on local we just user "public" schema.
					In CI multiple jobs runs at the same time so we need to use schemas.
					( Each job use a differente schema )
				*/
				this.sequelize = process.env.DATABASE_SCHEMA
					? await createSchemaAndSync(process.env.DATABASE_SCHEMA, { force: true, restartIdentity: true })
					: await sync({ force: true });
			} else {
				this.sequelize = await authenticate();
			}

			// build GraphQL schema from mongoDB collection
			this.mongo = await getConnection();
			await buildSchema();
			// Redis
			this.redis = getRedisClient(0);
		} catch (error) {
			logger.error('Failed connecting datasources...', error);
			throw new Error('Failed connecting datasources');
		}
	}

	public restRoutes(application: ExpressApplication) {
		routes(application);
	}

	public socketRoutes(socketIO: SocketIoServer) {
		handleSocket(socketIO);
	}
}
