/* eslint-disable quotes */

// Core
import '../core/env';
import { logger } from '../core/logger';
import { isProductionMode } from '../core/debug';
import { routeLogger, auditControl, cacheControl } from '../core/middleware';
import * as http from 'http';
// Express
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import { json, urlencoded } from 'body-parser';
import cookieParser from 'cookie-parser';
import express, { Request, Application as ExpressApplication } from 'express';
let session = require('express-session');
let RedisStore = require('connect-redis')(session);

// Auth
import cors from 'cors';
// Other
import chalk from 'chalk';
import path from 'path';
import { cookiesOption } from '../controller/auth/cookies.utils';
import { getRedisClient } from '../database/config/redis/connection';
//import cluster from 'cluster';
//import { cpus as osCpus } from 'os';

/* Interface */
export interface IServer {
	serverName: string;
	serverPort: number;
	maxCPUs?: number;
}

/* Class */
// TODO: http://expressjs.com/en/advanced/best-practice-security.html
export abstract class AbstractServer implements IServer {
	serverName: string;
	serverPort: number;
	maxCPUs?: number;
	application: ExpressApplication;
	corsOptions: cors.CorsOptions;

	constructor(name: string, port: number, maxCPUs?: number, corsOptions?: cors.CorsOptions) {
		this.serverName = name;
		this.serverPort = port;
		this.maxCPUs = maxCPUs ? maxCPUs : Number.parseInt('1');
		this.application = express();
		this.corsOptions = corsOptions ? corsOptions : {};
	}

	public start(): http.Server {
		/*
    if (cluster.isMaster) {
      logger.info(`Starting server ${chalk.yellow(this.serverName)} as Cluster Mode..`);
      logger.info(`${osCpus().length} current available CPUs but using ${this.maxCPUs}`);
      for (let i = 0; i < this.maxCPUs! - 1; i++) cluster.fork();
      cluster.on('exit', (worker, code, signal) => {
        logger.error(
          `Node cluster worker ${chalk.blue(process.pid.toString())} for server ${chalk.yellow(
            this.serverName
          )} died. Code ${chalk.red.bold(code.toString())}, Signal ${chalk.red.bold(signal)}`
        );
        logger.info('Starting a new worker....');
        cluster.fork();
      });
    } else {
    */
		const redisClient = getRedisClient();
		redisClient.on('error', logger.error);

		const CSPCommon = [
			"'self'",
			'http://localhost:5001',
			'https://calcetto2020stage.herokuapp.com',
			'https://calcetto2020production.herokuapp.com',
		];
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
			.set('trust proxy', 1)
			.use(
				session({
					tore: new RedisStore({ client: redisClient }),
					secret: process.env.SERVER_SECRET,
					resave: false,
					saveUninitialized: true,
					cookie: cookiesOption,
				})
			)
			.all('*', auditControl)
			.all('*', cacheControl)
			.all('*', routeLogger)
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

// Restart workers :  https://www.sitepoint.com/how-to-create-a-node-js-cluster-for-speeding-up-your-apps/
