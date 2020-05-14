import { logger } from '../core/logger';
import { isDevMode } from '../core/debug';
import { Request, Response, NextFunction } from 'express';
import chalk from 'chalk';
import jwt, { TokenExpiredError } from 'jsonwebtoken';
import { getSecret } from '../manager/auth.manager';
import { AppRequest } from 'controller';
import { UserDTO } from 'models/dto/user.dto';

// dev logger
export const routeLogger = (req: Request, res: Response, next: NextFunction) => {
  if (isDevMode()) logger.info(`Serving route : ${chalk.greenBright.bold(req.originalUrl)}`);
  next();
};

// FIXME: Route Not found
export const routeNotFound = (req: Request, res: Response, next: NextFunction) => {
  if (isDevMode()) logger.info(`Requested route ${chalk.redBright.bold(req.originalUrl)} could not be found`);
  next();
};

// Da utilizzare per le funzioni async, altrimenti viene ritornata una Promise
export const asyncMiddleware = (fn: any) => (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Controllo autenticazione. Da utilizzare per tutte le API che richiedono autenticazione
export const withAuth = (req: AppRequest, res: Response, next: NextFunction) => {
  const token = req.cookies.token;
  if (!token || typeof token != 'string') return res.status(401).send('Unauthorized: No token provided');
  const [user, isTokenValid] = safeVerifyToken(token);
  if (isTokenValid && user) {
    // logger.info('withAuth : ', decoded);
    req.user = user;
    next();
  } else {
    logger.error('Unauthorized:  Token Expired ');
    return res.status(401).send('Unauthorized: Invalid token');
  }
};

// wrapper per verificare il token
export const safeVerifyToken = (token: any): [UserDTO | null, boolean] => {
  let decoded = null;
  try {
    decoded = jwt.verify(token, getSecret()) as UserDTO;
    return [decoded, true];
  } catch (error) {
    return [null, false];
  }
};
