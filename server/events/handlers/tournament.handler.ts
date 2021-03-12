import { Events } from '../../../src/@common/models/event.model';
import { Server as SocketIoServer, Socket } from 'socket.io';
import { broadcastUpdates, logEvent } from '../event.utils';
import { EventMessage, UserMessageType } from '../../../src/@common/models';
import { AppRequest } from '../../controller';

export const tournamentHandler = (io: SocketIoServer, socket: Socket) => {
	const { user } = <AppRequest>socket.request;

	// Join a new tournament to receive update
	const joinTournament = (tournamentId: number) => {
		const room = `tournament-${tournamentId}`;
		logEvent(`A user '${user!.name} ${user!.surname}' joined tournament ${tournamentId}`);
		socket.join(room);
		const message: EventMessage = {
			label: {
				key: 'event:tournament.joined',
				options: { user: `${user!.name} ${user!.surname}` },
			},
			type: UserMessageType.Success,
		};
		broadcastUpdates(socket, room, message);
	};

	// Leave tournament room
	const leaveTournament = (tournamentId: number) => {
		const room = `tournament-${tournamentId}`;
		logEvent(`User '${user!.name} ${user!.surname}' leaved tournament ${tournamentId}`);
		socket.leave(room);
		const message: EventMessage = {
			label: {
				key: 'event:tournament.leaved',
				options: { user: `${user!.name} ${user!.surname}` },
			},
			type: UserMessageType.Success,
		};
		broadcastUpdates(socket, room, message);
	};

	socket.on(Events.TOURNAMENT_JOIN, joinTournament);
	socket.on(Events.TOURNAMENT_LEAVE, leaveTournament);
};

//
