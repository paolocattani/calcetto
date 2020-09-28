import express, { Application as ExpressApplication, Response, Request, NextFunction } from 'express';

// Models
import { UserDTO } from '../../src/@common/dto';
// Controllers
import playerRouter from './player.controller';
import pairRouter from './pair.controller';
import tournamentRouter from './tournament.controller';
import stage1Router from './stage1.controller';
import stage2Router from './stage2.controller';
import authRouter from './auth.controller';
// SSE
import { sessionControl } from '../events/events';
import { HTTPStatusCode } from '../../src/@common/models/HttpStatusCode';
import { withAuth } from '../core/middleware';

export interface AppRequest extends Request {
  user?: UserDTO;
}
export default (application: ExpressApplication): void => {
  // Endpoints
  application.use('/api/v2/tournament', tournamentRouter);
  application.use('/api/v2/player', playerRouter);
  application.use('/api/v1/stage1', stage1Router);
  application.use('/api/v1/stage2', stage2Router);
  application.use('/api/v1/pair', pairRouter);
  application.use('/api/v2/auth', authRouter);

  // SSE
  application.get('/sse/v1/session', withAuth, sessionControl);

  // Test
  application.get('/status', (req: Request, res: Response, next: NextFunction) =>
    // eslint-disable-next-line quotes
    res
      .status(HTTPStatusCode.OK)
      // eslint-disable-next-line quotes
      .json({ code: HTTPStatusCode.ImATeapot, message: `I'm not going to brew coffee, I'm a fucking teapot!` })
  );
};
