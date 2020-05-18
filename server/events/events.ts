import { Response, NextFunction } from 'express';
// Controllers
import { AppRequest } from 'controller';
// Core
import { logger, logProcess } from '../core/logger';
import { asyncMiddleware, safeVerifyToken } from '../core/middleware';
import { DEFAULT_HEADERS, EOM, CHAR_SET } from './constants';
import { SessionStatus, Message, ConnectedClient } from './types';

const className = 'Session Events : ';
let connectedClients: ConnectedClient[] = [];
let ii = 0;
export const sessionControl = asyncMiddleware(async (req: AppRequest, res: Response, next: NextFunction) => {
  req.socket.setTimeout(10000);
  const token = req.cookies.token;
  let intervalId: NodeJS.Timeout | null = null;

  // Apro connessione
  let [user] = safeVerifyToken(token);
  res.writeHead(200, DEFAULT_HEADERS);

  // Aggiugo questo client a quelli collegati
  const id = ii++;
  connectedClients.push({ token, response: res });
  logger.info(`New User connected . Total connected : ${connectedClients.length}`);
  // Controllo ogni 5 secondi
  // https://gist.github.com/akirattii/257d7efc8430c7e3fd0b4ec60fc7a768
  // FIXME: memory leak !
  intervalId = setInterval(() => {
    // Serve per evitare il timeout
    res.write(`:${EOM}`, CHAR_SET);
    res.flush();
    // Controllo validità sessione
    isSessionValid(token, res, intervalId, id);

    // TODO: aggiornamento girone
  }, 5000);

  // on Connection Close
  res.on('close', () => {
    logger.info(`User ${user?.username ?? ''} disconnected. . Total connected : ${connectedClients.length + 1}`);
    if (intervalId) {
      logger.info(`Closing ${id}`);
      clearInterval(intervalId);
    }
  });
});

// Verifica se il token per questo client è ancora valido
const isSessionValid = (token: string, response: Response, intervalId: NodeJS.Timeout | null, id: number) => {
  const [user, isTokenValid] = safeVerifyToken(token);
  if (!isTokenValid) {
    // Se il token non è piu valido informo il client,chiudo la connessione e interropondo il ciclo di controllo
    logger.info(`Token for user ${user?.username ?? ''} expired !`);
    const message: Message = {
      status: SessionStatus.SESSION_EXPIRED,
    };
    response.write(`data:${JSON.stringify(message)}${EOM}`, CHAR_SET);
    response.flush();
    response.end();
    connectedClients.splice(id, 1);
    if (intervalId) clearInterval(intervalId);
    return false;
  }
  return true;
};
