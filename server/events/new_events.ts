import { TournamentProgress, UserDTO } from '../../src/@common/dto';
import { Server as SocketIoServer, Socket } from 'socket.io';
import { Response, Request } from 'express';
import { logger } from '../core/logger';
import { ExtendedError } from 'socket.io/dist/namespace';
import chalk from 'chalk';
import { safeVerifyToken } from '../controller/auth/auth.utils';
import { User } from '../database/models';
import { asyncSocketMiddleware, mwWrapper, withAuth } from '../middleware';
import { tournamentHandler } from './handlers/tournament.handler';
import { AppRequest } from '../controller';
/// <reference types="express-socket.io-session" />

interface Client {
	uuid: string;
	user: UserDTO;
	tournamentId?: number;
	progress?: TournamentProgress;
	token: string;
	response: Response;
	notification: boolean;
}

let connectedClients = new Map<string, Client>();
const clientToString = ({ uuid, user, tournamentId, progress }: Client) =>
	tournamentId
		? `${uuid} : ${user.name} ( ${user.id} ) --> ${tournamentId}@${progress}`
		: `${uuid} : ${user.name} ( ${user.id} ) `;

// https://socket.io/docs/v3/server-application-structure/
// https://socket.io/docs/v3/emit-cheatsheet/
export const handleSocket = (io: SocketIoServer) => {
	logger.info('handleSocket : ');

	let interval: NodeJS.Timeout;

	const onConnection = (socket: Socket) => {
		const request = socket.request as Request;
		const { session } = request;

		clientHandler(io, socket, request);
		tournamentHandler(io, socket, request);

		logger.info('New client connected');
		if (interval) {
			clearInterval(interval);
		}
		// interval = setInterval(() => getApiAndEmit(socket), 1000);
		socket.on('disconnect', () => {
			logger.info('Client disconnected');
			clearInterval(interval);
		});
	};

	// Add authorization mw
	io.use(mwWrapper(withAuth));
	io.on('connection', onConnection);
};

const clientHandler = (io: SocketIoServer, socket: Socket, request: Request) => {
	const onLogin = () => {};
	const onLogout = () => {};

	socket.on('client:login', onLogin);
	socket.on('client:logout', onLogout);
};
