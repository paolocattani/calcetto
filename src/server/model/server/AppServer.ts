import { AbstractServer } from "./AbstractServer";
import { resolve } from 'path';
import express, { Application as ExpressApplication, Request, Response } from 'express';
import { logger } from "../../core/logger";
import * as util from 'util';


export class AppServer extends AbstractServer {

    constructor() {
        super('ApplicationServer', 8080, 2);
        this.start();
    }

    routes(application: ExpressApplication): void {
        application.get('/api', (req: Request, res: Response) =>
            res.status(200).send({ message: `Welcome to ${this.serverName} endpoint API!` })
        );

        application.get('*', (req: Request, res: Response) => {
            logger.info(`AppServer.routes : ${util.inspect(req.session)}`)
            res.sendFile(resolve(__dirname, '../../build', 'index.html'));
        });
    }

}