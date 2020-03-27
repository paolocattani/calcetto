/**
 * @returns default logger configuration
 */
import log4js from 'log4js';
import chalk from 'chalk';
import { isTestMode, isDevMode, isProductionMode } from './debug';

log4js.configure({
  appenders: {
    console: { type: 'stdout' },
    'dev-logger': {
      type: 'dateFile',
      filename: 'server.log',
      pattern: '.yyyy-MM-dd',
      maxLogSize: 10485760,
      backups: 2,
      compress: true
    },
    'db-logger': {
      type: 'dateFile',
      filename: 'db.log',
      pattern: '.yyyy-MM-dd',
      maxLogSize: 10485760,
      backups: 1,
      compress: true
    }
  },
  categories: {
    default: {
      appenders: ['console', 'dev-logger'],
      level: 'info'
    },
    server: {
      appenders: ['console', 'dev-logger'],
      level: 'info'
    },
    database: {
      appenders: ['console', 'db-logger'],
      level: 'info'
    }
  }
});

export const logger = log4js.getLogger('server');
export const dbLogger = log4js.getLogger('database');

if (isProductionMode()) {
  logger.level = 'info';
  dbLogger.level = 'info';
} else if (isDevMode()) {
  logger.level = 'debug';
  dbLogger.level = 'debug';
} else if (isTestMode()) {
  logger.level = 'warn';
  dbLogger.level = 'warn';
}

export const logProcess = (method: string, value: string): void => logger.info(`[${chalk.yellow(method)}].${value}`);
