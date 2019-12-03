import { playerManager } from './player';
import { testManager } from './test.manager';
import { Request, Response, Router } from 'express';

export default (router: Router): Router => {

    // API Test
    router.get('/api', (req: Request, res: Response) => res.status(200).send({
        message: 'Welcome to endpoint API!',
    }));
    router.get('/api/greeting', (req: Request, res: Response) => {
        const name = req.query.name || 'World';
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(JSON.stringify({ greeting: `Hello ${name}!` }));
    });
    // API Test

    router.post('/api/player', playerManager(router));


    router.post('/api/player', playerManager(router));

    return router;

}