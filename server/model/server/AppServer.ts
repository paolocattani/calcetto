// Server
import { CorsOptions } from 'cors';
import { AbstractServer } from './AbstractServer';
import { Application as ExpressApplication } from 'express';
// Db
import syncDb from '../sequelize';
import { SyncOptions } from 'sequelize/types';
import { Sequelize } from 'sequelize-typescript';
import generator from '../../generator/generator';
// Routes
import routes from '../../controller/index';
// Utils
import '../../core/env';
import chalk from 'chalk';
import { logger } from '../../core/logger';
import { isProductionMode } from '../../core/debug';

// white list for CORS
const applicationName: string = 'ApplicationServer Calcetto';
const applicationPort: number = isProductionMode() ? Number(process.env.PORT) : Number(process.env.SERVER_PORT);
const applicationCPUs: number = Number(process.env.SERVER_WORKERS);
const whiteList: string[] = [
  `http://${process.env.CLIENT_HOST}:${process.env.CLIENT_PORT}`,
  `http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`
];

export let dbConnection: Sequelize;
// FIXME:
const applicationCorsOption: CorsOptions = {
  origin: (origin, callback) =>
    whiteList.indexOf(origin!) !== -1 || !origin
      ? callback(null, true)
      : callback(new Error(`Not allowed by CORS : ${origin}`)),
  credentials: true
};
export class AppServer extends AbstractServer {
  constructor() {
    super(applicationName, applicationPort, applicationCPUs);
    this.start();
  }

  public async routes(application: ExpressApplication): Promise<void> {
    const force = process.env.SERVER_FORCE && process.env.SERVER_FORCE === 'true' ? true : false;
    const options: SyncOptions = { force };
    // Sync database model ( async )
    logger.info(
      `${(force ? chalk.redBright.bold(' [ FORCE ] ') : chalk.greenBright.bold(' [ NORMAL ] ')) +
        chalk.cyan.bold('Starting database synchronization...')}`
    );
    dbConnection = await syncDb(options);
    if (force) await generator(true);
    application.use(routes(application));
  }
}
