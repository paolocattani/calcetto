// Server
import { CorsOptions } from 'cors';
import { AbstractServer } from './AbstractServer';
import { Application as ExpressApplication } from 'express';
// Db
import { sync, authenticate } from '../database/connection';
import { Sequelize } from 'sequelize-typescript';
import generator from '../generator/generator';
// Routes
import routes from '../controller/index';
// Utils
import '../core/env';
import chalk from 'chalk';
import { logger } from '../core/logger';
import { isDevMode, isProductionMode, isTestMode } from '../core/debug';

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

export default class AppServer extends AbstractServer {
  connection: Sequelize | null;
  constructor(applicationName = defaultName, applicationPort = defaultPort, applicationCPUs = defaultCPUs) {
    super(applicationName, applicationPort, applicationCPUs);
    this.connection = null;
  }

  public async connect(): Promise<Sequelize> {
    const force = process.env.SERVER_FORCE && process.env.SERVER_FORCE.toLowerCase() === 'true' ? true : false;
    logger.info(
      (force ? chalk.redBright.bold(' [ FORCE ] ') : chalk.greenBright.bold(' [ NORMAL ] ')).concat(
        chalk.cyan.bold('Starting database synchronization...')
      )
    );

    // Dev and Test can use THE FORCE :
    // “Don’t underestimate the Force.” – Darth Vader
    if ((isDevMode() || isTestMode()) && force) {
      this.connection = await sync({ force });
      await generator(true);
      // Always start from clean db on test
    } else if (isTestMode()) {
      this.connection = await sync({ force: true });
    } else {
      this.connection = await authenticate();
    }

    return this.connection;
  }

  public routes(application: ExpressApplication): void {
    routes(application);
  }
}
