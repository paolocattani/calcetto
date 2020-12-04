import { Request, Response, NextFunction } from 'express';
import chalk from 'chalk';
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET, isAdmin, getToken } from '../manager/auth.manager';
import { AppRequest } from '../controller';
// Models
import { User } from '../database';
import { UserDTO } from '../../src/@common/dto';
// Core
import { logger } from '../core/logger';
import { isDevMode } from '../core/debug';
import { unauthorized } from '../controller/common.response';

// dev logger
export const routeLogger = (req: Request, res: Response, next: NextFunction) => {
	if (isDevMode()) logger.info(`Serving route : ${chalk.greenBright.bold(req.originalUrl)}`);
	next();
};

export const controllerLogger = (req: Request, next: NextFunction, controller: string, path: string) => {
	if (isDevMode()) logger.info(`${controller} : ${req.method} ${req.originalUrl.replace(path, '')} `);
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
	const token = getToken(req);
	if (!token || typeof token != 'string') {
		logger.error(chalk.redBright('Token not found : '), token);
		return unauthorized(res, { label: 'common:server.unauthorize' });
	}
	const [user, isTokenValid] = safeVerifyToken(token);
	if (isTokenValid && user) {
		// Controllo se l'utente esiste ancora a db
		const userDb = await User.findByPk(user.id);
		if (userDb) {
			req.user = user;
			next();
		}
	} else {
		logger.error(chalk.redBright('Unauthorized:  Token Expired '));
		return unauthorized(res, { label: 'auth:expired' });
	}
};

// Controllo se l'utente ha le autorizzazioni di amminstratore, altrimenti picche
export const withAdminRights = (req: AppRequest, res: Response, next: NextFunction) => {
	if (!isAdmin(req.user)) {
		return unauthorized(res, { label: 'auth:expired' });
	} else next();
};

// wrapper per verificare il token
export const safeVerifyToken = (token: any): [UserDTO | null, boolean] => {
	let decoded = null;
	try {
		decoded = jwt.verify(token, TOKEN_SECRET) as UserDTO;
		return [decoded, true];
	} catch (error) {
		return [null, false];
	}
};

//TODO: Controllo accessi
export const auditControl = (req: Request, res: Response, next: NextFunction) => {
	next();
};
