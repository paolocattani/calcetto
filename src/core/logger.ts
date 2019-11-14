/**
 * @returns default logger configuration
 */
import log4js from 'log4js';
import { isTestMode, isDevMode, isProductionMode } from './debug';

log4js.configure({
	appenders: {
		'console': { type: 'stdout' },
		'dev-logger': {
			type: 'datefile',
			filename: 'dev.log',
			pattern: '.yyyy-MM-dd-hh',
			maxLogSize: 10485760,
			backups: 3,
			compress: true
		}
	},
	categories: {
		default: {
			appenders: ['console', 'dev-logger'],
			level: 'info'
		}
	}
});

export const logger = log4js.getLogger();
if (isProductionMode()) {
	logger.level = 'info';
} else if (isDevMode()) {
	logger.level = 'debug';

} else if (isTestMode()) {
	logger.level = 'warn';
}


