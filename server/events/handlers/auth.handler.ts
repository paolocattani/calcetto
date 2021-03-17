import { Server as SocketIoServer, Socket } from 'socket.io';
import { logEvent } from '../../core/logger';
import { ClientToServerEvents, EventMessage, Events, ServerToClientEvents, UserMessageType } from '@common/models';
import { AppRequest } from '../../controller';
import { safeVerifyToken } from '../../controller/auth/auth.utils';

export const authHandler = (
	io: SocketIoServer<ClientToServerEvents, ServerToClientEvents>,
	socket: Socket<ClientToServerEvents, ServerToClientEvents>
) => {
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
