import { logger } from '../core/logger';
import { isDevMode } from '../core/debug';
import { Request, Response, NextFunction } from 'express';
import chalk from 'chalk';
import jwt, { TokenExpiredError } from 'jsonwebtoken';
import { getSecret } from '../manager/auth';

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

// FIXME: fix request type
export const withAuth = (req: any, res: Response, next: NextFunction) => {
  const token = req.cookies.token;
  try {
    if (!token || typeof token != 'string') return res.status(401).send('Unauthorized: No token provided');
    const decoded: any = jwt.verify(token, getSecret());
    // logger.info('withAuth : ', decoded);
    req.user = decoded;
    next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      logger.error('Unauthorized:  Token Expires ');
      return res.status(401).send('Unauthorized: Invalid token');
    }
    return res.status(500).send('Unhandled Authentication Error');
  }
};
