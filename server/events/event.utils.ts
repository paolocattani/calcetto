import chalk from 'chalk';
import { Server as SocketIoServer, Socket } from 'socket.io';
import { UserDTO } from '../../src/@common/dto';
import { EventMessage } from '../../src/@common/models';
import { AppRequest } from '../controller';
import { logger } from '../core/logger';

// Broadcast message to a specific room
export const broadcastUpdates = (socket: Socket, room: string, message: EventMessage) => {
	logEvent('Broadcasting updates to rooom : ', room);
	socket.to(room).emit('new_message', message);
};

// A standard form to log events
export const logEvent = (str: string, ...args: any) =>
	logger.info(`${chalk.blueBright('[ Event ]')} : ${str} `, ...args);

// Loop through connected client and perform a callback.
export const iterateConnectedClient = async (
	io: SocketIoServer,
	callback: (client: Socket, user?: UserDTO) => void
) => {
	const users: Array<UserDTO> = [];
	const ids = await io.allSockets();
	for (let id of ids) {
		const client = io.sockets.sockets.get(id);
		if (client) {
			callback(client, (<AppRequest>client.request).user);
			users.push((<AppRequest>client.request).user);
		}
	}
	return users;
};
