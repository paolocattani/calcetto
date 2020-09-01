import { Request, Response, NextFunction } from 'express';
import chalk from 'chalk';
import jwt from 'jsonwebtoken';
import { getSecret, isAdmin } from '../manager/auth.manager';
import { AppRequest } from '../controller';
// Models
import User from '../models/sequelize/user.model';
import { UserDTO } from '../models/dto/user.dto';
// Core
import { logger } from '../core/logger';
import { isDevMode } from '../core/debug';

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

// TODO:
export const typeControl = <T extends Request>(req: T, res: Response, next: NextFunction) => {};

// Controllo autenticazione. Da utilizzare per tutte le API che richiedono autenticazione
export const withAuth = async (req: AppRequest, res: Response, next: NextFunction) => {
  const token = req.cookies.token;
  if (!token || typeof token != 'string') return res.status(401).send('Unauthorized: No token provided');
  const [user, isTokenValid] = safeVerifyToken(token);
  if (isTokenValid && user) {
    // Controllo se l'utente esiste ancora a db
    const userDb = await User.findByPk(user.id);
    if (userDb) {
      // logger.info('withAuth : ', decoded);
      req.user = user;
      next();
    }
  } else {
    logger.error('Unauthorized:  Token Expired ');
    return res.status(401).send('Unauthorized: Invalid token');
  }
};

// Controllo se l'utente ha le autorizzazioni di amminstratore, altrimenti picche
export const withAdminRights = (req: AppRequest, res: Response, next: NextFunction) => {
  if (!isAdmin(req.user)) {
    return res.status(401).send('!!! Unauthorized !!! :D');
  } else next();
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

//TODO: Controllo accessi
export const auditControl = (req: Request, res: Response, next: NextFunction) => {
  next();
};
