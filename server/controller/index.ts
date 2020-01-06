import { Request, Response, Router, Application as ExpressApplication } from 'express';

// controllers
import { playerManager } from './player';
import tournamentManager from './tournament';

export default (application: ExpressApplication): Router => {
  const router = Router();
  // API Test
  router.get('/api', (req: Request, res: Response) => res.status(200).send({ message: 'Welcome to endpoint API!' }));
  // player API
  router.post('/api/player', playerManager(router));

  // tournament API
  application.use('/api/tournament', tournamentManager);

  return router;
};
