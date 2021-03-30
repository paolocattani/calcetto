import '@common/utils/env';
import { logger } from '@core/logger';
import AppServer from './express/AppServer';

logger.info('Boostrapping server...');
const applicationServer = new AppServer();
applicationServer.connect().then(() => {
	logger.info('Connections enstablished...');
	applicationServer.start().then(() => {
		logger.info('Server started!');
	});
});

export default applicationServer;
