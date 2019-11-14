import cluster from 'cluster';
import { logger } from '../../core/logger';
import { isDevMode, isProductionMode } from '../../core/debug'
import helmet from 'helmet';
import compression from 'compression';
import chalk from 'chalk'
import { json, urlencoded } from 'body-parser';
import { cpus as osCpus } from 'os';

import express, { Application as ExpressApplication } from 'express';

export interface IServer {
    serverName: string;
    serverPort: number;
    maxCPUs?: number;
}

export abstract class AbstractServer implements IServer {

    serverName: string;
    serverPort: number;
    maxCPUs?: number;
    application: ExpressApplication;
    defaultCpu: number = 2;
    constructor(name: string, port: number, maxCPUs?: number) {
        this.serverName = name;
        this.serverPort = port;
        this.maxCPUs = maxCPUs;
        this.application = express();
    }

    public start(): void {
        if (cluster.isMaster) {
            const effectiveCPU = this.maxCPUs ? this.maxCPUs : this.defaultCpu;
            logger.info(`Starting cluster master for server ${chalk.yellow(this.serverName)}`);
            logger.info(`${osCpus().length} current available CPUs but using ${effectiveCPU}`);
            /* TODO : fix fork numbers */
            for (let i = 0; i < 1; i++) {
                cluster.fork();
            }
            cluster.on('exit', (worker, code, signal) => {
                console.error(`Node cluster worker ${worker.process.pid} for server
                        ${this.serverName} exited: code ${code}, signal ${signal}`);
            });
        } else {
            //this.application.get('env') !== 'production';
            this.application.disable('x-powered-by');
            this.application.use(compression());
            this.application.use(helmet({ dnsPrefetchControl: { allow: true } }));
            //this.application.set('trust proxy', 1);
            this.application.use(json());
            this.application.use(urlencoded({ extended: false }));
        }

        this.routes(this.application);

        this.application.listen(this.serverPort, () => {
            console.error(`Node cluster worker ${process.pid} for server ${this.serverName} : listening on port ${this.serverPort}`);
        });

    }

    public abstract routes(application: ExpressApplication): void;

}



