import { Response } from 'express';
import { HTTPStatusCode } from '../../src/@common/models/HttpStatusCode';
import {GenericReponse, I18nLabel, OmitGeneric, UserMessageType} from '../../src/@common/models/common.models';
import { logger } from '../core/logger';
import chalk from 'chalk';

export const ComposeReponse = <T extends GenericReponse>(
  res: Response,
  status: HTTPStatusCode,
  internalMessage: string,
  messageType: UserMessageType,
  message: string,
  label:I18nLabel,
  additionalInfo?: OmitGeneric<T>
) => {
  logger.info(`---->  ${status} : ${internalMessage}`);
  return res.status(status).json({
    ...additionalInfo,
    code: status,
    message: internalMessage,
    userMessage: { type: messageType, message },
		label
  });
};

// Unauthorized
export const unauthorized = <T extends GenericReponse>(
  res: Response,
  message: string,
	label:I18nLabel,
  internalMessage?: string,
  additionalInfo?: OmitGeneric<T>
) =>
  ComposeReponse(
    res,
    HTTPStatusCode.Unauthorized,
    internalMessage || 'Unauthorized !',
    UserMessageType.Danger,
    message,
		label,
    additionalInfo
  );
export const forbidden = <T extends GenericReponse>(
  res: Response,
  message: string,
	label:I18nLabel,
  internalMessage?: string,
  additionalInfo?: OmitGeneric<T>
) =>
  ComposeReponse(
    res,
    HTTPStatusCode.Forbidden,
    internalMessage || 'Forbidden !',
    UserMessageType.Danger,
    message,
		label,
    additionalInfo
  );

// Generic error
export const failure = <T extends GenericReponse>(
  res: Response,
  message: string,
	label:I18nLabel,
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
		label,
    additionalInfo
  );

// Success
export const success = <T extends GenericReponse>(res: Response, message: string,  label:I18nLabel,additionalInfo?: OmitGeneric<T>) =>
  ComposeReponse(res, HTTPStatusCode.Success, 'Success', UserMessageType.Success, message, label, additionalInfo);

// Entity Not Found
export const entityNotFound = (res: Response) =>
  failure(res, 'Oggetto non trovato',{message:"",options:{}}, 'Entity not found', HTTPStatusCode.NotFound);

// Missing parameters / data
export const missingParameters = <T extends GenericReponse>(res: Response, additionalInfo?: OmitGeneric<T>) =>
  ComposeReponse(
    res,
    HTTPStatusCode.BadRequest,
    'Missing parameters',
    UserMessageType.Danger,
    // eslint-disable-next-line quotes
    "Errore server. Questo l'ho previsto...",
		{message:"",options:{}},
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
		{ message : "common:server.unexpected" },
		additionalInfo
  );

// Handle server error
export const serverError = <T extends GenericReponse>(
  message: string,
  label:I18nLabel,
  err: any,
  res: Response,
  additionalInfo?: OmitGeneric<T>
) => {
  logger.error(chalk.redBright(message), err);
  return unexpectedServerError(res, additionalInfo);
};
