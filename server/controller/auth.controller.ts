import '../core/env';
import { logger } from '../core/logger';
import { isDevMode, isProductionMode } from '../core/debug';

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
  isValidRegister,
} from '../manager/auth.manager';
import { AppRequest } from './index';
import { HTTPStatusCode } from '../core/HttpStatusCode';
import { AuthenticationResponse } from 'models/client/auth.models';
import { UserMessageType } from '../models/client/common.models';
import { UnexpectedServerError, MissingParamsResponse } from './common';
const router = Router();

const wrongCredentials = {
  user: undefined,
  code: HTTPStatusCode.Unauthorized,
  message: 'Wrong credentials',
  userMessage: {
    type: UserMessageType.Danger,
    message: 'Credenziali errate',
  },
};
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
    res.cookie('token', {
      expires: new Date(Date.now()),
      ...(isProductionMode()
        ? {
            secure: true,
            sameSite: 'none',
          }
        : { httpOnly: true }),
    });
    return res.status(200).json({ message: 'logout complete' });
  })
);

router.post(
  '/register',
  asyncMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    logger.info('/register start ');
    const { body } = req;
    let model: User = parseBody(body);
    // Ripeto i controlli di validità sui dati anche qui in caso siano in qualche modo stati
    // bypassati quelli a FE.
    const isValidMessage = isValidRegister(model);
    if (isValidMessage !== '') {
      res.status(403).json({ message: isValidMessage });
    }
    const user = await checkIfExist(model);
    if (user) {
      return res.status(403).json({ message: 'Email o Username gia utilizzati. ' });
    }
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
      return UnexpectedServerError(res);
    }
  })
);

router.post(
  '/authenticate',
  asyncMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;
    let response: AuthenticationResponse;
    try {
      logger.info('/authenticate start ');
      if (!username || !password) {
        return MissingParamsResponse(res, { user: undefined });
      }
      const user = await findUserByEmailOrUsername(username);

      // utente non trovato
      if (!user) {
        return res.status(HTTPStatusCode.Unauthorized).json(wrongCredentials);
      }
      const isValid = await comparePasswords(user.email, password, user.password);
      if (!isValid) {
        return res.status(HTTPStatusCode.Unauthorized).json(wrongCredentials);
      }

      const userDTO = convertEntityToDTO(user);
      addUserCookies(userDTO, res);
      logger.info('/authenticate end ');
      response = {
        user: userDTO,
        code: HTTPStatusCode.Accepted,
        message: 'Login complete',
        userMessage: {
          type: UserMessageType.Success,
          message: `Benvenuto ${userDTO.name}`,
        },
      };
      return res.status(HTTPStatusCode.Accepted).json(response);
    } catch (error) {
      logger.error('/authenticate error : ', error);
      return UnexpectedServerError(res);
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
      if (!user) return res.status(HTTPStatusCode.BadRequest).json(wrongCredentials);

      if (!(await comparePasswords(email, password, user.password)))
        return res.status(HTTPStatusCode.BadRequest).json(wrongCredentials);

      await deleteUser(user);
      logger.info('/delete end ');
      // FIXME: fix cookie erase
      res.cookie('token', { expires: new Date(Date.now()), httpOnly: true });
      return res.status(HTTPStatusCode.Accepted).json({
        code: HTTPStatusCode.Accepted,
        message: 'User deleted',
        userMessage: {
          type: UserMessageType.Success,
          message: `Utente "${user.name}" eliminato `,
        },
      });
    } catch (error) {
      logger.error('/delete error : ', error);
      return UnexpectedServerError(res);
    }
  })
);

router.get('/checkToken', withAuth, (req, res) => res.sendStatus(HTTPStatusCode.Accepted));

export default router;
