import { NextFunction, Response, Request } from 'express';
import { Message, SessionStatus } from '../../src/@common/models';
import { AppRequest } from '../controller';
import { safeVerifyToken } from '../controller/auth/auth.utils';
import { unauthorized } from '../controller/common.response';
import { logger } from '../core/logger';
import { User } from '../database/models';
import { isAdmin } from '../manager/auth.manager';
import chalk from 'chalk';
import { asyncMiddleware } from './utils.middleware';

const UNAUTHORIZED = 'common:server.unauthorized';

export const withAuth = asyncMiddleware(async (req: AppRequest, res: Response, next: NextFunction) => {
	try {
		const { jwt, uuid } = req.session;
		if (!jwt || !uuid) {
			logger.error(chalk.redBright('Come back with more cookies...'));
			return unauthorized(res, { key: UNAUTHORIZED });
		}
		const [user, isTokenValid] = safeVerifyToken(jwt);
		if (isTokenValid && user) {
			// Controllo se l'utente esiste ancora a db
			const userDb = await User.findByPk(user.id);
			if (userDb) {
				req.user = user;
				req.uuid = uuid;
				next();
			}
		} else {
			logger.error(chalk.redBright('Token expired...'));
			return unauthorized(res, { key: UNAUTHORIZED });
		}
	} catch (error) {
		logger.error(chalk.redBright('Something went wrong...'));
		return unauthorized(res, { key: UNAUTHORIZED });
	}
});

//--------- Check if user has admin rights
export const withAdminRights = (req: AppRequest, res: Response, next: NextFunction) => {
	if (!isAdmin(req.user)) {
		return unauthorized(res, { key: 'auth:expired' });
	}
	next();
};

//--------- Check authorization for test
export const withTestAuth = (req: AppRequest, res: Response, next: NextFunction) => {
	const { secret } = req.body;
	if (process.env.NODE_ENV !== 'test' || secret !== process.env.SERVER_SECRET) {
		return unauthorized(res, { key: UNAUTHORIZED });
	}
	next();
};

//--------- Audit Control : TODO:
export const auditControl = (req: Request, res: Response, next: NextFunction) => {
	next();
};
