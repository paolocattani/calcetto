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
import { Z_SYNC_FLUSH } from 'zlib';

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
      this.application
        .options('*', cors(this.corsOptions)) // Preflight Request
        .use(morgan(isProductionMode() ? 'combined' : 'common'))
        // Escludo compression per 'text/event-stream'
        .use(
          //https://github.com/expressjs/compression/issues/61
          compression({
            filter: (req, res) => res.getHeader('Content-Type') != 'text/event-stream',
          })
        )
        .use(helmet({ dnsPrefetchControl: { allow: true } }))
        //this.application.set('trust proxy', 1);
        .use(json())
        .use(urlencoded({ extended: false }))
        .use(cookieParser())
        .disable('X-Powered-By')
        .all('*', routeLogger);

      this.routes(this.application);

      // public folder path
      const buildPath = path.join(__dirname, '..', '..', '..', 'build');
      logger.info(`Serving build forlder from ${chalk.green(buildPath)}`);
      this.application.use(
        //
        express.static(buildPath, {
          maxAge: process.env.STATIC_CONTENTS_CACHE ? process.env.STATIC_CONTENTS_CACHE : '0',
          lastModified: true,
          redirect: true,
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

process.on('uncaughtException', (err) => logger.fatal(err));
process.on('unhandledRejection', (err) => logger.fatal(err));
