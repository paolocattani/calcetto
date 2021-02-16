"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeUserCookies = exports.addUserCookies = exports.getCookies = void 0;
const uuid_1 = require("uuid");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const debug_1 = require("../../core/debug");
const auth_utils_1 = require("./auth.utils");
const SESSION_TOKEN = 'session_id';
const USER_UUID = 'user_id';
const DEFAULT_TOKEN_EXPIRATION = '8h';
const TOKEN_EXPIRATION = process.env.SERVER_TOKEN_EXPIRES_IN || DEFAULT_TOKEN_EXPIRATION;
const generateUuid = (user) => uuid_1.v5(user.id.toString(), '48990e20-7e42-4f0c-97e0-c64456d5bc71');
const generateToken = (value) => jsonwebtoken_1.default.sign(Object.assign({}, value), auth_utils_1.TOKEN_SECRET, {
    expiresIn: TOKEN_EXPIRATION,
    algorithm: 'HS256',
});
const getCookies = (req) => [getToken(req), getUuid(req)];
exports.getCookies = getCookies;
const getToken = (req) => req.signedCookies[SESSION_TOKEN];
const getUuid = (req) => req.signedCookies[USER_UUID];
const cookiesOption_old = Object.assign({ maxAge: 8 * 60 * 60 * 1000, httpOnly: true, signed: true }, (debug_1.isProductionMode()
    ? {
        secure: true,
        sameSite: 'none',
    }
    : {
        httpOnly: true,
    }));
const cookiesOption = {
    maxAge: 8 * 60 * 60 * 1000,
    httpOnly: true,
    signed: true,
    secure: debug_1.isProductionMode(),
    sameSite: debug_1.isProductionMode() ? 'strict' : 'lax',
};
const addUserCookies = (user, res) => {
    res.cookie(USER_UUID, generateUuid(user), cookiesOption);
    res.cookie(SESSION_TOKEN, generateToken(user), cookiesOption);
};
exports.addUserCookies = addUserCookies;
const removeUserCookies = (res) => {
    res.clearCookie(USER_UUID, cookiesOption);
    res.clearCookie(SESSION_TOKEN, cookiesOption);
};
exports.removeUserCookies = removeUserCookies;
