/* eslint-disable quotes */
import { isProductionMode } from '@common/utils/env.utils';
import cors from 'cors';
import { Request } from 'express';
import morgan from 'morgan';
import compression from 'compression';
import { json, urlencoded } from 'body-parser';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import session from 'express-session';
// import { randomBytes } from 'crypto';
// Redis
import connectRedis from 'connect-redis'; // Redis adapter for express-session
import { cookiesOption, SESSION_ID } from '../controller/auth/session.utils';
import { routeLogger, clientInfo, auditControl, cacheControl } from '../middleware';
import { RedisClient } from 'redis';
import { logger } from '@core/logger';
import chalk from 'chalk';

export const serverStatus = (process: NodeJS.Process) =>
	setInterval(() => {
		logger.info(chalk.bold.redBright(`--- Process@${process.pid} status ---------------- `));
		logger.info(chalk.greenBright('   Uptime        : '), process.uptime());
		logger.info(chalk.greenBright('   CPU usage'));
		const cpu = process.cpuUsage();
		for (const key in cpu) {
			logger.info(`     ${key}    : ${cpu[key as keyof NodeJS.CpuUsage]} `);
		}
		logger.info(chalk.greenBright('   Memory usage'));
		const memory = process.memoryUsage();
		for (const key in memory) {
			logger.info(
				`     ${key}    : ${Math.round((memory[key as keyof NodeJS.MemoryUsage] / 1024 / 1024) * 100) / 100} MB`
			);
		}
		logger.info(chalk.bold.redBright('--------------------------------------- '));
	}, 30 * 60 * 1000);

export const getMiddlewares = (
	corsOptions: cors.CorsOptions,
	allowedOrigin: Array<string>,
	redisClient: RedisClient
) => {
	// CORS
	if (!isProductionMode()) {
		logger.warn('These origins are considered safe : ', allowedOrigin);
	}
	const corsMw = cors<Request>(corsOptions);
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
	const CSPCommon = ["'self'", ...allowedOrigin];
	const helmetMw = helmet({
		dnsPrefetchControl: { allow: true },
		// https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
		// https://csp-evaluator.withgoogle.com/
		contentSecurityPolicy: isProductionMode()
			? {
					directives: {
						defaultSrc: [...CSPCommon],
						connectSrc: [...CSPCommon],
						styleSrc: [...CSPCommon, "'unsafe-inline'", 'https:', 'https://fonts.googleapis.com'],
						fontSrc: ["'self'", 'https://fonts.gstatic.com'],
						imgSrc: ["'self'", 'data:'],
						objectSrc: ["'none'"],
						baseUri: ["'self'"],
					},
			  }
			: false,
	});

	// Express session
	const redisStore = connectRedis(session);
	const sessionMw = session({
		store: new redisStore({ client: redisClient }),
		secret: process.env.SERVER_SECRET || 'Apf342x$/)wpk,',
		resave: false,
		saveUninitialized: false,
		cookie: cookiesOption,
		name: SESSION_ID,
		rolling: true,
		unset: 'destroy',
	});

	/* TODO:
		// https://github.com/contrawork/graphql-helix/issues/4
		const nonce = (req: Request, res: Response, next: NextFunction) => {
			res.locals.cspNonce = randomBytes(16).toString('hex');
			next();
		};
		*/

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

	return {
		corsMw,
		morganMw,
		compressionMw,
		jsonMw,
		urlEncodedMw,
		cookieParserMw,
		helmetMw,
		sessionMw,
		clientInfo,
		routeLogger,
		auditControl,
		cacheControl,
	};
};
