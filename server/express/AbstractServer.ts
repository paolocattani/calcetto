/* eslint-disable quotes */

// Core
import '../core/env';
import { logger } from '../core/logger';
import { isProductionMode } from '../core/debug';
import * as http from 'http';
// Express
import helmet from 'helmet';
import morgan from 'morgan';
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
import { routeLogger, clientInfo, auditControl, cacheControl } from '../middleware';

// http://expressjs.com/en/advanced/best-practice-security.html
export abstract class AbstractServer {
	serverName: string;
	serverPort: number;
	application: ExpressApplication;
	corsOptions: cors.CorsOptions;
	allowedOrigin: Array<string>;
	socketIO: SocketIoServer;

	constructor(name: string, port: number, allowedOrigin: Array<string>, corsOptions?: cors.CorsOptions) {
		this.serverName = name;
		this.serverPort = port;
		this.application = express();
		this.allowedOrigin = allowedOrigin;
		this.corsOptions = corsOptions ? corsOptions : {};
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
			resave: true,
			saveUninitialized: true,
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
		// custom mw

		this.routes();
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
		const httpServer = this.application.listen(this.serverPort, () => {
			logger.info(
				`Process ${chalk.blue(process.pid.toString())} for server ${chalk.yellow(
					this.serverName
				)} : listening on port ${chalk.green(this.serverPort.toString())}`
			);
		});

		// https://www.npmjs.com/package/socket.io-redis#typescript
		const pubClient = getRedisClient();
		const subClient = pubClient.duplicate();

		// https://socket.io/docs/v3/server-installation/
		// https://socket.io/docs/v3/server-api/index.html
		this.socketIO = new SocketIoServer(httpServer, {
			path: '/socket',
			serveClient: false,
			cookie: cookiesOption,
			cors: this.corsOptions,
			wsEngine: 'ws', //eiows',
			adapter: createAdapter({ pubClient, subClient }),
		});
		this.socketIO.use((socket, next) => sessionMw(socket.request as Request, {} as Response, next as NextFunction));
		this.socket();

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
			if (httpServer.listening) {
				httpServer.close(function () {
					logger.info('Stopping async processes...');
					clearInterval(interval);
					logger.info('Shutdown...');
					process.exit(0);
				});
			}
		};

		process.on('SIGINT', () => closeServer('SIGINT'));
		process.on('SIGTERM', () => closeServer('SIGINT'));
		httpServer.on('close', function () {
			logger.info('Stopping server...');
			clearInterval(interval);
			logger.info('Shutdown...');
		});

		return httpServer;
	}

	// Implementation have to handle all other API
	public abstract routes(): void;
	// And socket
	public abstract socket(): void;
}

process.on('uncaughtException', (err) => logger.fatal(err));
process.on('unhandledRejection', (err) => logger.fatal(err));
