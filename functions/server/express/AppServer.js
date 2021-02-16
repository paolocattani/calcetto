"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractServer_1 = require("./AbstractServer");
const connection_1 = require("../database/config/connection");
const generator_1 = __importDefault(require("../generator/generator"));
const index_1 = __importDefault(require("../controller/index"));
require("../core/env");
const chalk_1 = __importDefault(require("chalk"));
const logger_1 = require("../core/logger");
const debug_1 = require("../core/debug");
const migrations_1 = require("../database/migrations");
const defaultName = 'ApplicationServer Calcetto';
const defaultPort = debug_1.isProductionMode() ? Number(process.env.PORT) : Number(process.env.SERVER_PORT);
const defaultCPUs = Number(process.env.SERVER_WORKERS);
class AppServer extends AbstractServer_1.AbstractServer {
    constructor(applicationName = defaultName, applicationPort = defaultPort, applicationCPUs = defaultCPUs) {
        super(applicationName, applicationPort, applicationCPUs);
        this.connection = null;
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            yield migrations_1.migrationUp();
            const force = process.env.SERVER_FORCE && process.env.SERVER_FORCE.toLowerCase() === 'true';
            logger_1.logger.info((force ? chalk_1.default.redBright.bold(' [ FORCE ] ') : chalk_1.default.greenBright.bold(' [ NORMAL ] ')).concat(chalk_1.default.cyan.bold('Starting database synchronization...')));
            if ((debug_1.isDevMode() || debug_1.isTestMode()) && force) {
                this.connection = yield connection_1.sync({ force });
                yield generator_1.default(false);
            }
            else if (debug_1.isTestMode()) {
                this.connection = process.env.TEST_SCHEMA
                    ? yield connection_1.createSchemaAndSync(process.env.TEST_SCHEMA, { force: true, restartIdentity: true })
                    : yield connection_1.sync({ force: true });
            }
            else {
                this.connection = yield connection_1.authenticate();
            }
            return this.connection;
        });
    }
    routes(application) {
        index_1.default(application);
    }
}
exports.default = AppServer;
