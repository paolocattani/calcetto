import '../../core/env';
import { logger } from '../../core/logger';
import { CorsOptions } from 'cors';
import path from 'path';
import chalk from 'chalk';
import { AbstractServer } from './AbstractServer';
//import path from 'path';
import { Application as ExpressApplication, Request, Response, Router } from 'express';
import syncDb from '../sequelize';
//import * as util from 'util';
import routes from './../../controller';
import { SyncOptions } from 'sequelize/types';

// white list for CORS
const applicationName: string = 'ApplicationServer';
const applicationPort: number = Number(process.env.SERVER_PORT);
const applicationCPUs: number = Number(process.env.SERVER_CPU);
const whiteList: string[] = [
  `http://${process.env.CLIENT_HOST}:${process.env.CLIENT_PORT}`,
  `https://${process.env.CLIENT_HOST}:${process.env.CLIENT_PORT}`,
  `http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`,
  `https://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`,
  `https://${process.env.AUTH0_DOMAIN}`
];
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

  public routes(application: ExpressApplication): void {
    const options: SyncOptions = {
      // force: true
    };
    // Sync database model ( async )
    logger.info(chalk.cyan.bold('Database synchronization ( async )'));
    syncDb(options);
    //application.use(routes(Router()));
    application.use(routes(application));
  }
}
