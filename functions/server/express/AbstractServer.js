"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractServer = void 0;
require("../core/env");
const logger_1 = require("../core/logger");
const debug_1 = require("../core/debug");
const middleware_1 = require("../core/middleware");
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const compression_1 = __importDefault(require("compression"));
const body_parser_1 = require("body-parser");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const chalk_1 = __importDefault(require("chalk"));
const path_1 = __importDefault(require("path"));
class AbstractServer {
    constructor(name, port, maxCPUs, corsOptions) {
        this.serverName = name;
        this.serverPort = port;
        this.maxCPUs = maxCPUs ? maxCPUs : Number.parseInt('1');
        this.application = express_1.default();
        this.corsOptions = corsOptions ? corsOptions : { origin: 'http://localhost:3000' };
    }
    start() {
        this.application
            .options('*', cors_1.default(this.corsOptions))
            .use(morgan_1.default(debug_1.isProductionMode() ? 'combined' : 'common'))
            .use(compression_1.default({
            filter: (req, res) => res.getHeader('Content-Type') != 'text/event-stream',
        }))
            .use(helmet_1.default())
            .use(body_parser_1.json())
            .use(body_parser_1.urlencoded({ extended: false }))
            .use(cookie_parser_1.default(process.env.SERVER_SECRET))
            .all('*', middleware_1.auditControl)
            .all('*', middleware_1.cacheControl)
            .all('*', middleware_1.routeLogger);
        this.routes(this.application);
        const buildPath = path_1.default.join(__dirname, '..', '..', 'build');
        logger_1.logger.info(`Serving build folder from ${chalk_1.default.green(buildPath)}`);
        this.application.use(express_1.default.static(buildPath, {
            maxAge: process.env.STATIC_CONTENTS_CACHE ? process.env.STATIC_CONTENTS_CACHE : '0',
            lastModified: true,
            redirect: true,
        }));
        const httpServer = this.application.listen(this.serverPort, () => {
            logger_1.logger.info(`Process ${chalk_1.default.blue(process.pid.toString())} for server ${chalk_1.default.yellow(this.serverName)} : listening on port ${chalk_1.default.green(this.serverPort.toString())}`);
        });
        const interval = setInterval(() => {
            logger_1.logger.info(chalk_1.default.bold.redBright(`--- Process@${process.pid} status ---------------- `));
            logger_1.logger.info(chalk_1.default.greenBright('   Uptime        : '), process.uptime());
            logger_1.logger.info(chalk_1.default.greenBright('   CPU usage'));
            const cpu = process.cpuUsage();
            for (let key in cpu) {
                logger_1.logger.info(`     ${key}    : ${cpu[key]} `);
            }
            logger_1.logger.info(chalk_1.default.greenBright('   Memory usage'));
            const memory = process.memoryUsage();
            for (let key in memory) {
                logger_1.logger.info(`     ${key}    : ${Math.round((memory[key] / 1024 / 1024) * 100) / 100} MB`);
            }
            logger_1.logger.info(chalk_1.default.bold.redBright('--------------------------------------- '));
        }, 30 * 60 * 1000);
        httpServer.on('close', function () {
            logger_1.logger.info('Stopping server...');
            clearInterval(interval);
            logger_1.logger.info('Shutdown...');
        });
        const closeServer = (signal) => {
            logger_1.logger.info(`Detect event ${signal}.`);
            if (httpServer.listening) {
                httpServer.close(function () {
                    logger_1.logger.info('Stopping async processes...');
                    clearInterval(interval);
                    logger_1.logger.info('Shutdown...');
                    process.exit(0);
                });
            }
        };
        process.on('SIGINT', () => closeServer('SIGINT'));
        process.on('SIGTERM', () => closeServer('SIGINT'));
        return httpServer;
    }
}
exports.AbstractServer = AbstractServer;
process.on('uncaughtException', (err) => logger_1.logger.fatal(err));
process.on('unhandledRejection', (err) => logger_1.logger.fatal(err));
