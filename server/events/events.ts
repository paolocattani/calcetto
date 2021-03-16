import { Server as SocketIoServer, Socket } from 'socket.io';
import { tournamentHandler, stage1Handler, stage2Handler } from './handlers';
import { AppRequest } from '../controller';
import {
	ClientToServerEvents,
	EventMessage,
	Events,
	ServerToClientEvents,
	UserMessageType,
} from '../../src/@common/models';
import { safeVerifyToken } from '../controller/auth/auth.utils';
import { logEvent } from '../core/logger';

// https://socket.io/docs/v3/server-application-structure/
// https://socket.io/docs/v3/emit-cheatsheet/
export const handleSocket = (io: SocketIoServer<ClientToServerEvents, ServerToClientEvents>) => {
	const onConnection = async (socket: Socket<ClientToServerEvents, ServerToClientEvents>) => {
		// Handlers
		tournamentHandler(io, socket);
		stage1Handler(io, socket);
		stage2Handler(io, socket);

		// Common
		const { user, clientIp, session } = <AppRequest>socket.request;
		logEvent(`User '${user!.name} ${user!.surname}' from '${clientIp}' is now connected!`);
		// Logger
		socket.prependAny((eventName, ...args) => {
			logEvent(`Received event : ${eventName}`);
		});

		// check token every 30 sec
		const interval = setInterval(() => {
			const { jwt, uuid } = session;
			if (!jwt || !uuid) {
				session_expired(socket, interval);
			}
			const [user, isTokenValid] = safeVerifyToken(jwt);
			if (!user || !isTokenValid) {
				session_expired(socket, interval);
			}
		}, 30000);

		// On disconnect
		socket.on('disconnect', () => {
			logEvent(`User '${user!.name} ${user!.surname}' from '${clientIp}' disconnected!`);
			if (interval) {
				clearInterval(interval);
			}
		});
	};

	io.on('connection', onConnection);
};

const session_expired = (socket: Socket<ClientToServerEvents, ServerToClientEvents>, interval: NodeJS.Timeout) => {
	const message: EventMessage = {
		event: Events.SESSION_EXPIRED,
		label: { key: 'event:session_expired' },
		type: UserMessageType.Danger,
	};
	logEvent('Session expired !');
	socket.emit(Events.SESSION_EXPIRED, message);
	if (interval) {
		clearInterval(interval);
	}
};
