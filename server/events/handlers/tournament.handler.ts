import { Events } from '../../../src/@common/models/event.model';
import { Server as SocketIoServer, Socket } from 'socket.io';
import { Request } from 'express';

export const tournamentHandler = (io: SocketIoServer, socket: Socket, request: Request) => {
	// Join a new tournament to receive update
	const joinTournament = (tournamentId: number) => {
		socket.join(`tournament-${tournamentId}`);
	};
	// Leave tournament room
	const leaveTournament = (tournamentId: number) => {
		socket.leave(`tournament-${tournamentId}`);
	};
	// Broadcast message to all users inside the room
	const broadcastUpdates = (tournamentId: number) => {
		socket.to(`tournament-${tournamentId}`).emit('new:message');
	};
	socket.on(Events.TOURNAMENT_JOIN, joinTournament);
	socket.on(Events.TOURNAMENT_LEAVE, leaveTournament);
	socket.on(Events.TOURNAMENT_NEW, broadcastUpdates);
};

//
