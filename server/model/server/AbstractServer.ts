/**
 * https://auth0.com/blog/create-a-simple-and-secure-node-express-app/
 */

// Core
import '../../core/env';
import { logger } from '../../core/logger';
import { isProductionMode } from '../../core/debug';
import { routeLogger, routeNotFound } from '../../core/middleware';
// Express
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import { json, urlencoded } from 'body-parser';
import cookieParser from 'cookie-parser';
import express, { Application as ExpressApplication, Request, Response, NextFunction } from 'express';
// Auth
import cors from 'cors';
import jwt from 'express-jwt';
//require('express-jwt-authz');
import jwksRsa from 'jwks-rsa';
import expressSession from 'express-session';
import passport from 'passport';
const Auth0Strategy = require('passport-auth0');
// Other
import chalk from 'chalk';
import path from 'path';
import cluster from 'cluster';
import { cpus as osCpus } from 'os';

/* Interface */
export interface IServer {
  serverName: string;
  serverPort: number;
  maxCPUs?: number;
}

/* Constants */
export const checkJwt = jwt({
  // Dynamically provide a signing key based on the [Key ID](https://tools.ietf.org/html/rfc7515#section-4.1.4) header parameter ("kid") and the signing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: process.env.AUTH0_AUDIENCE,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ['RS256']
});

const session: expressSession.SessionOptions = {
  secret: 'LoxodontaElephasMammuthusPalaeoloxodonPrimelephas',
  cookie: {},
  resave: false,
  saveUninitialized: false
};

//export const checkScopes = jwtAuthz(['read:messages']);
/* Class */
export abstract class AbstractServer implements IServer {
  serverName: string;
  serverPort: number;
  maxCPUs?: number;
  application: ExpressApplication;
  corsOptions: cors.CorsOptions;

  constructor(name: string, port: number, maxCPUs?: number, corsOptions?: cors.CorsOptions) {
    this.serverName = name;
    this.serverPort = port;
    this.maxCPUs = maxCPUs ? maxCPUs : Number.parseInt('4');
    this.application = express();
    this.corsOptions = corsOptions ? corsOptions : { origin: 'http://localhost:3000' };
  }

  public start(): void {
    if (cluster.isMaster) {
      if (!process.env.AUTH0_DOMAIN || !process.env.AUTH0_AUDIENCE) {
        throw 'Make sure you have AUTH0_DOMAIN, and AUTH0_AUDIENCE in your .env file';
      }
      logger.info(`Starting server ${chalk.yellow(this.serverName)} as Cluster Mode..`);
      logger.info(`${osCpus().length} current available CPUs but using ${this.maxCPUs}`);
      for (let i = 0; i < this.maxCPUs! - 1; i++) cluster.fork();
      cluster.on('exit', (worker, code, signal) =>
        logger.error(
          `Node cluster worker ${chalk.blue(process.pid.toString())} for server ${chalk.yellow(
            this.serverName
          )} died. code ${chalk.red.bold(code.toString())}, signal ${chalk.red.bold(signal)}`
        )
      );
    } else {
      //this.application.get('env') !== 'production';
      //this.application.options('*', cors()) // Preflight Request
      this.application.options('*', cors(this.corsOptions)); // Preflight Request

      this.application.use(morgan('dev'));
      this.application.disable('x-powered-by');
      this.application.use(compression());
      this.application.use(helmet({ dnsPrefetchControl: { allow: true } }));
      //this.application.set('trust proxy', 1);
      this.application.use(json());
      this.application.use(urlencoded({ extended: false }));
      this.application.use(cookieParser());

      // FIXME: also need to fix this
      // if process.env.AUTH0_CALLBACK_URL = 'http://localhost:300 -> loooop !!
      const strategy = new Auth0Strategy(
        {
          domain: process.env.AUTH0_DOMAIN,
          clientID: process.env.AUTH0_CLIENT_ID,
          clientSecret: process.env.AUTH0_CLIENT_SECRET,
          callbackURL: process.env.AUTH0_CALLBACK_URL || `${this.corsOptions.origin}/callback`
        },
        (accessToken: any, refreshToken: any, extraParams: any, profile: any, done: any) => done(null, profile)
      );

      if (this.application.get('env') === 'production' || isProductionMode) {
        // Serve secure cookies, requires HTTPS
        session.cookie!.secure = true;
      }

      this.application.use(cors(this.corsOptions));
      this.application.use(expressSession(session));
      this.application.disable('x-powered-by');
      // Auth
      passport.use(strategy);
      this.application.use(passport.initialize());
      this.application.use(passport.session());
      passport.serializeUser((user, done) => done(null, user));
      passport.deserializeUser((user, done) => done(null, user));

      // Log all routes
      // FIXME:fix athentication function due to CORS
      //this.application.all('*', routeLogger, secured);
      //this.application.use('/', AuthManager.default);

      this.application.all('*', routeLogger);
      this.routes(this.application);
      this.application.all('*', routeNotFound);
      // public folder path
      logger.info(`Serving build forlder from ${chalk.green(path.join(__dirname, '..', '..', '..', 'build'))}`);
      this.application.use(
        express.static(path.join(__dirname, '..', '..', '..', 'build'), {
          maxAge: process.env.STATIC_CONTENTS_CACHE ? process.env.STATIC_CONTENTS_CACHE : '0',
          lastModified: true,
          redirect: true
        })
      );

      this.application.listen(this.serverPort, () => {
        logger.info(
          `Node cluster worker ${chalk.blue(process.pid.toString())} for server ${chalk.yellow(
            this.serverName
          )} : listening on port ${chalk.green(this.serverPort.toString())}`
        );
      });
    }
  }

  // Implementation have to handle all other API
  public abstract routes(application: ExpressApplication): void;
}

process.on('uncaughtException', err => logger.fatal(err));
process.on('unhandledRejection', err => logger.fatal(err));
