import '../../core/env';
import { logger } from '../../core/logger';
import { CorsOptions } from 'cors';

import chalk from 'chalk';
import { AbstractServer } from './AbstractServer';
import { Application as ExpressApplication } from 'express';
import syncDb from '../sequelize';
import routes from './../../controller';
import { SyncOptions } from 'sequelize/types';
import generator from '../../dummy_data/generator';
import { Sequelize } from 'sequelize-typescript';
import { Logger } from 'log4js';

// white list for CORS
const applicationName: string = 'ApplicationServer';
const applicationPort: number = Number(process.env.SERVER_PORT);
const applicationCPUs: number = Number(process.env.SERVER_WORKERS);
const whiteList: string[] = [
  `http://${process.env.CLIENT_HOST}:${process.env.CLIENT_PORT}`,
  `https://${process.env.CLIENT_HOST}:${process.env.CLIENT_PORT}`,
  `http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`,
  `https://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`,
  `https://${process.env.AUTH0_DOMAIN}`
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
