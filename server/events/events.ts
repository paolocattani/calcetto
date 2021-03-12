import { Server as SocketIoServer, Socket } from 'socket.io';
import { tournamentHandler } from './handlers/tournament.handler';
import { AppRequest } from '../controller';
import { EventMessage, Events, UserMessageType } from '../../src/@common/models';
import { safeVerifyToken } from '../controller/auth/auth.utils';
import { logEvent } from './event.utils';

// https://socket.io/docs/v3/server-application-structure/
// https://socket.io/docs/v3/emit-cheatsheet/
export const handleSocket = (io: SocketIoServer) => {
	const onConnection = async (socket: Socket) => {
		// Handlers
		tournamentHandler(io, socket);
		const { user, clientIp, session } = <AppRequest>socket.request;

		logEvent(`User '${user!.name} ${user!.surname}' from '${clientIp}' is now connected!`);

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

const session_expired = (socket: Socket, interval: NodeJS.Timeout) => {
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
