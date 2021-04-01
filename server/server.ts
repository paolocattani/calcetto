import { logger } from '@core/logger';
import AppServer from 'express/AppServer';

export default async function bootstrap() {
	logger.info('Boostrapping server...');
	let applicationServer = null;
	try {
		applicationServer = new AppServer();
		await applicationServer.connect();
		logger.info('Connections enstablished...');
		await applicationServer.start();
		logger.info('Server started!');
	} catch (error) {
		logger.fatal('Unable to bootstrap server ', error);
		throw new Error('Unable to bootstrap server !');
	}
	return applicationServer;
}
