import { Response, NextFunction } from 'express';
// Controllers
import { AppRequest } from 'controller';
// Core
import { logger, logProcess } from '../core/logger';
import { asyncMiddleware, safeVerifyToken } from '../core/middleware';
import { DEFAULT_HEADERS, EOM, CHAR_SET } from './Constants';
import { SessionStatus, Message } from './types';

const className = 'Session Events : ';

export const sessionControl = asyncMiddleware(async (req: AppRequest, res: Response, next: NextFunction) => {
  logProcess(className + 'sessionControl', 'start');
  req.socket.setTimeout(500000);
  const token = req.cookies.token;
  // Se è presente il token ed è valido registro questo client
  let intervalId: NodeJS.Timeout | null = null;
  let [user, isTokenValid] = safeVerifyToken(token);
  if (!isTokenValid) {
    logger.error('No valid token found. Aborting...');
    return;
  }

  // Apro connessione
  res.writeHead(200, DEFAULT_HEADERS);
  // https://gist.github.com/akirattii/257d7efc8430c7e3fd0b4ec60fc7a768
  // Controllo ogni minuto se il token è ancora valido
  intervalId = setInterval(() => {
    logProcess(className + 'sessionControl', `Verify token for user ${user ? user.username : ''}`);
    [user, isTokenValid] = safeVerifyToken(token);
    if (!isTokenValid) {
      // Se il token non è piu valido informo il client,chiudo la connessione e interropondo il ciclo di controllo
      logger.info(`${user?.username ?? ''} token expired ... `);
      if (intervalId) clearInterval(intervalId);
      const message: Message = {
        status: SessionStatus.SESSION_EXPIRED,
      };
      res.write(`data:${JSON.stringify(message)}${EOM}`, CHAR_SET);
      res.flush();
      setTimeout(() => res.end(), 5000);
    } else {
      // Serve per evitare il timeout
      res.write(`:${EOM}`, CHAR_SET);
      res.flush();
    }
    // logger.info('Response : ', res);
  }, 5000);

  res.on('close', () => {
    // Se la connessione viene interrotta dal ciente interrompo il controllo
    logger.info(`User ${user?.username ?? ''} disconnected... : `, intervalId);
    if (intervalId) clearInterval(intervalId);
  });

  logProcess(className + 'sessionControl', 'End');
});
