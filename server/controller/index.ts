import { Router, Application as ExpressApplication } from 'express';

// controllers
import playerRouter from './player.controller';
import pairRouter from './pair.controller';
import tournamentRouter from './tournament.controller';
import stage1Router from './stage1.controller';
import authRouter from './auth.controller';

export default (application: ExpressApplication): Router => {
  const router = Router();

  application.use('/api/v1/player', playerRouter);
  application.use('/api/v1/pair', pairRouter);
  application.use('/api/v1/tournament', tournamentRouter);
  application.use('/api/v1/stage1', stage1Router);
  application.use('/api/v1/auth', authRouter);

  return router;
};
