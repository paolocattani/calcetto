// Core
import '../core/env';
import { logger } from '../core/logger';
import { withAuth, asyncMiddleware, controllerLogger } from '../core/middleware';
// Types
import { AppRequest } from './index';
import { Router, Request, Response, NextFunction } from 'express';
// Auth Manager
import {
  convertEntityToDTO,
  parseBody,
  deleteUser,
  comparePasswords,
  registerUser,
  findUserByEmailOrUsername,
  checkIfExist,
  findUserByEmailAndUsername,
  addUserCookies,
  isValidRegister,
  removeUserCookies,
} from '../manager/auth.manager';
// Models
import User from '../database/user.model';
// Common Responses
import { missingParameters, success, failure, entityNotFound, serverError } from './common.response';
// @Commmon
import {
  AuthenticationResponse,
  DeleteUserRequest,
  DeleteUserResponse,
  LoginRequest,
  RegistrationRequest,
  UpdateUserRequest,
} from '../../src/@common/models/auth.model';
import { HTTPStatusCode } from '../../src/@common/models/HttpStatusCode';
import { OmitGeneric, OmitHistory } from '../../src/@common/models/common.models';

const router = Router();

const wrongCredentials = (res: Response) =>
  failure(res, 'Credenziali errate', 'Wrong credentials', HTTPStatusCode.Unauthorized);

router.use('/', (req: Request, res: Response, next: NextFunction) =>
  controllerLogger(req, next, 'Auth Controller', '/api/v2/auth')
);

router.get(
  '/check',
  withAuth,
  asyncMiddleware(async (req: AppRequest, res: Response) => {
    const additional: OmitGeneric<AuthenticationResponse> = { user: req.user };
    return success(res, `Bentornato ${req.user!.name}`, additional);
  })
);

router.get(
  '/logout',
  withAuth,
  asyncMiddleware(async (req: AppRequest, res: Response) => {
    removeUserCookies(res);
    return success(res, 'A presto...');
  })
);

router.post(
  '/register',
  asyncMiddleware(async (req: Request, res: Response) => {
    logger.info('/register start ');
    try {
      const registrationInfo = req.body as OmitHistory<RegistrationRequest>;

      // Ripeto i controlli di validità sui dati anche qui in caso siano in qualche modo stati
      // bypassati quelli a FE.
      const errors = isValidRegister(registrationInfo);
      if (errors.length !== 0) {
        return failure(
          res,
          'Correggi gli errori per procedere con la registrazione',
          'Registration data is not valid',
          HTTPStatusCode.BadRequest,
          { errors }
        );
      }
      const model: User = parseBody(registrationInfo);
      const user = await checkIfExist(model);
      if (user) {
        return failure(
          res,
          'Email o Username gia utilizzati.',
          'Email or Username alrealdy exists.',
          HTTPStatusCode.BadRequest,
          {
            errors: ['Email o Username gia utilizzati.'],
          }
        );
      }
      const record = await registerUser(model, registrationInfo.playerRole);
      if (record) {
        addUserCookies(record, res);
        logger.info('/register end ');
        return success<AuthenticationResponse>(res, `Benvenuto ${record.name}`, { user: record });
      } else {
        throw new Error('Server Error.!');
      }
    } catch (error) {
      return serverError('POST auth/register error ! : ', error, res, {
        // eslint-disable-next-line quotes
        errors: ["Errore server non previsto. E' stata avviata la procedura di autodistruzione."],
      });
    }
  })
);

router.put(
  '/update',
  withAuth,
  asyncMiddleware(async (req: AppRequest, res: Response) => {
    try {
      let model = parseBody(req.body as OmitHistory<UpdateUserRequest>);
      logger.info('/update : ', model);
      const user = await findUserByEmailAndUsername(model.email, model.username);
      if (!user) {
        return entityNotFound(res);
      }
      await user.update(model);
      // TODO: aggiornare anche il giocare associato con i dati comuni
      return success<AuthenticationResponse>(res, 'Aggiornamento effettuato', { user: convertEntityToDTO(user) });
    } catch (error) {
      return serverError('PUT auth/update error ! : ', error, res);
    }
  })
);

router.post(
  '/login',
  asyncMiddleware(async (req: Request, res: Response) => {
    const { username, password } = req.body as OmitHistory<LoginRequest>;
    try {
      logger.info('/login start ');
      if (!username || !password) {
        return missingParameters(res);
      }
      const user = await findUserByEmailOrUsername(username);
      // utente non trovato
      if (!user) {
        return entityNotFound(res);
      }
      const isValid = await comparePasswords(user.email, password, user.password);
      if (!isValid) {
        return wrongCredentials(res);
      }

      const userDTO = convertEntityToDTO(user);
      addUserCookies(userDTO, res);
      return success<AuthenticationResponse>(res, `Benvenuto ${userDTO.name}`, { user: userDTO });
    } catch (error) {
      return serverError('POST auth/login error ! : ', error, res);
    }
  })
);

router.delete(
  '/delete',
  withAuth,
  asyncMiddleware(async (req: AppRequest, res: Response) => {
    const { password } = req.body as OmitHistory<DeleteUserRequest>;
    const { email, username } = req.user!;
    try {
      logger.info('/delete start ');
      const user = await findUserByEmailAndUsername(email, username);
      if (!user) {
        return entityNotFound(res);
      }

      if (!(await comparePasswords(email, password, user.password)))
        return res.status(HTTPStatusCode.BadRequest).json(wrongCredentials);

      await deleteUser(user);
      logger.info('/delete end ');
      removeUserCookies(res);
      return success<DeleteUserResponse>(res, `Utente "${user.name}" eliminato `);
    } catch (error) {
      return serverError('DELETE auth/delete error ! : ', error, res);
    }
  })
);

export default router;
