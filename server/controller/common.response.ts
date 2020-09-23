import { Response } from 'express';
import { HTTPStatusCode } from '../../src/@common/models/HttpStatusCode';
import { GenericReponse, OmitGeneric, UserMessageType } from '../../src/@common/models/common.models';
import { logger } from '../core/logger';
import chalk from 'chalk';

export const ComposeReponse = <T extends GenericReponse>(
  res: Response,
  status: HTTPStatusCode,
  internalMessage: string,
  messageType: UserMessageType,
  message: string,
  additionalInfo?: OmitGeneric<T>
) =>
  res.status(status).json({
    ...additionalInfo,
    code: status,
    message: internalMessage,
    userMessage: { type: messageType, message },
  });

// Unauthorized
export const unauthorized = <T extends GenericReponse>(
  res: Response,
  message: string,
  internalMessage?: string,
  additionalInfo?: OmitGeneric<T>
) =>
  ComposeReponse(
    res,
    HTTPStatusCode.Unauthorized,
    internalMessage || 'Unauthorized!',
    UserMessageType.Danger,
    message,
    additionalInfo
  );

// Generic error
export const failure = <T extends GenericReponse>(
  res: Response,
  message: string,
  internalMessage?: string,
  status?: HTTPStatusCode,
  additionalInfo?: OmitGeneric<T>
) =>
  ComposeReponse(
    res,
    status || HTTPStatusCode.BadRequest,
    internalMessage || 'Bad Request.',
    UserMessageType.Danger,
    message,
    additionalInfo
  );

// Success
export const success = <T extends GenericReponse>(res: Response, message: string, additionalInfo?: OmitGeneric<T>) =>
  ComposeReponse(res, HTTPStatusCode.OK, 'Success', UserMessageType.Success, message, additionalInfo);

// Entity Not Found
export const entityNotFound = (res: Response) =>
  failure(res, 'Oggetto non trovato', 'Entity not found', HTTPStatusCode.NotFound);

// Missing parameters / data
export const missingParameters = <T extends GenericReponse>(res: Response, additionalInfo?: OmitGeneric<T>) =>
  ComposeReponse(
    res,
    HTTPStatusCode.BadRequest,
    'Missing parameters',
    UserMessageType.Danger,
    // eslint-disable-next-line quotes
    "Errore server. Questo l'ho previsto...",
    additionalInfo
  );

// Server error
export const unexpectedServerError = <T extends GenericReponse>(res: Response, additionalInfo?: OmitGeneric<T>) =>
  ComposeReponse(
    res,
    HTTPStatusCode.InternalServerError,
    'Unexpected Server Error',
    UserMessageType.Danger,
    // eslint-disable-next-line quotes
    "Errore server non previsto. E' stata avviata la procedura di autodistruzione.",
    additionalInfo
  );

// Handle server error
export const serverError = <T extends GenericReponse>(
  message: string,
  err: any,
  res: Response,
  additionalInfo?: OmitGeneric<T>
) => {
  logger.error(chalk.redBright(message), err);
  return unexpectedServerError(res, additionalInfo);
};
