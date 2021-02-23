import { NextFunction, Response, Request } from 'express';
import { isDevMode } from '../core/debug';
import { logger } from '../core/logger';
import chalk from 'chalk';

//--------- Log route
export const routeLogger = (req: Request, res: Response, next: NextFunction) => {
	if (isDevMode()) logger.info(`Serving route : ${chalk.greenBright.bold(req.originalUrl)}`);
	next();
};

//--------- Log controller name
export const controllerLogger = (req: Request, next: NextFunction, controller: string, path: string) => {
	if (isDevMode()) logger.info(`${controller} Controller : ${req.method} ${req.originalUrl.replace(path, '')} `);
	next();
};
