import { Server as SocketIoServer, Socket } from 'socket.io';
import { tournamentHandler, stage1Handler, stage2Handler, authHandler } from './handlers';

import { ClientToServerEvents, ServerToClientEvents } from '../../src/@common/models';

// https://socket.io/docs/v3/server-application-structure/
// https://socket.io/docs/v3/emit-cheatsheet/
export const handleSocket = (io: SocketIoServer<ClientToServerEvents, ServerToClientEvents>) => {
	const onConnection = (socket: Socket<ClientToServerEvents, ServerToClientEvents>) => {
		// Handlers
		authHandler(io, socket);
		tournamentHandler(io, socket);
		stage1Handler(io, socket);
		stage2Handler(io, socket);
	};

	io.on('connection', onConnection);
};
