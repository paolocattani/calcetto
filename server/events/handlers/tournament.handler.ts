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
	const joinTournament = (tournament: TournamentDTO) => {
		const room = `tournament-${tournament.id}`;
		logEvent(`A user '${user!.name} ${user!.surname}' joined tournament ${tournament.id}`);
		socket.join(room);
		broadcastUpdates(socket, room, {
			label: {
				key: 'event:tournament.joined',
				options: { user: `${user!.name} ${user!.surname}` },
			},
			type: UserMessageType.Success,
		});
	};

	// Leave tournament room
	const leaveTournament = (tournament: TournamentDTO) => {
		const room = `tournament-${tournament.id}`;
		logEvent(`User '${user!.name} ${user!.surname}' leaved tournament ${tournament.id}`);
		socket.leave(room);
		broadcastUpdates(socket, room, {
			label: {
				key: 'event:tournament.leaved',
				options: { user: `${user!.name} ${user!.surname}` },
			},
			type: UserMessageType.Success,
		});
	};

	// A new tournament has been created
	const newTournament = (tournament: TournamentDTO) => {
		iterateConnectedClient(io, (client: Socket, user: UserDTO) => {
			if (user.role === UserRole.User) {
				logEvent(`\
					Notify user '${user.name} ${user.surname}' \
					that tournament '${tournament.name}-${tournament.date}' is now available\
				`);
				client.broadcast.emit('new_message', {
					label: {
						key: 'event:tournament.new',
						options: { tournament: `${tournament.name}-${tournament.date}` },
					},
					type: UserMessageType.Success,
				});
			}
		});
	};

	const updateTournament = (tournament: TournamentDTO) => {
		iterateConnectedClient(io, (client: Socket, user: UserDTO) => {
			logEvent(`\
					Notify user '${user.name} ${user.surname}' \
					that tournament '${tournament.name}-${tournament.date}' is now at Stage2\
				`);
			client.broadcast.emit('new_message', {
				label: {
					key: 'event:tournament.update',
					options: { tournament: `${tournament.name}-${tournament.date}` },
				},
				type: UserMessageType.Success,
			});
		});
	};

	const deleteTournament = (tournament: TournamentDTO) => {
		iterateConnectedClient(io, (client: Socket, user: UserDTO) => {
			logEvent(`\
					Notify user '${user.name} ${user.surname}' \
					that tournament '${tournament.name}-${tournament.date}' has been deleted\
				`);
			client.broadcast.emit('new_message', {
				label: {
					key: 'event:tournament.deleted',
					options: { tournament: `${tournament.name}-${tournament.date}` },
				},
				type: UserMessageType.Success,
			});
		});
	};

	socket.on(Events.TOURNAMENT_JOIN, joinTournament);
	socket.on(Events.TOURNAMENT_LEAVE, leaveTournament);
	socket.on(Events.TOURNAMENT_NEW, newTournament);
	socket.on(Events.TOURNAMENT_UPDATED, updateTournament);
	socket.on(Events.TOURNAMENT_DELETED, deleteTournament);
};

//
