import { playerManager } from './player';
import { Request, Response, Router } from 'express'

export default (router: Router): Router => {

    // API Test
    router.get('/api', (req: Request, res: Response) => res.status(200).send({
        message: 'Welcome to endpoint API!',
    }));
    // API Test
    router.get('/api/greeting', (req: Request, res: Response) => {
        const name = req.query.name || 'World';
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
    });


    router.post('/api/player', playerManager(router));

    return router;

}