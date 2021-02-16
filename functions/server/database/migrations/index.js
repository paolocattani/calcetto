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
Object.defineProperty(exports, "__esModule", { value: true });
exports.migrationDown = exports.migrationUp = exports.umzug = exports.sequelize = void 0;
const logger_1 = require("../../core/logger");
const umzug_1 = require("umzug");
const sequelize_1 = require("sequelize");
const connection_1 = require("../config/connection");
const envConfig = connection_1.getSequelizeEnv();
const uri = process.env[envConfig.useEnvVar];
exports.sequelize = new sequelize_1.Sequelize(uri, envConfig);
exports.umzug = new umzug_1.Umzug({
    migrations: {
        glob: ['./*migration.ts', { cwd: __dirname }],
    },
    context: exports.sequelize,
    storage: new umzug_1.SequelizeStorage({ sequelize: exports.sequelize }),
    logger: logger_1.dbLogger,
});
const migrationUp = () => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.logger.info('Running migration up...');
    yield exports.umzug.up();
    logger_1.logger.info('Migration up complete');
});
exports.migrationUp = migrationUp;
const migrationDown = () => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.logger.info('Running migration down...');
    yield exports.umzug.down();
    logger_1.logger.info('Migration down complete');
});
exports.migrationDown = migrationDown;
