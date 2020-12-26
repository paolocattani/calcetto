import { Application as ExpressApplication, Response, Request } from 'express';

// Controllers
import playerRouter from './player.controller';
import pairRouter from './pair.controller';
import tournamentRouter from './tournament.controller';
import stage1Router from './stage1.controller';
import stage2Router from './stage2.controller';
import authRouter from './auth/auth.controller';
// SSE
import { sessionControl } from '../events/events';
import { HTTPStatusCode } from '../../src/@common/models/HttpStatusCode';
import { withAuth } from '../core/middleware';
import { UserDTO } from '../../src/@common/dto';

export interface AppRequest extends Request {
	user?: UserDTO;
	uuid?: string;
}

export default (application: ExpressApplication): void => {
	// Endpoints
	application.use('/api/v2/tournament', tournamentRouter);
	application.use('/api/v2/player', playerRouter);
	application.use('/api/v1/stage1', stage1Router);
	application.use('/api/v2/stage2', stage2Router);
	application.use('/api/v2/pair', pairRouter);
	application.use('/api/v2/auth', authRouter);

	// SSE
	application.get('/sse/v1/session', withAuth, sessionControl);

	// Coverage
	// @ts-ignore
	application.get('/__coverage__', (req: Request, res: Response) =>
		res.json({ coverage: global.__coverage__ || null })
	);

	// Test
	application.get('/status', (req: Request, res: Response) =>
		res
			.status(HTTPStatusCode.OK)
			.json({ code: HTTPStatusCode.ImATeapot, message: `I ain't gonna brew coffee. I'm a fucking teapot!` })
	);
};
