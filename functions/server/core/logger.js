"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logMigrationEnd = exports.logMigrationStart = exports.logProcess = exports.dbLogger = exports.logger = void 0;
const log4js_1 = __importDefault(require("log4js"));
const chalk_1 = __importDefault(require("chalk"));
const debug_1 = require("./debug");
log4js_1.default.configure({
    pm2: debug_1.isProductionMode(),
    appenders: {
        console: { type: 'stdout' },
        'dev-logger': {
            type: 'dateFile',
            filename: 'server.log',
            pattern: '.yyyy-MM-dd',
            maxLogSize: 10485760,
            backups: 2,
            compress: true,
        },
        'db-logger': {
            type: 'dateFile',
            filename: 'db.log',
            pattern: '.yyyy-MM-dd',
            maxLogSize: 10485760,
            backups: 1,
            compress: true,
        },
    },
    categories: {
        default: {
            appenders: ['console', 'dev-logger'],
            level: 'info',
        },
        server: {
            appenders: ['console', 'dev-logger'],
            level: 'info',
        },
        database: {
            appenders: ['console', 'db-logger'],
            level: 'info',
        },
    },
});
exports.logger = log4js_1.default.getLogger('server');
exports.dbLogger = log4js_1.default.getLogger('database');
if (debug_1.isProductionMode()) {
    exports.logger.level = 'info';
    exports.dbLogger.level = 'info';
}
else {
    exports.logger.level = 'debug';
    exports.dbLogger.level = 'debug';
}
const logProcess = (method, value, ...rest) => exports.logger.info(`[${chalk_1.default.yellow(method)}].${value}`, ...rest);
exports.logProcess = logProcess;
const logMigrationStart = (method, name) => exports.logger.info(`Running migration ${chalk_1.default.red.bold(method)} : ${chalk_1.default.yellow(name)}`);
exports.logMigrationStart = logMigrationStart;
const logMigrationEnd = (method, name) => exports.logger.info(`Migration ${chalk_1.default.red.bold(method)} ${chalk_1.default.yellow(name)} done!`);
exports.logMigrationEnd = logMigrationEnd;
