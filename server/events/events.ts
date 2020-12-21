import { NextFunction, Response } from 'express';
// Controllers
import { AppRequest } from '../controller';
// Core
import { logger } from '../core/logger';
import { asyncMiddleware, safeVerifyToken } from '../core/middleware';
import { getToken } from '../manager/auth.manager';
import { CHAR_SET, DEFAULT_HEADERS, EOM } from './const';
import { UserDTO, UserRole } from '../../src/@common/dto';
import { Message, SessionStatus } from '../../src/@common/models';

interface ConnectedClient {
	id: Date;
	user: UserDTO;
	tournamentId?: number;
	token: string;
	response: Response;
	notification: boolean;
}

let ii = 0;
let connectedClients: ConnectedClient[] = [];

export const sessionControl = (req: AppRequest, res: Response, next: NextFunction) => {
	req.socket.setTimeout(10000);
	const token = getToken(req);
	let intervalId: NodeJS.Timeout | null = null;

	let [user] = safeVerifyToken(token);
	if (!user) {
		return;
	}
	// Apro connessione
	res.writeHead(200, DEFAULT_HEADERS);

	// Aggiugo questo client a quelli collegati
	const id = ii++;
	const currentDate = new Date();
	connectedClients.push({ id: currentDate, token, response: res, user, notification: user.role !== UserRole.Admin });
	logger.info(`New User connected . Total connected : ${connectedClients.length}`);
	// Controllo ogni 5 secondi
	// https://gist.github.com/akirattii/257d7efc8430c7e3fd0b4ec60fc7a768
	//@ts-ignore
	intervalId = setInterval(() => {
		// Serve per evitare il timeout
		sendNotification(res);
		// Controllo validità sessione
		isSessionValid(token, res, intervalId, id);
	}, 5000);

	const stopWatcher = () => {
		connectedClients = connectedClients.filter((e) => e.id != currentDate);
		logger.info(`User ${user?.username ?? ''} disconnected. . Total connected : ${connectedClients.length}`);
		if (intervalId) {
			clearInterval(intervalId);
		}
		// Close connection
		res.end();
	};

	// on Connection Close
	res.on('close', () => stopWatcher());
	res.on('end', () => stopWatcher());
};

// Verifica se il token per questo client è ancora valido
const isSessionValid = (token: string, response: Response, intervalId: NodeJS.Timeout | null, id: number) => {
	const [user, isTokenValid] = safeVerifyToken(token);
	if (!isTokenValid) {
		// Se il token non è piu valido informo il client,chiudo la connessione e interropondo il ciclo di controllo
		logger.info(`Token for user ${user?.username ?? ''} expired !`);
		const message: Message = {
			status: SessionStatus.SESSION_EXPIRED,
		};
		sendNotification(response, message, true);
		connectedClients.splice(id, 1);
		if (intervalId) {
			clearInterval(intervalId);
		}
		return false;
	}
	return true;
};
export const subscribe = (user: UserDTO, tournamentId: number) => {
	connectedClients.forEach((c) => {
		if (c.user.role === UserRole.User && c.user.id === user.id) {
			c.tournamentId = tournamentId;
		}
	});
};

export const sendNotificationToAll = (message: Message, tournamentId?: number) => {
	connectedClients.forEach((c) => {
		if (c.user.role === UserRole.User) {
			if (tournamentId) {
				if (tournamentId && c.tournamentId && c.tournamentId === tournamentId) {
					sendNotification(c.response, message, false);
				}
			} else {
				sendNotification(c.response, message, false);
			}
		}
	});
};

export const sendNotification = (response: Response, message?: Message, endSession?: boolean) => {
	// Start Message
	if (message) {
		response.write(`data:${JSON.stringify(message)}`, CHAR_SET);
	}
	// End Message
	response.write(`${EOM}`, CHAR_SET);
	// Send message
	response.flush();
	// Close session
	if (endSession) {
		response.end();
	}
};
