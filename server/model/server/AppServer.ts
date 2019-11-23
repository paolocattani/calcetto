import '../../core/env'
import { logger } from '../../core/logger';
import cors, { CorsOptions } from 'cors';
import { secured, routeLogger } from '../../core/middleware'
import { isProductionMode } from '../../core/debug'
import glob from 'glob';
import path from 'path';
import { AbstractServer } from "./AbstractServer";
//import path from 'path';
import { Application as ExpressApplication, Request, Response } from 'express';
import Db from 'model/sequelize';

//import * as util from 'util';

// white list for CORS
const applicationName: string = 'ApplicationServer';
const applicationPort: number = 8080;
const applicationCPUs: number = 2;
const whiteList: string[] = [
    `http://${process.env.CLIENT_HOST}:${process.env.CLIENT_PORT}`,
    `https://${process.env.CLIENT_HOST}:${process.env.CLIENT_PORT}`,
    `http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`,
    `https://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`,
    `https://${process.env.AUTH0_DOMAIN}`

]
const applicationCorsOption: CorsOptions = {
    origin: (origin, callback) => (whiteList.indexOf(origin!) !== -1 || !origin) ? callback(null, true) : callback(new Error(`Not allowed by CORS : ${origin}`)),
    credentials: true,
}
export class AppServer extends AbstractServer {
    constructor() {
        super(applicationName, applicationPort, applicationCPUs);
        this.start();
    }

    routes(application: ExpressApplication): void {

        application.get('/api/greeting', (req: Request, res: Response) => {
            const name = req.query.name || 'World';
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
        });
        // Setup express routes
        //glob.sync(`${path.resolve('./routes/**/')}*.+(js|jsx|ts|tsx)`).forEach(route => {
        //    if (!isProductionMode()) {
        //        logger.info('Loading route : ' + route);
        //    }
        //    require(route)(application);
        //});

        application.get('/api', (req: Request, res: Response) => {
            logger.info(`${this.serverName} route /api`);
            return res.status(200).send({ message: `Welcome to ${this.serverName} endpoint API!` })
        });
    }

}