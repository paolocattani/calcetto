import { AppServer } from '../express/AppServer';
import supertest from 'supertest';

// https://dev.to/nedsoft/testing-nodejs-express-api-with-jest-and-supertest-1km6
var server: any = null;
export default async () => {
  // server = new AppServer();
  /*
  await server.connect();
  const httpServer = server.start();
  (global as any).__SERVER__ = httpServer;
  (global as any).__EXPRESS__ = server.application;

  //process.env.NODE_ENV = 'test';

  // TODO: change NODE_ENV
  // DROP AND RECREATE TEST DB
  */
};

export const serverTest = supertest(server!.application);
