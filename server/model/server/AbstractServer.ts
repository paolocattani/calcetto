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
import express, { Application as ExpressApplication } from 'express';
// Auth
import cors from 'cors';
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
      /*
      if (!process.env.AUTH0_DOMAIN || !process.env.AUTH0_AUDIENCE) {
        throw 'Make sure you have AUTH0_DOMAIN, and AUTH0_AUDIENCE in your .env file';
      }
      */
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

      this.application.use(cors(this.corsOptions));
      this.application.disable('x-powered-by');

      this.application.all('*', routeLogger);
      this.routes(this.application);
      this.application.all('*', routeNotFound);
      // public folder path
      logger.info(`Serving build forlder from ${chalk.green(path.join(__dirname, '..', '..', '..', 'build'))}`);
      this.application.use(
        //
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
