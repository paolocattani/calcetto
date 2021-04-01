// Cookies
import { UserDTO } from '@common/dto';
import { v5 as uuidv5 } from 'uuid';
import jwt from 'jsonwebtoken';
import 'express-session';
import { CookieOptions, Response, Request } from 'express';
import { isProductionMode } from '@common/utils/env.utils';
import { TOKEN_SECRET } from './auth.utils';
import { logger } from '@core/logger';

export const SESSION_ID = 'session_id';

// Generate JWT Token
const DEFAULT_TOKEN_EXPIRATION = '8h';
const TOKEN_EXPIRATION = process.env.SERVER_TOKEN_EXPIRES_IN || DEFAULT_TOKEN_EXPIRATION;
const generateUuid = (user: UserDTO) => uuidv5(user.id.toString(), '48990e20-7e42-4f0c-97e0-c64456d5bc71');
const generateToken = (value: UserDTO) =>
	jwt.sign({ ...value }, TOKEN_SECRET, {
		expiresIn: TOKEN_EXPIRATION,
		algorithm: 'HS256',
	});

/**
 * Source : https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies
 * cookiesOption
 */
export const cookiesOption: CookieOptions = {
	// 2h : Allineare a process.env.SERVER_TOKEN_EXPIRES_IN
	maxAge: 2 * 60 * 60 * 1000,
	/*
		A cookie with the HttpOnly attribute is inaccessible to the JavaScript Document.cookie API; it is sent only to the server.
		For example, cookies that persist server-side sessions don't need to be available to JavaScript,
		and should have the HttpOnly attribute. This precaution helps mitigate cross-site scripting (XSS) attacks.
	*/
	httpOnly: true,
	/*
		source : https://github.com/expressjs/cookie-parser#readme
		Set this cookie as signed so cookie-parser will try to decode it.
		The cookie will still be visible, but it has a signature, so it can detect if the client modified the cookie.
	*/
	signed: true,
	/*
		A cookie with the Secure attribute is sent to the server only with an encrypted request over the HTTPS protocol,
		never with unsecured HTTP (except on localhost)
	*/
	secure: isProductionMode(),
	/*
		source : https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite
		The SameSite attribute lets servers specify whether/when cookies are sent with cross-origin requests
		(where Site is defined by the registrable domain), which provides some protection against cross-site request forgery attacks (CSRF).
	*/
	sameSite: 'strict',
};
// http://expressjs.com/en/api.html#res.cookie
export const setSession = (user: UserDTO, { session }: Request): void => {
	/*
	res.cookie(USER_UUID, generateUuid(user), cookiesOption);
	res.cookie(SESSION_TOKEN, generateToken(user), cookiesOption);
	res.cookie(CSRF_TOKEN, generateToken(user), cookiesOption);
	*/
	session.jwt = generateToken(user);
	session.uuid = generateUuid(user);
};

// http://expressjs.com/en/api.html#res.clearCookie
export const removeSession = async (res: Response, { session }: Request): Promise<boolean> => {
	return new Promise((resolve) => {
		session.destroy((/*err*/) => {
			res.clearCookie(SESSION_ID, cookiesOption);
			logger.info('Session destroyed');
			resolve(true);
		});
	});
};
