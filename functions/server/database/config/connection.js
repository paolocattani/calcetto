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
exports.getDbConnection = exports.createSchemaAndSync = exports.sync = exports.authenticate = exports.getSequelizeEnv = void 0;
require("../../core/env");
const logger_1 = require("../../core/logger");
const debug_1 = require("../../core/debug");
const sequelize_typescript_1 = require("sequelize-typescript");
const config_1 = __importDefault(require("./config"));
const util_1 = __importDefault(require("util"));
const chalk_1 = __importDefault(require("chalk"));
const models_1 = require("../../../src/@common/models");
let connection;
const getSequelizeEnv = () => config_1.default[process.env.NODE_ENV ? process.env.NODE_ENV : models_1.Environment.development];
exports.getSequelizeEnv = getSequelizeEnv;
function loadModels(schema) {
    return __awaiter(this, void 0, void 0, function* () {
        const envConfig = exports.getSequelizeEnv();
        const uri = process.env[envConfig.useEnvVar];
        if (!debug_1.isProductionMode()) {
            logger_1.logger.info(`URI : ${chalk_1.default.red.bold(util_1.default.inspect(uri))}`);
            logger_1.logger.info(`Models : ${__dirname}/../models/**/*.model.${!process.env.SERVER_TRANSPILED ? 'ts' : 'js'}`);
        }
        const connectionOptions = Object.assign(Object.assign({}, envConfig), { models: [`${__dirname}/../models/**/*.model.${!process.env.SERVER_TRANSPILED ? 'ts' : 'js'}`], define: { schema } });
        if (process.env.NODE_ENV === 'test' && process.env.IS_DOCKER && connectionOptions.dialectOptions) {
            delete connectionOptions.dialectOptions.ssl;
        }
        return new sequelize_typescript_1.Sequelize(uri, connectionOptions);
    });
}
function authenticate(options) {
    return __awaiter(this, void 0, void 0, function* () {
        if (connection) {
            return connection;
        }
        connection = yield loadModels();
        yield connection.authenticate(options);
        logger_1.logger.info(chalk_1.default.cyan.bold('Database connected!'));
        return connection;
    });
}
exports.authenticate = authenticate;
function sync(options) {
    return __awaiter(this, void 0, void 0, function* () {
        connection = yield loadModels();
        yield connection.sync(options);
        logger_1.logger.info(chalk_1.default.cyan.bold('Database synchronization complete!'));
        return connection;
    });
}
exports.sync = sync;
function createSchemaAndSync(schema, options) {
    return __awaiter(this, void 0, void 0, function* () {
        connection = yield loadModels(schema);
        yield connection.dropSchema(schema, {});
        yield connection.createSchema(schema, {});
        yield connection.sync(Object.assign(Object.assign({}, options), { schema, searchPath: schema }));
        logger_1.logger.info(chalk_1.default.cyan.bold(`Database synchronizatio1n complete on schema ${schema}!`));
        return connection;
    });
}
exports.createSchemaAndSync = createSchemaAndSync;
const getDbConnection = () => __awaiter(void 0, void 0, void 0, function* () { return (connection ? connection : yield authenticate()); });
exports.getDbConnection = getDbConnection;
