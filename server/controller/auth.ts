import '../core/env';
import { logger } from '../core/logger';
import { isDevMode } from '../core/debug';

import { Router, Request, Response, NextFunction } from 'express';
import User from '../model/sequelize/user.model';
import { withAuth, asyncMiddleware } from '../core/middleware';

import {
  findUserByEmail,
  convertEntityToDTO,
  parseBody,
  deleteUser,
  generatePassword,
  comparePasswords,
  generateToken,
  listAll,
  registerUser
} from '../manager/auth';
const router = Router();

router.use('/', (req, res, next) => {
  if (isDevMode()) logger.info(`Auth Manager : ${req.method} ${req.originalUrl.replace('/api/v1/auth', '')} `);
  next();
});

router.get(
  '/list',
  withAuth,
  // FIXME: fix request type
  asyncMiddleware(async (req: any, res: Response, next: NextFunction) => res.status(200).json(await listAll()))
);

router.get(
  '/',
  withAuth,
  // FIXME: fix request type
  asyncMiddleware(async (req: any, res: Response, next: NextFunction) =>
    res.status(200).json(await findUserByEmail(req.email))
  )
);

router.get(
  '/logout',
  withAuth,
  asyncMiddleware(async (req: any, res: Response, next: NextFunction) => {
    // FIXME: logout
    res.cookie('token', { expires: new Date(Date.now()), httpOnly: true });
    return res.status(200).json({ message: 'logout complete' });
  })
);

router.post(
  '/register',
  asyncMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    const { body } = req;
    let model: User = parseBody(body);
    const user = await findUserByEmail(model.email);
    if (user) return res.status(500).json({ message: 'Email gia registrata. ' });
    const record = registerUser(model, body.playerRole);
    return res.status(200).json(record);
  })
);

router.post(
  '/authenticate',
  asyncMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    try {
      logger.info('/authenticate : ', email, password);
      const user = await findUserByEmail(email);

      // utente non trovato
      if (!user) return res.status(401).json({ error: 'Incorrect email or password' });

      if (!(await comparePasswords(email, password, user.password)))
        return res.status(401).json({ error: 'Incorrect email or password' });

      res.cookie('token', generateToken(user), { httpOnly: true });
      return res.status(200).json(convertEntityToDTO(user));
    } catch (error) {
      logger.error('/authenticate error : ', error);
      return res.status(500).json({ error: 'Internal error please try again' });
    }
  })
);

router.delete(
  '/',
  withAuth,
  asyncMiddleware(async (req: any, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    try {
      logger.info('/authenticate : ', email, password);
      const user = await findUserByEmail(email);
      if (!user) return res.status(500).json({ message: 'Utente non trovato' });

      if (!(await comparePasswords(email, password, user.password)))
        return res.status(401).json({ error: 'Incorrect email or password' });

      deleteUser(user);
      res.cookie('token', { expires: new Date(Date.now()), httpOnly: true });
      return res.status(200).json({ message: 'Utente eliminato' });
    } catch (error) {
      return res.status(500).json({ message: 'Errore durante fase di cancellazione' });
    }
  })
);

router.get('/checkToken', withAuth, (req, res) => res.sendStatus(200));

export default router;
