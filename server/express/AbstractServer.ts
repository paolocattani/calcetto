// OS / core
import * as http from 'http';
import chalk from 'chalk';
import path from 'path';
import { logger } from '@core/logger';
import { isProductionMode } from '@common/utils/env.utils';
import { startWithOneOf } from '@common/utils/string.utils';
import { createServer } from 'http';
// Express
import express, { Request, Response, NextFunction, Application as ExpressApplication } from 'express';
// socket.io
import { Server as SocketIoServer } from 'socket.io';

import cors from 'cors';
// Servers and middleware
import { createApolloServer, GRAPHQL_ENDPOINT, PLAYGROUND_ENDPOINT } from './ApolloServer';
import { createSocketServer } from './SocketServer';
import { getMiddlewares, serverStatus } from './utils';
// Error handler
import strongErrorHandler from 'strong-error-handler';
import { Sequelize } from 'sequelize-typescript';
import { Mongoose } from 'mongoose';
import { RedisClient } from 'redis';
import { API_ENDPOINT } from 'controller';
import LogRocket from 'logrocket';

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
	interval?: NodeJS.Timeout;

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
		LogRocket.init('3c36py/calcettostage');
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
		const serverRoutes = ['/static', API_ENDPOINT, PLAYGROUND_ENDPOINT, GRAPHQL_ENDPOINT];
		this.application.get('/*', (request: Request, res: Response, next: NextFunction) => {
			if (!startWithOneOf(request.originalUrl, serverRoutes)) {
				logger.warn(`Redirecting request ${request.originalUrl} to index.html`);
				return res.redirect('/');
				// return res.sendFile(`${buildPath}/index.html`, {});
			}
			next();
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
		this.interval = serverStatus(process);

		process.on('SIGINT', () => this.stop('SIGINT'));
		process.on('SIGTERM', () => this.stop('SIGTERM'));
		this.httpServer.on('close', this.stop);

		return this.httpServer;
	}

	// Implementation have to handle all other API
	public abstract restRoutes(application: ExpressApplication): void;
	// And socket
	public abstract socketRoutes(socketIO: SocketIoServer | null): void;

	public async stop(event = 'close') {
		logger.info(`Detect event ${chalk.yellow(event)}.`);
		if (this.sequelize) {
			logger.info('Closing sequelize connection...');
			await this.sequelize.close();
			logger.info('Done!');
		}
		if (this.socket) {
			logger.info('Closing socket connection...');
			await new Promise((resolve) => {
				this.socket!.close(() => resolve(true));
			});
			logger.info('Done!');
		}
		if (this.redis) {
			logger.info('Closing redis connection...');
			await new Promise((resolve) => {
				this.redis!.quit(() => resolve(true));
			});
			logger.info('Done!');
		}
		if (this.httpServer.listening) {
			logger.info('Closing http server...');
			await new Promise((resolve) => {
				this.httpServer.close(() => resolve(true));
			});
			logger.info('Done!');
		}
		if (this.interval) {
			logger.info('Clear interval...');
			clearInterval(this.interval);
			logger.info('Done!');
		}
		logger.info('All Done!');
		process.exit(0);
	}
}

process.on('uncaughtException', (err) => logger.fatal(err));
process.on('unhandledRejection', (err) => logger.fatal(err));
