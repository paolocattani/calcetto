import { Response } from 'express';
import { HTTPStatusCode } from '../core/HttpStatusCode';
import { UserMessageType } from '../models/client/common.models';

export const MissingParamsResponse = (res: Response, additionalInfo?: Object) =>
  res.status(HTTPStatusCode.BadRequest).json({
    ...additionalInfo,
    code: HTTPStatusCode.BadRequest,
    message: 'Missing parameters',
    userMessage: {
      type: UserMessageType.Danger,
      // eslint-disable-next-line quotes
      message: "Errore server. Questo l'ho previsto...",
    },
  });

export const UnexpectedServerError = (res: Response, additionalInfo?: Object) =>
  res.status(HTTPStatusCode.InternalServerError).json({
    ...additionalInfo,
    code: HTTPStatusCode.InternalServerError,
    message: 'Unexpected Server Error',
    userMessage: {
      type: UserMessageType.Danger,
      // eslint-disable-next-line quotes
      message: "Errore server non previsto. E' stata avviata la procedura di autodistruzione.",
    },
  });
