"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendNotification = exports.sendNotifications = exports.subscribe = exports.unsubscribe = exports.sessionControl = void 0;
const logger_1 = require("../core/logger");
const const_1 = require("./const");
const dto_1 = require("../../src/@common/dto");
const models_1 = require("../../src/@common/models");
const cookies_utils_1 = require("../controller/auth/cookies.utils");
const auth_utils_1 = require("../controller/auth/auth.utils");
let connectedClients = new Map();
const clientToString = ({ uuid, user, tournamentId, progress }) => tournamentId
    ? `${uuid} : ${user.name} ( ${user.id} ) --> ${tournamentId}@${progress}`
    : `${uuid} : ${user.name} ( ${user.id} ) `;
const sessionControl = (req, res, next) => {
    req.socket.setTimeout(10000);
    const [token, uuid] = cookies_utils_1.getCookies(req);
    let intervalId = null;
    let [user] = auth_utils_1.safeVerifyToken(token);
    if (!user) {
        return;
    }
    if (connectedClients.get(uuid)) {
        logger_1.logger.info(`User ${user.username} already connected..`);
    }
    res.writeHead(200, const_1.DEFAULT_HEADERS);
    const client = { uuid, token, response: res, user, notification: user.role !== dto_1.UserRole.Admin };
    connectedClients.set(uuid, client);
    logger_1.logger.info(`--> New User connected : ${clientToString(client)}`);
    logger_1.logger.info(`--> Total connected : ${connectedClients.size}`);
    intervalId = setInterval(() => {
        const message = { status: models_1.SessionStatus.HEARTBEAT };
        exports.sendNotification(res, message);
        isSessionValid(token, res, intervalId, uuid);
    }, 5000);
    const stopWatcher = () => {
        connectedClients.delete(uuid);
        logger_1.logger.info(`--> User disconnected : ${clientToString(client)}`);
        logger_1.logger.info(`--> Total connected : ${connectedClients.size}`);
        if (intervalId) {
            clearInterval(intervalId);
        }
        res.end();
    };
    req.on('close', () => stopWatcher());
    req.on('end', () => stopWatcher());
};
exports.sessionControl = sessionControl;
const isSessionValid = (token, response, intervalId, uuid) => {
    var _a;
    const [user, isTokenValid] = auth_utils_1.safeVerifyToken(token);
    if (!isTokenValid) {
        logger_1.logger.info(`Token for user ${(_a = user === null || user === void 0 ? void 0 : user.username) !== null && _a !== void 0 ? _a : ''} expired !`);
        const message = {
            status: models_1.SessionStatus.SESSION_EXPIRED,
            label: 'auth:expired_alert'
        };
        exports.sendNotification(response, message, true);
        connectedClients.delete(uuid);
        if (intervalId) {
            clearInterval(intervalId);
        }
        return false;
    }
    return true;
};
const unsubscribe = (user, uuid) => exports.subscribe(user, uuid, undefined, undefined);
exports.unsubscribe = unsubscribe;
const subscribe = (user, uuid, tournamentId, progress) => {
    const client = connectedClients.get(uuid);
    if (client && client.notification) {
        clientToString(client);
        client.tournamentId = tournamentId;
        client.progress = progress;
        connectedClients.set(uuid, client);
    }
};
exports.subscribe = subscribe;
const sendNotifications = (message, tournamentId, progress) => {
    logger_1.logger.warn('sendNotifications : ');
    connectedClients
        .forEach((c) => {
        if (c.notification) {
            if (tournamentId && progress) {
                if (c.tournamentId && c.progress && c.tournamentId === tournamentId && c.progress === progress) {
                    logger_1.logger.error(`${c.uuid} : ${c.user.username} notify for ${tournamentId}@${progress}`);
                    exports.sendNotification(c.response, message, false);
                }
            }
            else {
                exports.sendNotification(c.response, message, false);
            }
        }
    });
};
exports.sendNotifications = sendNotifications;
const sendNotification = (response, message, endSession) => {
    if (message) {
        response.write(`data:${JSON.stringify(message)}`, const_1.CHAR_SET);
    }
    response.write(`${const_1.EOM}`, const_1.CHAR_SET);
    response.flush();
    if (endSession) {
        response.end();
    }
};
exports.sendNotification = sendNotification;
