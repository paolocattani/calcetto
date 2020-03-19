import '../core/env';
import { logger } from '../core/logger';
import { isDevMode } from '../core/debug';

import { Router, Request, Response, NextFunction } from 'express';
import User from '../model/sequelize/user.model';
import { generatePassword, comparePasswords, generateToken, getSecret } from '../core/utils';
import { withAuth, asyncMiddleware } from '../core/middleware';
import jwt from 'jsonwebtoken';

const router = Router();

router.use('/', (req, res, next) => {
  if (isDevMode()) logger.info(`Auth Manager : ${req.method} ${req.originalUrl.replace('/api/v1/auth', '')} `);
  next();
});

// FIXME: fix request type
router.get(
  '/list',
  withAuth,
  asyncMiddleware(async (req: any, res: Response, next: NextFunction) => {
    const usersList = await User.findAll();
    const users = usersList.map(user => convertToDTO(user));
    if (users) return res.status(200).json(users);
    else return res.status(401).json({ message: 'Utenti non trovati' });
  })
);

// FIXME: fix request type
router.get(
  '/',
  withAuth,
  asyncMiddleware(async (req: any, res: Response, next: NextFunction) => {
    if (!req.email) {
      next();
      return;
    }
    const user = await findUserByEmail(req.email);
    if (user) return res.status(200).json(convertToDTO(user));
    else return res.status(401).json({ message: 'Utente non trovato' });
  })
);

router.get(
  '/logout',
  withAuth,
  asyncMiddleware(async (req: any, res: Response, next: NextFunction) => {
    if (!req.email) {
      next();
      return;
    }
    res.cookie('token', { expires: new Date(Date.now()), httpOnly: true });
    return res.status(200).json({ message: 'logout complete' });
  })
);

router.post(
  '/register',
  asyncMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    let model: User = req.body;
    model.password = await generatePassword(model.email, model.password);

    if (model.name.startsWith('[A]')) {
      model.name = model.name.substring(3);
      model.role = 'Admin';
    } else {
      model.role = 'User';
    }
    if (req.body.name.startsWith) logger.info('model :', model);
    try {
      const password = await generatePassword(model.name, model.password);
      const [record, created] = await User.findOrCreate({
        where: {
          email: model.email,
          password
        },
        defaults: model
      });
      logger.info('record :', record);
      return res.status(200).json(convertToDTO(record));
    } catch (error) {
      logger.error('/register error : ', error);
      return res.status(500).json({ error: 'Internal error please try again' });
    }
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
      return res.status(200).json(convertToDTO(user));
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

      await user.destroy();
      res.cookie('token', { expires: new Date(Date.now()), httpOnly: true });
      return res.status(200).json({ message: 'Utente eliminato' });
    } catch (error) {
      return res.status(500).json({ message: 'Errore durante fase di cancellazione' });
    }
  })
);

router.get('/checkToken', withAuth, (req, res) => res.sendStatus(200));

export default router;

// Utils
export function isAdmin(token: string | object): boolean {
  let isAdmin: boolean = false;
  if (token && typeof token === 'string') {
    const decodedUser = jwt.verify(token, getSecret()) as User;
    if (decodedUser.role === 'Admin') isAdmin = true;
  }
  return isAdmin;
}

export async function getUserFromToken(token: string | object): Promise<User | null> {
  if (token && typeof token === 'string') {
    const decodedUser = jwt.verify(token, getSecret()) as User;
    return decodedUser.email ? await findUserByEmail(decodedUser.email) : decodedUser;
  } else return null;
}

export async function findUserByEmail(email: string) {
  try {
    return await User.findOne({ where: { email } });
  } catch (error) {
    return null;
  }
}

export const convertToDTO = (user: User) => ({
  name: user.name,
  surname: user.surname,
  email: user.email,
  label: user.label,
  role: user.role
});
