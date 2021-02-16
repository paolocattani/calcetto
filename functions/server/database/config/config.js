"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("../../core/logger");
const config = {
    development: {
        useEnvVar: 'DEV_URL',
        dialect: 'postgres',
        minifyAliases: true,
        logging: false,
        pool: { max: 5, min: 0, acquire: 30000, idle: 10000 },
    },
    test: {
        useEnvVar: 'TEST_URL',
        dialect: 'postgres',
        minifyAliases: true,
        logging: (sqlString) => logger_1.dbLogger.warn(sqlString),
        pool: { max: 5, min: 0, acquire: 30000, idle: 10000 },
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            },
        },
    },
    production: {
        useEnvVar: 'DATABASE_URL',
        dialect: 'postgres',
        logging: false,
        minifyAliases: true,
        pool: { max: 5, min: 0, acquire: 30000, idle: 10000 },
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            },
        },
    },
};
exports.default = config;
