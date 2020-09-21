// Server
import { CorsOptions } from 'cors';
import { AbstractServer } from './AbstractServer';
import { Application as ExpressApplication } from 'express';
// Db
import { sync, authenticate } from '../entity/connection';
import { SyncOptions } from 'sequelize/types';
import { Sequelize } from 'sequelize-typescript';
import generator from '../generator/generator';
// Routes
import routes from '../controller/index';
// Utils
import '../core/env';
import chalk from 'chalk';
import { logger } from '../core/logger';
import { isProductionMode } from '../core/debug';

// white list for CORS
const defaultName: string = 'ApplicationServer Calcetto';
const defaultPort: number = isProductionMode() ? Number(process.env.PORT) : Number(process.env.SERVER_PORT);
const defaultCPUs: number = Number(process.env.SERVER_WORKERS);

// FIXME:
const applicationCorsOption: CorsOptions = {
  origin: (origin, callback) =>
    [
      `http://${process.env.CLIENT_HOST}:${process.env.CLIENT_PORT}`,
      `http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`,
    ].indexOf(origin!) !== -1 || !origin
      ? callback(null, true)
      : callback(new Error(`Not allowed by CORS : ${origin}`)),
  credentials: true,
};

export class AppServer extends AbstractServer {
  connection: Sequelize | null;
  constructor(applicationName = defaultName, applicationPort = defaultPort, applicationCPUs = defaultCPUs) {
    super(applicationName, applicationPort, applicationCPUs);
    this.connection = null;
  }

  public async connect() {
    const force = process.env.SERVER_FORCE && process.env.SERVER_FORCE.toLowerCase() === 'true' ? true : false;
    if (force) {
      logger.info(chalk.redBright.bold(' [ FORCE ] ') + chalk.cyan.bold('Starting database synchronization...'));
      this.connection = await sync({ force });
      await generator(true);
      return this.connection;
    }
    // Sync database model ( async )
    logger.info(chalk.greenBright.bold(' [ NORMAL ] ') + chalk.cyan.bold('Starting database synchronization...'));
    await authenticate();
  }

  public routes(application: ExpressApplication): void {
    routes(application);
  }
}
