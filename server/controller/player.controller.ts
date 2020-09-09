import { Router, Request, Response, NextFunction } from 'express';
import { logger } from '../core/logger';
import { withAuth, asyncMiddleware, logController } from '../core/middleware';
import { create, deletePlayer, parseBody, listAll, listAllInTournament } from '../manager/player.manager';

const router = Router();
router.use('/', (req: Request, res: Response, next: NextFunction) =>
  logController(req, next, 'Player Controller', '/api/v1/player')
);

router.get(
  '/list/:tId',
  withAuth,
  asyncMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await listAllInTournament(req.params.tId ? parseInt(req.params.tId) : 0);
      return res.json(result);
    } catch (err) {
      return next(err);
    }
  })
);

router.get(
  '/list',
  withAuth,
  asyncMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    try {
      return res.json(await listAll());
    } catch (err) {
      return next(err);
    }
  })
);

router.post(
  '/',
  withAuth,
  asyncMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    const model = req.body;
    try {
      const player = await create(model);
      return res.status(200).json(player);
    } catch (err) {
      return next(err);
    }
  })
);

router.delete(
  '/',
  withAuth,
  asyncMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    const rowsAffected = await deletePlayer(req.body.map((e: any) => parseBody(e)));
    logger.info('player.delete : ', rowsAffected);
    return res.status(200).json({ message: `Rows deleted : ${rowsAffected}` });
  })
);

export default router;
