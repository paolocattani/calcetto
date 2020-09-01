import { Response, NextFunction } from 'express';
// Controllers
import { AppRequest } from '../controller';
// Core
import { logger } from '../core/logger';
import { asyncMiddleware, safeVerifyToken } from '../core/middleware';
import { DEFAULT_HEADERS, EOM, CHAR_SET } from './const';
import { SessionStatus, Message, ConnectedClient } from './types';

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
  const currentDate = new Date();
  connectedClients.push({ id: currentDate, token, response: res });
  logger.info(`New User connected . Total connected : ${connectedClients.length}`);
  // Controllo ogni 5 secondi
  // https://gist.github.com/akirattii/257d7efc8430c7e3fd0b4ec60fc7a768
  //@ts-ignore
  intervalId = setInterval(() => {
    // Serve per evitare il timeout
    res.write(`:${EOM}`, CHAR_SET);
    res.flush();
    // Controllo validità sessione
    isSessionValid(token, res, intervalId, id);
  }, 5000);

  const stopWatcher = () => {
    connectedClients = connectedClients.filter((e) => e.id != currentDate);
    logger.info(`User ${user?.username ?? ''} disconnected. . Total connected : ${connectedClients.length}`);
    if (intervalId) {
      clearInterval(intervalId);
    }
  };

  // on Connection Close
  res.on('close', () => stopWatcher());
  res.on('end', () => stopWatcher());
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
