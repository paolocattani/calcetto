import express, { Application as ExpressApplication, Response, Request, NextFunction } from 'express';

// Models
import { UserDTO } from '../../src/@common/dto';
// Controllers
import playerRouter from './player.controller';
import playerRouterV2 from './v2/player.controller';
import pairRouter from './pair.controller';
import tournamentRouter from './tournament.controller';
import stage1Router from './stage1.controller';
import stage2Router from './stage2.controller';
import authRouter from './auth.controller';
// SSE
import { sessionControl } from '../events/events';
import { HTTPStatusCode } from '../../src/@common/models/HttpStatusCode';

export interface AppRequest extends Request {
  user?: UserDTO;
}
export default (application: ExpressApplication): void => {
  // Endpoints
  application.use('/api/v1/tournament', tournamentRouter);
  application.use('/api/v1/player', playerRouter);
  application.use('/api/v2/player', playerRouterV2);
  application.use('/api/v1/stage1', stage1Router);
  application.use('/api/v1/stage2', stage2Router);
  application.use('/api/v1/pair', pairRouter);
  application.use('/api/v1/auth', authRouter);

  // SSE
  application.get('/sse/v1/session', sessionControl);

  // Locales : Moved to FE
  // application.use('/locales', express.static('../locales'));

  // Test
  application.get('/status', (req: Request, res: Response, next: NextFunction) =>
    // eslint-disable-next-line quotes
    res.status(HTTPStatusCode.OK).json({ code: HTTPStatusCode.OK, message: `What's up? I was sleeping...` })
  );
};
