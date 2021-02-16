"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.safeVerifyToken = exports.comparePasswords = exports.generatePassword = exports.TOKEN_SECRET = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const DEFAULT_HASH = 'dummy$Hash';
exports.TOKEN_SECRET = process.env.SERVER_HASH || DEFAULT_HASH;
const generateHashSecret = (email, password) => email + exports.TOKEN_SECRET + password;
const generatePassword = (email, password) => bcryptjs_1.default.hash(generateHashSecret(email, password), 10);
exports.generatePassword = generatePassword;
const comparePasswords = (email, password, hash) => bcryptjs_1.default.compare(generateHashSecret(email, password), hash);
exports.comparePasswords = comparePasswords;
const safeVerifyToken = (token) => {
    let decoded = null;
    try {
        decoded = jsonwebtoken_1.default.verify(token, exports.TOKEN_SECRET);
        return [decoded, true];
    }
    catch (error) {
        return [null, false];
    }
};
exports.safeVerifyToken = safeVerifyToken;
