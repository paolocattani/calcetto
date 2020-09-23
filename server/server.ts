import AppServer from './express/AppServer';

const applicationServer = new AppServer();
applicationServer.connect();
applicationServer.start();

export default applicationServer;
