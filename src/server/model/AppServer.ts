import { AbstractServer } from "./AbstractServer";
import { resolve } from 'path';
import express, { Application as ExpressApplication, Request, Response } from 'express';

export class AppServer extends AbstractServer {

    constructor() {
        super('ApplicationServer', 8080);
        this.start();
    }

    routes(application: ExpressApplication): void {
        application.get('/api', (req: Request, res: Response) =>
            res.status(200).send({ message: `Welcome to ${this.serverName} endpoint API!` })
        );

        application.get('*', (req: Request, res: Response) => {
            res.sendFile(resolve(__dirname, '../../build', 'index.html'));
        });
    }

}