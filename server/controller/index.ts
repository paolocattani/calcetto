import { Router, Application as ExpressApplication, Request } from 'express';

// Models
import { UserDTO } from '../models/dto/user.dto';
// Controllers
import playerRouter from './player.controller';
import pairRouter from './pair.controller';
import tournamentRouter from './tournament.controller';
import stage1Router from './stage1.controller';
import stage2Router from './stage2.controller';
import authRouter from './auth.controller';
// SSE
import { sessionControl } from '../events/session.events';

export interface AppRequest extends Request {
  user?: UserDTO;
}
export default (application: ExpressApplication): void => {
  application.use('/api/v1/tournament', tournamentRouter);
  application.use('/api/v1/player', playerRouter);
  application.use('/api/v1/stage1', stage1Router);
  application.use('/api/v1/stage2', stage2Router);
  application.use('/api/v1/pair', pairRouter);
  application.use('/api/v1/auth', authRouter);

  application.get('/sse/v1/session', sessionControl);
};
