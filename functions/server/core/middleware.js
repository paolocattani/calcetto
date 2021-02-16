"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auditControl = exports.withTestAuth = exports.withAdminRights = exports.withAuth = exports.asyncMiddleware = exports.doNotCacheThis = exports.cacheControl = exports.controllerLogger = exports.routeLogger = void 0;
const chalk_1 = __importDefault(require("chalk"));
const models_1 = require("../database/models");
const logger_1 = require("../core/logger");
const debug_1 = require("../core/debug");
const common_response_1 = require("../controller/common.response");
const cookies_utils_1 = require("../controller/auth/cookies.utils");
const auth_manager_1 = require("../manager/auth.manager");
const auth_utils_1 = require("../controller/auth/auth.utils");
const models_2 = require("../../src/@common/models");
const events_1 = require("../events/events");
const routeLogger = (req, res, next) => {
    if (debug_1.isDevMode())
        logger_1.logger.info(`Serving route : ${chalk_1.default.greenBright.bold(req.originalUrl)}`);
    next();
};
exports.routeLogger = routeLogger;
const controllerLogger = (req, next, controller, path) => {
    if (debug_1.isDevMode())
        logger_1.logger.info(`${controller} Controller : ${req.method} ${req.originalUrl.replace(path, '')} `);
    next();
};
exports.controllerLogger = controllerLogger;
const cacheControl = (req, res, next) => {
    const period = 60 * 5;
    res.set('Cache-control', req.method == 'GET' ? `public, max-age=${period}` : 'no-store');
    next();
};
exports.cacheControl = cacheControl;
const doNotCacheThis = (req, res, next) => {
    res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');
    next();
};
exports.doNotCacheThis = doNotCacheThis;
const asyncMiddleware = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
exports.asyncMiddleware = asyncMiddleware;
const withAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const [token, uuid] = cookies_utils_1.getCookies(req);
    if (!token || typeof token != 'string' || !uuid) {
        logger_1.logger.error(chalk_1.default.redBright('Come back with more cookies...'));
        return common_response_1.unauthorized(res, { label: 'common:server.unauthorized' });
    }
    const [user, isTokenValid] = auth_utils_1.safeVerifyToken(token);
    if (isTokenValid && user) {
        const userDb = yield models_1.User.findByPk(user.id);
        if (userDb) {
            req.user = user;
            req.uuid = uuid;
            next();
        }
    }
    else {
        logger_1.logger.error(chalk_1.default.redBright('Unauthorized: Token Expired '));
        const message = {
            status: models_2.SessionStatus.SESSION_EXPIRED,
            label: 'auth:expired_alert',
        };
        events_1.sendNotification(res, message, true);
        return common_response_1.unauthorized(res, { label: 'auth:expired' });
    }
});
exports.withAuth = withAuth;
const withAdminRights = (req, res, next) => {
    if (!auth_manager_1.isAdmin(req.user)) {
        return common_response_1.unauthorized(res, { label: 'auth:expired' });
    }
    else
        next();
};
exports.withAdminRights = withAdminRights;
const withTestAuth = (req, res, next) => {
    const { secret } = req.body;
    if (process.env.NODE_ENV !== 'test' || secret !== process.env.SERVER_SECRET) {
        return common_response_1.unauthorized(res, { label: 'common:server.unauthorized' });
    }
    next();
};
exports.withTestAuth = withTestAuth;
const auditControl = (req, res, next) => {
    next();
};
exports.auditControl = auditControl;
