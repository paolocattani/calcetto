import { logger } from "../../core/logger";
import { AbstractServer } from "./AbstractServer";
//import path from 'path';
import express, { Application as ExpressApplication, Request, Response } from 'express';

import * as util from 'util';

const applicationName = 'ApplicationServer';
const applicationPort = 8080;
const applicationCPUs = 4;

export class AppServer extends AbstractServer {

    constructor() {
        super(applicationName, applicationPort, applicationCPUs);
        this.start();
    }

    routes(application: ExpressApplication): void {
        application.get('/api', (req: Request, res: Response) =>
            res.status(200).send({ message: `Welcome to ${this.serverName} endpoint API!` })
        );
    }

}