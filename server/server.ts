import '@common/utils/env';
import AppServer from './express/AppServer';

const applicationServer = new AppServer();
applicationServer.connect().then(() => {
	applicationServer.start();
});

export default applicationServer;
