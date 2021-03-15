/* eslint-disable quotes */
// Core
import { logger } from '../core/logger';
import { isProductionMode } from '../../src/@common/utils/env.utils';
import * as http from 'http';
// Express
import helmet from 'helmet';
import morgan from 'morgan';
import { createServer } from 'http';
import compression from 'compression';
import { json, urlencoded } from 'body-parser';
import cookieParser from 'cookie-parser';
import express, { Response, Request, Application as ExpressApplication, NextFunction } from 'express';
import session from 'express-session';
// Redis
import connectRedis from 'connect-redis'; // Redis adapter for express-session
import { Server as SocketIoServer } from 'socket.io'; // socket.io
import { createAdapter } from 'socket.io-redis'; // Redis adapter for socket.io

// Auth
import cors from 'cors';
// Other
import chalk from 'chalk';
import path from 'path';
import { cookiesOption } from '../controller/auth/cookies.utils';
import { getRedisClient } from '../database/config/redis/connection';
import { routeLogger, clientInfo, auditControl, cacheControl, mwWrapper, withAuth } from '../middleware';
import { ClientToServerEvents, ServerToClientEvents } from '../../src/@common/models/event.model';

// http://expressjs.com/en/advanced/best-practice-security.html
export abstract class AbstractServer {
	serverName: string;
	serverPort: number;
	application: ExpressApplication;
	httpServer: http.Server;
	corsOptions: cors.CorsOptions;
	allowedOrigin: Array<string>;
	socketIO?: SocketIoServer;

	constructor(name: string, port: number, allowedOrigin: Array<string>, corsOptions?: cors.CorsOptions) {
		this.serverName = name;
		this.serverPort = port;
		this.application = express();
		this.allowedOrigin = allowedOrigin;
		this.corsOptions = corsOptions ? corsOptions : {};
		this.httpServer = createServer(this.application);
	}

