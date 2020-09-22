import { AppServer } from './express/AppServer';

const applicationServer = new AppServer();
applicationServer.connect();
applicationServer.start();

export default applicationServer;
export const connection = applicationServer.connection!;
