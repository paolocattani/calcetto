import { logger } from '../core/logger';
import { isDevMode } from '../core/debug';
import { Request, Response, NextFunction } from 'express';
import chalk from 'chalk';
// Auth middleware
export const secured = (req: Request, res: Response, next: NextFunction) => {
  if (req.user || req.path == '/') return next();
  if (isDevMode()) logger.info(`This is a secure route, redirect to login`);
  req.session!.returnTo = req.originalUrl;
  res.redirect(`/login`);
};

// dev logger
export const routeLogger = (req: Request, res: Response, next: NextFunction) => {
  if (isDevMode()) logger.info(`Serving route : ${req.originalUrl}`);
  next();
};

// Route Not found
export const routeNotFound = (req: Request, res: Response, next: NextFunction) => {
  if (isDevMode()) logger.info(`Requested route ${chalk.redBright.bold(req.originalUrl)} could not be found`);
  next();
};
