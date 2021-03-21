// Express
import { Application as ExpressApplication, Response, Request, Router, NextFunction } from 'express';
// Controllers
import playerRouter from './player.controller';
import pairRouter from './pair.controller';
import tournamentRouter from './tournament.controller';
import stage1Router from './stage1.controller';
import stage2Router from './stage2.controller';
import authRouter from './auth/auth.controller';
import statsRouter from './stats.controller';
// mddleware
import { controllerLogger } from '../middleware';
// DTO
import { HTTPStatusCode } from '@common/models/HttpStatusCode';
import { UserDTO } from '@common/dto';

export interface AppRequest extends Request {
	user?: UserDTO;
	uuid?: string;
}

type Controller = {
	api: string;
	name: string;
	router: Router;
};

export default (application: ExpressApplication): void => {
	// Endpoints
	const controller: Array<Controller> = [
		{ name: 'Pair', api: '/api/v2/Pair', router: pairRouter },
		{ name: 'Auth', api: '/api/v2/auth', router: authRouter },
		{ name: 'Stats', api: '/api/v2/stats', router: statsRouter },
		{ name: 'Player', api: '/api/v2/player', router: playerRouter },
		{ name: 'Stage1', api: '/api/v2/stage1', router: stage1Router },
		{ name: 'Stage2', api: '/api/v2/stage2', router: stage2Router },
		{ name: 'Tournament', api: '/api/v2/tournament', router: tournamentRouter },
	];
	controller.forEach((c) => {
		application.use(
			c.api,
			(req: Request, res: Response, next: NextFunction) => controllerLogger(req, next, c.name, c.api),
			c.router
		);
	});

	// Check if server is alive
	application.get('/status', (req: Request, res: Response) =>
		res
			.status(HTTPStatusCode.OK)
			// eslint-disable-next-line quotes
			.json({ code: HTTPStatusCode.ImATeapot, message: "I ain't gonna brew coffee. I'm a fucking teapot!" })
	);

	// FIXME: Coverage
	application.get('/__coverage__', (req: Request, res: Response) =>
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		res.json({ coverage: global.__coverage__ || null })
	);
};
