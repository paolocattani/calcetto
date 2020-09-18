import { Response } from 'express';
import { HTTPStatusCode } from '../../src/@common/models/HttpStatusCode';
import { UserMessageType } from '../../src/@common/models/common.models';

export const ComposeReponse = (
  res: Response,
  status: HTTPStatusCode,
  internalMessage: string,
  messageType: UserMessageType,
  message: string,
  additionalInfo?: Object
) =>
  res.status(status).json({
    ...additionalInfo,
    code: status,
    message: internalMessage,
    userMessage: { type: messageType, message },
  });

export const unauthorized = (res: Response, message: string, internalMessage?: string, additionalInfo?: Object) =>
  ComposeReponse(
    res,
    HTTPStatusCode.Unauthorized,
    internalMessage || 'Unauthorized!',
    UserMessageType.Danger,
    message,
    additionalInfo
  );

export const failure = (
  res: Response,
  message: string,
  internalMessage?: string,
  status?: HTTPStatusCode,
  additionalInfo?: Object
) =>
  ComposeReponse(
    res,
    status || HTTPStatusCode.BadRequest,
    internalMessage || 'Bad Request.',
    UserMessageType.Danger,
    message,
    additionalInfo
  );

export const success = (res: Response, message: string, internalMessage?: string, additionalInfo?: Object) =>
  ComposeReponse(
    res,
    HTTPStatusCode.OK,
    internalMessage || 'Success.',
    UserMessageType.Success,
    message,
    additionalInfo
  );

export const missingParameters = (res: Response, additionalInfo?: Object) =>
  ComposeReponse(
    res,
    HTTPStatusCode.BadRequest,
    'Missing parameters',
    UserMessageType.Danger,
    // eslint-disable-next-line quotes
    "Errore server. Questo l'ho previsto...",
    additionalInfo
  );

export const unexpectedServerError = (res: Response, additionalInfo?: Object) =>
  ComposeReponse(
    res,
    HTTPStatusCode.InternalServerError,
    'Unexpected Server Error',
    UserMessageType.Danger,
    // eslint-disable-next-line quotes
    "Errore server non previsto. E' stata avviata la procedura di autodistruzione.",
    additionalInfo
  );
