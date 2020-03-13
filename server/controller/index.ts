import { Request, Response, Router, Application as ExpressApplication } from 'express';

// controllers
import playerManager from './player.manager';
import pairManager from './pair.manager';
import tournamentManager from './tournament.manager';
import stage1Manager from './stage1.manager';

export default (application: ExpressApplication): Router => {
  const router = Router();
  // API Test
  router.get('/api', (req: Request, res: Response) => res.status(200).send({ message: 'Welcome to endpoint API!' }));
  application.use('/api/v1/player', playerManager);
  application.use('/api/v1/pair', pairManager);
  application.use('/api/v1/tournament', tournamentManager);
  application.use('/api/v1/stage1', stage1Manager);

  return router;
};