	public start(): http.Server {
		// CORS
		const corsMw = cors<Request>(this.corsOptions);
		// Morgan logger ( log http request/response )
		const morganMw = morgan(isProductionMode() ? 'combined' : 'common');
		//https://github.com/expressjs/compression/issues/61
		// Exclude compression per 'text/event-stream'
		const compressionMw = compression({
			filter: (req, res) => res.getHeader('Content-Type') != 'text/event-stream',
		});
		const jsonMw = json({ strict: true });
		const urlEncodedMw = urlencoded({ extended: false });
		// Cookie parser
		const cookieParserMw = cookieParser(process.env.SERVER_SECRET);
		// Content Security Policy Common
		const CSPCommon = ["'self'", ...this.allowedOrigin];
		const helmetMw = helmet({
			dnsPrefetchControl: { allow: true },
			// https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
			// https://csp-evaluator.withgoogle.com/
			contentSecurityPolicy: {
				directives: {
					defaultSrc: [...CSPCommon],
					connectSrc: [...CSPCommon],
					styleSrc: [...CSPCommon, "'unsafe-inline'", 'https:', 'https://fonts.googleapis.com'],
					fontSrc: ["'self'", 'https://fonts.gstatic.com'],
					imgSrc: ["'self'", 'data:'],
					objectSrc: ["'none'"],
					baseUri: ["'self'"],
				},
			},
		});
		// Redis
		const redisClient = getRedisClient(0);
		redisClient.on('error', logger.error);
		const redisStore = connectRedis(session);

		// Express session
		const sessionMw = session({
			store: new redisStore({ client: redisClient }),
			secret: process.env.SERVER_SECRET || 'Apf342x$/)wpk,',
			resave: false,
			saveUninitialized: false,
			cookie: cookiesOption,
		});

		// Server configuration
		// https://blog.risingstack.com/node-js-security-checklist/
		// http://expressjs.com/en/advanced/best-practice-security.html
		this.application
			.set('trust proxy', isProductionMode())
			.use(
				corsMw,
				morganMw,
				compressionMw,
				helmetMw,
				jsonMw,
				urlEncodedMw,
				cookieParserMw,
				sessionMw,
				clientInfo,
				auditControl,
				cacheControl,
				routeLogger
			)
			.disable('x-powered-by');

		// https://www.appliz.fr/blog/express-typescript
		// https://levelup.gitconnected.com/how-to-implement-csrf-tokens-in-express-f867c9e95af0
		// https://medium.com/dataseries/prevent-cross-site-request-forgery-in-express-apps-with-csurf-16025a980457
		/* FIXME: https://github.com/expressjs/csurf/issues/204
			.use((req: Request, res: Response, next: NextFunction) => {
				logger.info('SESSION : ', req.session);
				next();
			})
			.use(
				csrf({
					cookie: false,
					sessionKey: 'session',
					value: (req) => {
						logger.info('csrf value : ', req.session, req.session.csrfSecret);
						return req.session.csrfSecret || '';
					},
				})
			)
			*/

		this.routes(this.application);

		// https://www.npmjs.com/package/socket.io-redis#typescript
		const subClient = redisClient.duplicate();

		// https://socket.io/docs/v3/server-installation/
		// https://socket.io/docs/v3/server-api/index.html
		this.socketIO = new SocketIoServer<ClientToServerEvents, ServerToClientEvents>(this.httpServer, {
			//path: '/socket',
			// PM2 prefer web socket over polling
			transports: ['websocket', 'polling'],
			serveClient: false,
			cookie: cookiesOption,
			cors: this.corsOptions,
			adapter: createAdapter({ pubClient: redisClient, subClient }),
		});
		// Socket middleware
		this.socketIO.use(mwWrapper(sessionMw));
		this.socketIO.use(mwWrapper(clientInfo));
		this.socketIO.use(mwWrapper(withAuth));
		this.socket(this.socketIO);

		/*
			Statically serve frontend build ( Heroku deploy )
		*/
		const buildPath = path.join(__dirname, '..', '..', 'build');

		/* 	TODO:
			https://www.valentinog.com/blog/socket-react/
			Redirect everything else to index.html
			this.application.get('/*', (req: Request, res: Response) => res.send(`${buildPath}/index.html`));
		*/
		logger.info(`Serving build folder from ${chalk.green(buildPath)}`);
		this.application.use(
			express.static(buildPath, {
				maxAge: process.env.STATIC_CONTENTS_CACHE ? process.env.STATIC_CONTENTS_CACHE : '0',
				lastModified: true,
				redirect: true,
			})
		);

		// Listen on port `this.serverPort`
		this.httpServer.listen(this.serverPort, () => {
			logger.info(
				`Process ${chalk.blue(process.pid.toString())} for server ${chalk.yellow(
					this.serverName
				)} : listening on port ${chalk.green(this.serverPort.toString())}`
			);
		});

		// Shows servers stats every 30 minutes
		const interval = setInterval(() => {
			logger.info(chalk.bold.redBright(`--- Process@${process.pid} status ---------------- `));
			logger.info(chalk.greenBright('   Uptime        : '), process.uptime());
			logger.info(chalk.greenBright('   CPU usage'));
			const cpu = process.cpuUsage();
			for (let key in cpu) {
				logger.info(`     ${key}    : ${cpu[key as keyof NodeJS.CpuUsage]} `);
			}
			logger.info(chalk.greenBright('   Memory usage'));
			const memory = process.memoryUsage();
			for (let key in memory) {
				logger.info(
					`     ${key}    : ${Math.round((memory[key as keyof NodeJS.MemoryUsage] / 1024 / 1024) * 100) / 100} MB`
				);
			}
			logger.info(chalk.bold.redBright('--------------------------------------- '));
		}, 30 * 60 * 1000);

		// Graceful Shutdown
		const closeServer = (signal: string) => {
			logger.info(`Detect event ${signal}.`);
			if (this.httpServer.listening) {
				this.httpServer.close();
			}
		};

		process.on('SIGINT', () => closeServer('SIGINT'));
		process.on('SIGTERM', () => closeServer('SIGTERM'));

		this.httpServer.on('close', () => {
			logger.info('Closing sockets...');
			if (this.socketIO) {
				this.socketIO.close();
			}
			logger.info('Stopping server...');
			clearInterval(interval);
			logger.info('Shutdown...');
			process.exit(0);
		});

		return this.httpServer;
	}

	// Implementation have to handle all other API
	public abstract routes(application: ExpressApplication): void;
	// And socket
	public abstract socket(socketIO: SocketIoServer): void;
}

process.on('uncaughtException', (err) => logger.fatal(err));
process.on('unhandledRejection', (err) => logger.fatal(err));
