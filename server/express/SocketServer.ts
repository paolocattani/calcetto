import * as http from 'http';
import cors from 'cors';
import { clientInfo, mwWrapper, withAuth } from '../middleware';
import { ClientToServerEvents, ServerToClientEvents } from '@common/models/event.model';
import { createAdapter } from 'socket.io-redis'; // Redis adapter for socket.io
import { Server as SocketIoServer } from 'socket.io'; // socket.io
import { RedisClient } from 'redis';
import { cookiesOption } from 'controller/auth/session.utils';
import express from 'express';

let socketIO: SocketIoServer<ClientToServerEvents, ServerToClientEvents> | null = null;
export const createSocketServer = (
	redisClient: RedisClient,
	httpServer: http.Server,
	corsOptions: cors.CorsOptions,
	sessionMw: express.RequestHandler
) => {
	// https://www.npmjs.com/package/socket.io-redis#typescript
	const subClient = redisClient.duplicate();

	// https://socket.io/docs/v3/server-installation/
	// https://socket.io/docs/v3/server-api/index.html
	socketIO = new SocketIoServer<ClientToServerEvents, ServerToClientEvents>(httpServer, {
		//path: '/socket',
		// PM2 prefer web socket over polling
		transports: ['websocket', 'polling'],
		serveClient: false,
		cookie: cookiesOption,
		cors: corsOptions,
		adapter: createAdapter({ pubClient: redisClient, subClient }),
	});
	// Socket middleware
	socketIO.use(mwWrapper(sessionMw));
	socketIO.use(mwWrapper(clientInfo));
	socketIO.use(mwWrapper(withAuth));

	return socketIO;
};

export const closeServer = () => {
	if (socketIO) {
		socketIO.close();
	}
};
