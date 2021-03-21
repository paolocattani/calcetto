/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../typings/loglevel.d.ts" />

import log from 'loglevel';
import chalk from 'chalk';
import prefix, { LoglevelPluginPrefixOptions } from 'loglevel-plugin-prefix';
import { isProductionMode } from './env.utils';

// Formatter
type LoggerLevel = keyof typeof colors;
const colors = {
	TRACE: chalk.magenta,
	DEBUG: chalk.cyan,
	INFO: chalk.blue,
	WARN: chalk.yellow,
	ERROR: chalk.red,
};
const formatterOptions: LoglevelPluginPrefixOptions = {
	template: '[%t] %l:',
	levelFormatter: (level) => level.toUpperCase(),
	nameFormatter: (name) => name || 'root',
	timestampFormatter: (date) => date.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1'),
	format: (level, name, timestamp) =>
		`${chalk.gray(`[${timestamp}]`)} ${colors[level.toUpperCase() as LoggerLevel](level)} ${chalk.green(`${name}:`)}`,
};

prefix.reg(log);
prefix.apply(log, formatterOptions);

// Enable all log level
if (isProductionMode()) {
	log.setLevel('warn');
} else {
	log.enableAll();
}

export default {
	warn: (...msg: Array<any>): void => log.warn(...msg),
	info: (...msg: Array<any>): void => log.info(...msg),
	debug: (...msg: Array<any>): void => log.debug(...msg),
	error: (...msg: Array<any>): void => log.error(...msg),
	trace: (...msg: Array<any>): void => log.trace(...msg),
};
