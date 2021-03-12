import { Events } from '../../../src/@common/models/event.model';
import { Server as SocketIoServer, Socket } from 'socket.io';
import { broadcastUpdates, iterateConnectedClient, logEvent } from '../event.utils';
import { EventMessage, UserMessageType } from '../../../src/@common/models';
import { AppRequest } from '../../controller';
import { TournamentDTO, UserDTO, UserRole } from '../../../src/@common/dto';
import { formatDate } from '../../../src/@common/utils/date.utils';

export const getTournamentLabel = (tournament: TournamentDTO) => `${tournament.name}-${formatDate(tournament.date)}`;
export const getUserLabel = (user: UserDTO) => `${user.name} ${user.surname}`;
export const tournamentHandler = (io: SocketIoServer, socket: Socket) => {
	const { user } = <AppRequest>socket.request;

	// Join a new tournament to receive update
	const joinTournament = (tournament: TournamentDTO) => {
		const room = `tournament-${tournament.id}`;
		logEvent(`A user '${user!.name} ${user!.surname}' joined tournament ${tournament.id}`);
		socket.join(room);
		broadcastUpdates(socket, room, {
			event: Events.TOURNAMENT_JOIN,
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
		logEvent(`User '${getUserLabel(user!)}' leaved tournament ${tournament.id}`);
		socket.leave(room);
		broadcastUpdates(socket, room, {
			event: Events.TOURNAMENT_LEAVE,
			label: {
				key: 'event:tournament.leaved',
				options: { user: getUserLabel(user!) },
			},
			type: UserMessageType.Success,
		});
	};

	// A new tournament has been created
	const newTournament = (tournament: TournamentDTO) => {
		iterateConnectedClient(io, (client: Socket, user: UserDTO) => {
			if (user.role === UserRole.User) {
				logEvent(
					`Notify user '${getUserLabel(user!)}' that tournament '${getTournamentLabel(tournament)}' is now available`
				);
				client.emit(Events.TOURNAMENT_REFRESH, {
					event: Events.TOURNAMENT_REFRESH,
					label: {
						key: 'event:tournament.new',
						options: { tournament: getTournamentLabel(tournament) },
					},
					type: UserMessageType.Success,
				});
			}
		});
	};

	const updateTournament = (tournament: TournamentDTO) => {
		iterateConnectedClient(io, (client: Socket, user: UserDTO) => {
			logEvent(
				`Notify user '${getUserLabel(user!)}' that tournament '${getTournamentLabel(tournament)}' is now at Stage2`
			);
			client.emit(Events.TOURNAMENT_REFRESH, {
				event: Events.TOURNAMENT_REFRESH,
				label: {
					key: 'event:tournament.update',
					options: { tournament: getTournamentLabel(tournament) },
				},
				type: UserMessageType.Success,
			});
		});
	};

	const deleteTournament = (tournament: TournamentDTO) => {
		iterateConnectedClient(io, (client: Socket, user: UserDTO) => {
			logEvent(
				`Notify user '${getUserLabel(user!)}' that tournament '${getTournamentLabel(tournament)}' has been deleted`
			);
			client.broadcast.emit(Events.TOURNAMENT_REFRESH, {
				event: Events.TOURNAMENT_REFRESH,
				label: {
					key: 'event:tournament.deleted',
					options: { tournament: getTournamentLabel(tournament) },
				},
				type: UserMessageType.Success,
			});
		});
	};

	socket.prependAny((eventName, ...args) => {
		logEvent(eventName, ...args);
	});
	socket.on(Events.TOURNAMENT_JOIN, joinTournament);
	socket.on(Events.TOURNAMENT_LEAVE, leaveTournament);
	socket.on(Events.TOURNAMENT_NEW, newTournament);
	socket.on(Events.TOURNAMENT_UPDATED, updateTournament);
	socket.on(Events.TOURNAMENT_DELETED, deleteTournament);
};

//
