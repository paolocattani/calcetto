import { AppServer } from '../express/AppServer';

export default async function () {
  const server = new AppServer('Test Server');
  const httpServer = server.start();

  (global as any).__SERVER__ = httpServer;
}
