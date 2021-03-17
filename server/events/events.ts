import { Server as SocketIoServer, Socket } from 'socket.io';
import { tournamentHandler, stage1Handler, stage2Handler, authHandler } from './handlers';

import { ClientToServerEvents, ServerToClientEvents } from '@common/models';
import { PM2InstanceId } from '@core/utils';

// https://socket.io/docs/v3/server-application-structure/
// https://socket.io/docs/v3/emit-cheatsheet/
export const handleSocket = (io: SocketIoServer<ClientToServerEvents, ServerToClientEvents>) => {
	const onConnection = (socket: Socket<ClientToServerEvents, ServerToClientEvents>) => {
		// Handlers
		authHandler(io, socket);
		tournamentHandler(io, socket);
		stage1Handler(io, socket);
		stage2Handler(io, socket);

		// TODO : https://stackoverflow.com/questions/56151166/how-to-make-socket-io-work-properly-with-pm2-cluster-mode
		// Add PM2 instance
		socket.data = { instance: PM2InstanceId };
	};
	io.on('connection', onConnection);
};
