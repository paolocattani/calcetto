import '../src/@common/utils/env';
import AppServer from './express/AppServer';

const applicationServer = new AppServer();
export const connection = applicationServer.connect();
export const httpServer = applicationServer.start();

export const webApi = applicationServer.application;

export default applicationServer;
