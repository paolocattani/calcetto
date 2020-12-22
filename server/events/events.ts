import { NextFunction, Response } from 'express';
// Controllers
import { AppRequest } from '../controller';
// Core
import { logger } from '../core/logger';
import { CHAR_SET, DEFAULT_HEADERS, EOM } from './const';
import { UserDTO, UserRole } from '../../src/@common/dto';
import { Message, SessionStatus } from '../../src/@common/models';
import {getCookies} from "../controller/auth/cookies.utils";
import {safeVerifyToken} from "../controller/auth/auth.utils";

interface ConnectedClient extends Object{
	uuid: string;
	user: UserDTO;
	tournamentId?: number;
	token: string;
	response: Response;
	notification: boolean;
}

let count = 0;
let connectedClients: ConnectedClient[] = [];

const clientToString = ({response}:ConnectedClient) => ''

export const sessionControl = (req: AppRequest, res: Response, next: NextFunction) => {
	req.socket.setTimeout(10000);
	const [token,uuid] = getCookies(req);
	let intervalId: NodeJS.Timeout | null = null;

	let [user] = safeVerifyToken(token);
	if (!user) {
		return;
	}
	// Apro connessione
	res.writeHead(200, DEFAULT_HEADERS);

	// Aggiugo questo client a quelli collegati
	const id = count++;
	connectedClients.push({ uuid , token, response: res, user, notification: user.role !== UserRole.Admin });
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
		connectedClients = connectedClients.filter((e) => e.uuid != uuid);
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
		count--;
		sendNotification(response, message, true);
		connectedClients.splice(id, 1);
		if (intervalId) {
			clearInterval(intervalId);
		}
		return false;
	}
	return true;
};
export const subscribe = (user: UserDTO, uuid:string, tournamentId: number) => {
	connectedClients = connectedClients.map((c) => {
		if (c.notification && c.uuid === uuid) {
			logger.error(`${c.uuid} : ${c.user.username} subscribe to ${tournamentId}`)
			c.tournamentId = tournamentId;
		}
		return c;
	});
};

export const sendNotificationToAll = (message: Message, tournamentId?: number) => {
	logger.warn(`sendNotificationToAll`)
	connectedClients.forEach((c) => {
		if (c.notification) {
			if (tournamentId) {
				if (c.tournamentId && c.tournamentId === tournamentId) {
					logger.error(`${c.uuid} : ${c.user.username} notify for ${tournamentId}`)
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
