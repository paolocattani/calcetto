import '../../core/env'
import { logger } from '../../core/logger';
import { secured } from '../../core/middleware'
import { isProductionMode } from '../../core/debug'
import glob from 'glob';
import path from 'path';
import { AbstractServer } from "./AbstractServer";
//import path from 'path';
import { Application as ExpressApplication, Request, Response } from 'express';

//import * as util from 'util';

const applicationName = 'ApplicationServer';
const applicationPort = 8080;
const applicationCPUs = 2;
const applicationCorsOption = { origin: `http://localhost:3000` };

export class AppServer extends AbstractServer {

    constructor() {
        super(applicationName, applicationPort, applicationCPUs, applicationCorsOption);
        this.start();
    }

    routes(application: ExpressApplication): void {

        application.get('/api/greeting', secured, (req: Request, res: Response) => {
            logger.info(`${this.serverName} : handling route /api/greeting`);
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