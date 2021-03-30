import '@common/utils/env';
import AppServer from '../express/AppServer';

module.exports = async () => {
	// Bootstrap application
	const applicationServer = new AppServer();
	await applicationServer.connect();
	await applicationServer.start();

	globalThis.__APPLICATION__ = applicationServer;
};
