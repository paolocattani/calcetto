import chalk from 'chalk';
import { Server as SocketIoServer, Socket } from 'socket.io';
import { UserDTO } from '@common/dto';
import { ClientToServerEvents, EventMessage, Events, ServerToClientEvents } from '@common/models';
import { AppRequest } from '../controller';
import { logEvent } from '../core/logger';

// Broadcast message to a specific room
export const broadcastUpdates = (
	socket: Socket<ClientToServerEvents, ServerToClientEvents>,
	room: string,
	message: EventMessage
) => {
	logEvent('Broadcasting updates to rooom : ', room);
	socket.to(room).emit(Events.NEW_MESSAGE, message);
};

// Loop through connected client and perform a callback.
export const iterateConnectedClient = async (
	io: SocketIoServer,
	socket: Socket,
	callback: (client: Socket, user: UserDTO) => void
) => {
	const users: Array<UserDTO> = [];
	const ids = await io.allSockets();
	for (let id of ids) {
		const client = io.sockets.sockets.get(id);
		const user = (<AppRequest>client?.request).user;
		if (client && user && socket.id !== client.id) {
			callback(client, user);
			users.push(user);
		}
	}
	return users;
};
