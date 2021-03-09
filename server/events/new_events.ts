import { TournamentProgress, UserDTO } from '../../src/@common/dto';
import { Server as SocketIoServer, Socket } from 'socket.io';
import { Response, Request } from 'express';
import { logger } from '../core/logger';
import { ExtendedError } from 'socket.io/dist/namespace';
import chalk from 'chalk';
import { safeVerifyToken } from '../controller/auth/auth.utils';
import { User } from '../database/models';
import { asyncSocketMiddleware } from '../middleware';
import { tournamentHandler } from './handlers/tournament.handler';
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

	io.use(auhtMiddleware);
	io.on('connection', onConnection);
};

const clientHandler = (io: SocketIoServer, socket: Socket, request: Request) => {
	const onLogin = () => {};
	const onLogout = () => {};

	socket.on('client:login', onLogin);
	socket.on('client:logout', onLogout);
};

const UNAUTHORIZED = 'common:server.unauthorized';
const auhtMiddleware = asyncSocketMiddleware(
	async (socket: Socket, request: Request, next: (err?: ExtendedError) => void) => {
		try {
			const { jwt, uuid } = request.session;
			if (!jwt || !uuid) {
				logger.error(chalk.redBright('Come back with more cookies... -> '));
				return next(new Error(UNAUTHORIZED));
			}
			const [user, isTokenValid] = safeVerifyToken(jwt);
			if (isTokenValid && user) {
				// Controllo se l'utente esiste ancora a db
				const userDb = await User.findByPk(user.id);
				if (userDb) {
					next();
				}
			}
		} catch (error) {
			return next(new Error(UNAUTHORIZED));
		}
		return next(new Error(UNAUTHORIZED));
	}
);
