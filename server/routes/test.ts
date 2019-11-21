import { Application as ExpressApplication, Request, Response } from 'express';

export default (application: ExpressApplication) => {
    application.get('/api', (req: Request, res: Response) =>
        res.status(200).send({ message: 'Welcome to endpoint API /test!' })
    );
}