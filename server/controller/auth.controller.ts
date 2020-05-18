import '../core/env';
import { logger } from '../core/logger';
import { isDevMode } from '../core/debug';

import { Router, Request, Response, NextFunction } from 'express';
import User from '../models/sequelize/user.model';
import { withAuth, asyncMiddleware } from '../core/middleware';

import {
  convertEntityToDTO,
  parseBody,
  deleteUser,
  comparePasswords,
  listAll,
  registerUser,
  findUserByEmailOrUsername,
  checkIfExist,
  findUserByEmailAndUsername,
  addUserCookies,
} from '../manager/auth.manager';
import { AppRequest } from './index';
const router = Router();

router.use('/', (req: Request, res: Response, next: NextFunction) => {
  if (isDevMode()) logger.info(`Auth Controller : ${req.method} ${req.originalUrl.replace('/api/v1/auth', '')} `);
  next();
});

router.get(
  '/list',
  withAuth,
  asyncMiddleware(async (req: AppRequest, res: Response, next: NextFunction) => res.status(200).json(await listAll()))
);

router.get(
  '/',
  withAuth,
  asyncMiddleware(async (req: AppRequest, res: Response, next: NextFunction) => res.status(200).json(req.user))
);

router.get(
  '/logout',
  withAuth,
  asyncMiddleware(async (req: AppRequest, res: Response, next: NextFunction) => {
    res.cookie('token', { expires: new Date(Date.now()), httpOnly: true });
    return res.status(200).json({ message: 'logout complete' });
  })
);

router.post(
  '/register',
  asyncMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    logger.info('/register start ');
    const { body } = req;
    let model: User = parseBody(body);
    const user = await checkIfExist(model);
    if (user) return res.status(403).json({ message: 'Email o Username gia utilizzati. ' });
    const record = await registerUser(model, body.playerRole);
    if (record) {
      addUserCookies(record, res);
      res.status(200).json(record);
    } else {
      res.status(500).json({ message: 'Internal error' });
    }
    logger.info('/register end ');
    return;
  })
);
router.post(
  '/update',
  withAuth,
  asyncMiddleware(async (req: AppRequest, res: Response, next: NextFunction) => {
    try {
      let model = parseBody(req.body);
      const user = await findUserByEmailAndUsername(model.email, model.username);
      if (!user) {
        return res.status(500).json({ error: 'Utente non trovato' });
      }
      await user.update(model);
      return res.status(200).json(user);
    } catch (error) {
      logger.error('/update error : ', error);
      return res.status(500).json({ error: 'Internal error please try again' });
    }
  })
);

router.post(
  '/authenticate',
  asyncMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;
    try {
      logger.info('/authenticate start ');
      if (!username || !password) return res.status(401).json({ error: 'Missing email or password' });

      const user = await findUserByEmailOrUsername(username);

      // utente non trovato
      if (!user) return res.status(401).json({ error: 'Incorrect email or password' });

      if (!(await comparePasswords(user.email, password, user.password)))
        return res.status(401).json({ error: 'Incorrect email or password' });

      const userDTO = convertEntityToDTO(user);
      addUserCookies(userDTO, res);
      logger.info('/authenticate end ');
      return res.status(200).json(userDTO);
    } catch (error) {
      logger.error('/authenticate error : ', error);
      return res.status(500).json({ error: 'Internal error please try again' });
    }
  })
);

router.delete(
  '/',
  withAuth,
  asyncMiddleware(async (req: AppRequest, res: Response, next: NextFunction) => {
    const { password } = req.body;
    const { email, username } = req.user!;
    try {
      logger.info('/delete start ');
      const user = await findUserByEmailAndUsername(email, username);
      if (!user) return res.status(500).json({ message: 'Utente non trovato' });

      if (!(await comparePasswords(email, password, user.password)))
        return res.status(401).json({ error: 'Incorrect email or password' });

      await deleteUser(user);
      logger.info('/delete end ');
      res.cookie('token', { expires: new Date(Date.now()), httpOnly: true });
      return res.status(200).json({ message: 'Utente eliminato' });
    } catch (error) {
      logger.error('/delete error : ', error);
      return res.status(500).json({ message: 'Errore durante fase di cancellazione' });
    }
  })
);

router.get('/checkToken', withAuth, (req, res) => res.sendStatus(200));

export default router;
