// import { scheduleJob } from 'node-schedule';
import { logger } from '@core/logger';
import chalk from 'chalk';
//import stats from './stats';

// TODO:
export default function (active: boolean) {
	if (!active) return;
	logger.info(chalk.redBright.bold('Scheduling backgroung jobs !'));
	//scheduleJob('Sync statistics', '0 * * * *', stats);
}
