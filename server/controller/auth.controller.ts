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
import { AuthenticationResponse, LoginRequest } from 'models/client/auth.models';
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
  asyncMiddleware(async (req: AppRequest, res: Response, next: NextFunction) =>
    res.status(HTTPStatusCode.Accepted).json({
      user: req.user,
      code: HTTPStatusCode.Accepted,
      message: 'User is already authenticated',
      userMessage: {
        type: UserMessageType.Success,
        message: `Bentornato ${req.user!.name}`,
      },
    })
  )
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

    // Ripeto i controlli di validità sui dati anche qui in caso siano in qualche modo stati
    // bypassati quelli a FE.
    const errors = isValidRegister(body);
    if (errors.length !== 0) {
      res.status(HTTPStatusCode.BadRequest).json({
        user: undefined,
        errors,
        code: HTTPStatusCode.BadRequest,
        message: 'Registration data is not valid',
        userMessage: {
          type: UserMessageType.Danger,
          message: 'Correggi gli errori per procedere con la registrazione',
        },
      });
    }
    const model: User = parseBody(body);
    const user = await checkIfExist(model);
    if (user) {
      return res.status(HTTPStatusCode.BadRequest).json({
        user: undefined,
        code: HTTPStatusCode.BadRequest,
        errors: ['Email o Username gia utilizzati.'],
        message: 'Email or Username alrealdy exists.',
        userMessage: {
          type: UserMessageType.Danger,
          message: 'Email o Username gia utilizzati.',
        },
      });
    }
    const record = await registerUser(model, body.playerRole);
    if (record) {
      addUserCookies(record, res);
      res.status(HTTPStatusCode.Accepted).json({
        user: record,
        code: HTTPStatusCode.Accepted,
        message: 'Registration complete.',
        userMessage: {
          type: UserMessageType.Success,
          message: `Benvenuto ${record.name}`,
        },
      });
    } else {
      return UnexpectedServerError(res, {
        // eslint-disable-next-line quotes
        errors: ["Errore server non previsto. E' stata avviata la procedura di autodistruzione."],
      });
    }
    logger.info('/register end ');
    return;
  })
);
router.put(
  '/update',
  withAuth,
  asyncMiddleware(async (req: AppRequest, res: Response, next: NextFunction) => {
    try {
      let model = parseBody(req.body);
      logger.info('/update : ', model);
      const user = await findUserByEmailAndUsername(model.email, model.username);
      if (!user) {
        return res.status(HTTPStatusCode.BadRequest).json({
          user: undefined,
          code: HTTPStatusCode.BadRequest,
          message: 'User not found',
          userMessage: {
            type: UserMessageType.Danger,
            message: 'Utente non trovato',
          },
        });
      }
      await user.update(model);
      return res.status(HTTPStatusCode.Accepted).json({
        user: convertEntityToDTO(user),
        code: HTTPStatusCode.Accepted,
        message: 'Update complete',
        userMessage: {
          type: UserMessageType.Success,
          message: 'Aggiornamento effettuato',
        },
      });
    } catch (error) {
      logger.error('/update error : ', error);
      return UnexpectedServerError(res);
    }
  })
);

router.post(
  '/authenticate',
  asyncMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body as LoginRequest;
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
        message: 'Login complete.',
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
        user: undefined,
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
