import { Response } from 'express';
import { HTTPStatusCode } from '../../src/@common/models/HttpStatusCode';
import { GenericResponse, I18nLabel, OmitGeneric, UserMessageType } from '../../src/@common/models/common.models';
import { logger } from '../core/logger';
import chalk from 'chalk';

export const ComposeReponse = <T extends GenericResponse>(
	res: Response,
	status: HTTPStatusCode,
	internalMessage: string,
	type: UserMessageType,
	label: I18nLabel,
	additionalInfo?: OmitGeneric<T>
) => {
	logger.info(`---->  ${status} : ${internalMessage}`);
	return res.status(status).json({
		...additionalInfo,
		code: status,
		message: internalMessage,
		userMessage: { type, label },
	});
};

// Unauthorized
export const unauthorized = <T extends GenericResponse>(
	res: Response,
	label: I18nLabel,
	internalMessage?: string,
	additionalInfo?: OmitGeneric<T>
) =>
	ComposeReponse(
		res,
		HTTPStatusCode.Unauthorized,
		internalMessage || 'Unauthorized !',
		UserMessageType.Danger,
		label,
		additionalInfo
	);
export const forbidden = <T extends GenericResponse>(
	res: Response,
	label: I18nLabel,
	internalMessage?: string,
	additionalInfo?: OmitGeneric<T>
) =>
	ComposeReponse(
		res,
		HTTPStatusCode.Forbidden,
		internalMessage || 'Forbidden !',
		UserMessageType.Danger,
		label,
		additionalInfo
	);

// Generic error
export const failure = <T extends GenericResponse>(
	res: Response,
	label: I18nLabel,
	internalMessage?: string,
	status?: HTTPStatusCode,
	additionalInfo?: OmitGeneric<T>
) =>
	ComposeReponse(
		res,
		status || HTTPStatusCode.BadRequest,
		internalMessage || 'Bad Request.',
		UserMessageType.Danger,
		label,
		additionalInfo
	);
export const genericError = <T extends GenericResponse>(res: Response, additionalInfo?: OmitGeneric<T>) =>
	ComposeReponse(
		res,
		HTTPStatusCode.BadRequest,
		'Bad Request.',
		UserMessageType.Danger,
		{ key: 'auth:error.generic' },
		additionalInfo
	);

// Success
export const success = <T extends GenericResponse>(res: Response, label: I18nLabel, additionalInfo?: OmitGeneric<T>) =>
	ComposeReponse(res, HTTPStatusCode.OK, 'Success', UserMessageType.Success, label, additionalInfo);

// Entity Not Found
export const entityNotFound = (res: Response) =>
	failure(res, { key: 'common:server.not_found' }, 'Entity not found', HTTPStatusCode.NotFound);

// Missing parameters / data
export const missingParameters = <T extends GenericResponse>(res: Response, additionalInfo?: OmitGeneric<T>) =>
	ComposeReponse(
		res,
		HTTPStatusCode.BadRequest,
		'Missing parameters',
		UserMessageType.Danger,
		{ key: '' },
		additionalInfo
	);

// Server error
export const unexpectedServerError = <T extends GenericResponse>(res: Response, additionalInfo?: OmitGeneric<T>) =>
	ComposeReponse(
		res,
		HTTPStatusCode.InternalServerError,
		'Unexpected Server Error',
		UserMessageType.Danger,
		{ key: 'common:server.unexpected' },
		additionalInfo
	);

// Handle server error
export const serverError = <T extends GenericResponse>(
	message: string,
	err: any,
	res: Response,
	additionalInfo?: OmitGeneric<T>
) => {
	logger.error(chalk.redBright(message), err);
	return unexpectedServerError(res, additionalInfo);
};
