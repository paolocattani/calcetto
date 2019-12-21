import { Request, Response, Router } from 'express';

// controllers
import { playerManager } from './player';
import { tournamentManager } from './tournament';

export default (router: Router): Router => {
  // API Test
  router.get('/api', (req: Request, res: Response) =>
    res.status(200).send({
      message: 'Welcome to endpoint API!'
    })
  );
  router.get('/api/greeting', (req: Request, res: Response) => {
    const name = req.query.name || 'World';
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify({ greeting: `Hello ${name}!` }));
  });
  // API Test

  // player API
  router.post('/api/player', playerManager(router));

  // tournament API
  router.use('/api/tournament', tournamentManager(router));

  return router;
};
