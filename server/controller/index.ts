import { Request, Response, Router } from 'express';

// controllers
import { playerManager } from './player';
import { tournamentManager } from './tournament';

export default (router: Router): Router => {
  // API Test
  router.get('/api', (req: Request, res: Response) => res.status(200).send({ message: 'Welcome to endpoint API!' }));
  // player API
  router.post('/api/player', playerManager(router));

  // tournament API
  router.use('/api/tournament', tournamentManager(router));

  return router;
};
