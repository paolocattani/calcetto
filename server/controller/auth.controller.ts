import '../core/env';
import { logger } from '../core/logger';
import { isProductionMode } from '../core/debug';

import { Router, Request, Response, NextFunction } from 'express';
import User from '../models/sequelize/user.model';
import { withAuth, asyncMiddleware, logController } from '../core/middleware';

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
import { LoginRequest } from 'models/client/auth.models';
import { UserMessageType } from '../models/client/common.models';
import { unexpectedServerError, missingParameters, success, failure } from './common';
const router = Router();

const wrongCredentials = (res: Response) =>
  failure(res, 'Credenziali errate', 'Wrong credentials', HTTPStatusCode.Unauthorized, { user: undefined });

router.use('/', (req: Request, res: Response, next: NextFunction) =>
  logController(req, next, 'Auth Controller', '/api/v1/auth')
);

router.get(
  '/list',
  withAuth,
  asyncMiddleware(async (req: AppRequest, res: Response, next: NextFunction) => res.status(200).json(await listAll()))
);

router.get(
  '/',
  withAuth,
  asyncMiddleware(async (req: AppRequest, res: Response, next: NextFunction) =>
    success(res, `Bentornato ${req.user!.name}`, 'User is already authenticated', { user: req.user })
  )
);

router.get(
  '/logout',
  withAuth,
  asyncMiddleware(async (req: AppRequest, res: Response, next: NextFunction) => {
    //FIXME:
    res.cookie('token', {
      expires: new Date(Date.now()),
      ...(isProductionMode()
        ? {
            secure: true,
            sameSite: 'none',
          }
        : { httpOnly: true }),
    });
    return success(res, 'A presto...', 'Logout complete.', { user: undefined });
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
      return failure(
        res,
        'Correggi gli errori per procedere con la registrazione',
        'Registration data is not valid',
        HTTPStatusCode.BadRequest,
        { user: undefined, errors }
      );
    }
    const model: User = parseBody(body);
    const user = await checkIfExist(model);
    if (user) {
      return failure(
        res,
        'Email o Username gia utilizzati.',
        'Email or Username alrealdy exists.',
        HTTPStatusCode.BadRequest,
        {
          user: undefined,
          errors: ['Email o Username gia utilizzati.'],
        }
      );
    }
    const record = await registerUser(model, body.playerRole);
    if (record) {
      addUserCookies(record, res);
      logger.info('/register end ');
      return success(res, `Benvenuto ${record.name}`, 'Registration complete.');
    } else {
      return unexpectedServerError(res, {
        // eslint-disable-next-line quotes
        errors: ["Errore server non previsto. E' stata avviata la procedura di autodistruzione."],
      });
    }
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
        return failure(res,'Utente non trovato','User not found');
      }
      await user.update(model);
      return success(res, 'Aggiornamento effettuato', 'Update complete.', { user: convertEntityToDTO(user) });
    } catch (error) {
      logger.error('/update error : ', error);
      return unexpectedServerError(res);
    }
  })
);

router.post(
  '/authenticate',
  asyncMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body as LoginRequest;
    try {
      logger.info('/authenticate start ');
      if (!username || !password) {
        return missingParameters(res, { user: undefined });
      }
      const user = await findUserByEmailOrUsername(username);

      // utente non trovato
      if (!user) {
        return wrongCredentials(res);
      }
      const isValid = await comparePasswords(user.email, password, user.password);
      if (!isValid) {
        return wrongCredentials(res);
      }

      const userDTO = convertEntityToDTO(user);
      addUserCookies(userDTO, res);
      logger.info('/authenticate end ');
      return success(res, `Benvenuto ${userDTO.name}`, 'Login complete.', { user: userDTO });
    } catch (error) {
      logger.error('/authenticate error : ', error);
      return unexpectedServerError(res);
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
      return success(res, `Utente "${user.name}" eliminato `, 'User deleted', { user: undefined });
    } catch (error) {
      logger.error('/delete error : ', error);
      return unexpectedServerError(res);
    }
  })
);

router.get('/checkToken', withAuth, (req, res) => res.sendStatus(HTTPStatusCode.Accepted));

export default router;
