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
import express, { Request, Application as ExpressApplication } from 'express';
import session from 'express-session';
import connectRedis from 'connect-redis';

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

	constructor(name: string, port: number, allowedOrigin: Array<string>, corsOptions?: cors.CorsOptions) {
		this.serverName = name;
		this.serverPort = port;
		this.application = express();
		this.allowedOrigin = allowedOrigin;
		this.corsOptions = corsOptions ? corsOptions : {};
	}

	public start(): http.Server {
		const redisClient = getRedisClient(0);
		redisClient.on('error', logger.error);

		const CSPCommon = ["'self'", ...this.allowedOrigin];
		const redisStore = connectRedis(session);
		// https://blog.risingstack.com/node-js-security-checklist/
		this.application
			.use(cors<Request>(this.corsOptions))
			.use(morgan(isProductionMode() ? 'combined' : 'common'))
			// Exclude compression per 'text/event-stream'
			.use(
				//https://github.com/expressjs/compression/issues/61
				compression({
					filter: (req, res) => res.getHeader('Content-Type') != 'text/event-stream',
				})
			)
			.use(
				helmet({
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
				})
			)
			.use(json())
			.use(urlencoded({ extended: false }))
			.use(cookieParser(process.env.SERVER_SECRET))
			// http://expressjs.com/en/advanced/best-practice-security.html
			.set('trust proxy', isProductionMode())
			// https://www.appliz.fr/blog/express-typescript
			.use(
				session({
					store: new redisStore({ client: redisClient }),
					secret: process.env.SERVER_SECRET || 'Apf342x$/)wpk,',
					resave: true,
					saveUninitialized: true,
					cookie: cookiesOption,
				})
			)
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
			.all('*', clientInfo, auditControl, cacheControl, routeLogger)
			.disable('x-powered-by');

		this.routes(this.application);

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

		// Listen on port `this.serverPort`
		const httpServer = this.application.listen(this.serverPort, () => {
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
	public abstract routes(application: ExpressApplication): void;
}

process.on('uncaughtException', (err) => logger.fatal(err));
process.on('unhandledRejection', (err) => logger.fatal(err));
