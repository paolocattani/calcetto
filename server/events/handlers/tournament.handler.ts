import { Events } from '../../../src/@common/models/event.model';
import { Server as SocketIoServer, Socket } from 'socket.io';
import { broadcastUpdates, iterateConnectedClient, logEvent } from '../event.utils';
import { EventMessage, UserMessageType } from '../../../src/@common/models';
import { AppRequest } from '../../controller';
import { TournamentDTO, UserDTO, UserRole } from '../../../src/@common/dto';
import { Request } from 'express';

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

	// A new tournament has been created
	const newTournament = (tournament: TournamentDTO) => {
		iterateConnectedClient(io, (client: Socket, user: UserDTO) => {
			if (user.role === UserRole.User) {
				logEvent(`\
					Notify user '${user.name} ${user.surname}' \
					that tournament '${tournament.name}-${tournament.date}' is now available\
				`);
				const message: EventMessage = {
					label: {
						key: 'event:tournament.new',
						options: { tournament: `${tournament.name}-${tournament.date}` },
					},
					type: UserMessageType.Success,
				};
				client.emit('new_message', message);
			}
		});
	};

	socket.on(Events.TOURNAMENT_JOIN, joinTournament);
	socket.on(Events.TOURNAMENT_LEAVE, leaveTournament);
	socket.on(Events.TOURNAMENT_NEW, newTournament);
};

//
