// Cookies
import { UserDTO } from '../../../src/@common/dto';
import { v5 as uuidv5 } from 'uuid';
import jwt from 'jsonwebtoken';
import { AppRequest } from '../index';
import { CookieOptions, Response } from 'express';
import { isProductionMode } from '../../core/debug';
import { TOKEN_SECRET } from './auth.utils';

const SESSION_TOKEN = 'session_id';
const USER_UUID = 'user_id';

// Generate JWT Token
const DEFAULT_TOKEN_EXPIRATION = '8h';
const TOKEN_EXPIRATION = process.env.SERVER_TOKEN_EXPIRES_IN || DEFAULT_TOKEN_EXPIRATION;
const generateUuid = (user: UserDTO) => uuidv5(user.id.toString(), '48990e20-7e42-4f0c-97e0-c64456d5bc71');
const generateToken = (value: UserDTO) =>
	jwt.sign({ ...value }, TOKEN_SECRET, {
		expiresIn: TOKEN_EXPIRATION,
		algorithm: 'HS256',
	});

export const getCookies = (req: AppRequest) => [getToken(req), getUuid(req)];
/**
 * Extract token from cookies
 * @param req AppRequest : request
 */
export const getToken = (req: AppRequest) => req.signedCookies[SESSION_TOKEN];
/**
 * Extract uuid from cookies
 * @param req AppRequest : request
 */
export const getUuid = (req: AppRequest) => req.signedCookies[USER_UUID];

/**
 * cookiesOption
 */
const cookiesOption: CookieOptions = {
	// 8h : Allineare a process.env.SERVER_TOKEN_EXPIRES_IN
	maxAge: 8 * 60 * 60 * 1000,
	signed: true,
	...(isProductionMode()
		? {
				secure: true,
				sameSite: 'none',
		  }
		: {
				httpOnly: true,
				maxAge: 8 * 60 * 60 * 1000,
		  }),
};
// http://expressjs.com/en/api.html#res.cookie
export const addUserCookies = (user: UserDTO, res: Response) => {
	res.cookie(USER_UUID, generateUuid(user), cookiesOption);
	res.cookie(SESSION_TOKEN, generateToken(user), cookiesOption);
};
// http://expressjs.com/en/api.html#res.clearCookie
export const removeUserCookies = (res: Response) => {
	res.clearCookie(USER_UUID, cookiesOption);
	res.clearCookie(SESSION_TOKEN, cookiesOption);
};
