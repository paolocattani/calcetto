// OS / core
import * as http from 'http';
import chalk from 'chalk';
import path from 'path';
import { logger } from '@core/logger';
import { isProductionMode } from '@common/utils/env.utils';
import { createServer } from 'http';
// Express
import express, { Request, Response, Application as ExpressApplication } from 'express';
// socket.io
import { Server as SocketIoServer } from 'socket.io';

import cors from 'cors';
// Servers and middleware
import { createApolloServer } from './ApolloServer';
import { createSocketServer } from './SocketServer';
import { getMiddlewares, serverStatus } from './utils';
// Error handler
import strongErrorHandler from 'strong-error-handler';
import { Sequelize } from 'sequelize-typescript';
import { Mongoose } from 'mongoose';
import { RedisClient } from 'redis';

// http://expressjs.com/en/advanced/best-practice-security.html
export abstract class AbstractServer {
	serverName: string;
	serverPort: number;
	application: ExpressApplication;
	httpServer: http.Server;
	corsOptions: cors.CorsOptions;
	allowedOrigin: Array<string>;
	sequelize?: Sequelize;
	socket?: SocketIoServer;
	mongo?: Mongoose;
	redis?: RedisClient;

	constructor(name: string, port: number, allowedOrigin: Array<string>, corsOptions: cors.CorsOptions) {
		this.serverName = name;
		this.serverPort = port;
		this.application = express();
		this.allowedOrigin = allowedOrigin;
		this.corsOptions = corsOptions;
		this.httpServer = createServer(this.application);
	}

	public async start(): Promise<http.Server> {
		// Server configuration
		// https://blog.risingstack.com/node-js-security-checklist/
		// http://expressjs.com/en/advanced/best-practice-security.html
		const middlewares = getMiddlewares(this.corsOptions, this.allowedOrigin, this.redis!);
		this.application.set('trust proxy', isProductionMode()).use(Object.values(middlewares)).disable('x-powered-by');

		// REST Api
		this.restRoutes(this.application);

		// Socket
		this.socket = createSocketServer(this.redis!, this.httpServer, this.corsOptions, middlewares.sessionMw);
		this.socketRoutes(this.socket);

		// Apollo
		createApolloServer(this.application, this.corsOptions);

		// Error handler
		this.application.use(strongErrorHandler({ debug: !isProductionMode() }));
		/*
			Statically serve frontend build ( Heroku deploy )
		*/
		const buildPath = path.join(__dirname, '..', '..', 'build');
		logger.info(`Serving build folder from ${chalk.green(buildPath)}`);
		this.application.use(
			express.static(buildPath, {
				maxAge: process.env.STATIC_CONTENTS_CACHE ? process.env.STATIC_CONTENTS_CACHE : '0',
				lastModified: true,
				redirect: true,
			})
		);

		/* 	
			Redirect everything else to index.html
		*/
		this.application.get('/*', (request: Request, res: Response /*, next: NextFunction*/) => {
			if (
				!request.originalUrl.startsWith('/static') &&
				!request.originalUrl.startsWith('/api') &&
				!request.originalUrl.startsWith('/graphql')
			) {
				logger.warn(`Redirecting request ${request.originalUrl} to index.html`);
				return res.redirect('/');
				// return res.sendFile(`${buildPath}/index.html`, {});
			}
		});

		// Listen on port `this.serverPort`
		this.httpServer.listen(this.serverPort, () => {
			logger.info(
				`Process ${chalk.blue(process.pid.toString())} for server ${chalk.yellow(
					this.serverName
				)} : listening on port ${chalk.green(this.serverPort.toString())}`
			);
		});

		// Shows servers stats every 30 minutes
		const interval = serverStatus(process);

		// Graceful Shutdown
		const closeServer = (signal: string) => {
			logger.info(`Detect event ${signal}.`);
			if (this.sequelize) {
				logger.info('Closing sequelize connection...');
				this.sequelize.close();
				logger.info('Done!');
			}
			if (this.socket) {
				logger.info('Closing socket connection...');
				this.socket.close();
				logger.info('Done!');
			}
			if (this.redis) {
				logger.info('Closing redis connection...');
				this.redis.quit();
				logger.info('Done!');
			}
			if (this.httpServer.listening) {
				logger.info('Closing http server...');
				this.httpServer.close();
				logger.info('Done!');
			}
			if (interval) {
				logger.info('Clear interval...');
				clearInterval(interval);
				logger.info('Done!');
			}
			logger.info('All Done!');
			process.exit(0);
		};

		process.on('SIGINT', () => closeServer('SIGINT'));
		process.on('SIGTERM', () => closeServer('SIGTERM'));
		this.httpServer.on('close', () => closeServer('close'));

		return this.httpServer;
	}

	// Implementation have to handle all other API
	public abstract restRoutes(application: ExpressApplication): void;
	// And socket
	public abstract socketRoutes(socketIO: SocketIoServer | null): void;
}

process.on('uncaughtException', (err) => logger.fatal(err));
process.on('unhandledRejection', (err) => logger.fatal(err));
