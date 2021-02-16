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
Object.defineProperty(exports, "__esModule", { value: true });
require("../../core/env");
const logger_1 = require("../../core/logger");
const middleware_1 = require("../../core/middleware");
const express_1 = require("express");
const auth_manager_1 = require("../../manager/auth.manager");
const common_response_1 = require("../common.response");
const HttpStatusCode_1 = require("../../../src/@common/models/HttpStatusCode");
const cookies_utils_1 = require("./cookies.utils");
const auth_utils_1 = require("./auth.utils");
const events_1 = require("../../events/events");
const router = express_1.Router();
const registrationController = middleware_1.asyncMiddleware((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.logger.info('/register start ');
    const registrationInfo = req.body;
    try {
        const errors = auth_manager_1.isValidRegister(registrationInfo);
        if (errors.length !== 0) {
            return common_response_1.failure(res, { label: 'auth:error.generic' }, 'Registration data is not valid', HttpStatusCode_1.HTTPStatusCode.BadRequest, { errors });
        }
        const model = auth_manager_1.parseBody(registrationInfo);
        const user = yield auth_manager_1.findUserByEmailOrUsername(model.username, model.email);
        if (user) {
            return common_response_1.failure(res, { label: 'auth:server.error.already_exists' }, 'Email or Username alrealdy exists.', HttpStatusCode_1.HTTPStatusCode.BadRequest, {
                errors: [{ label: 'auth:server.error.already_exists' }],
            });
        }
        const record = yield auth_manager_1.registerUser(model, registrationInfo.playerRole);
        if (record) {
            cookies_utils_1.addUserCookies(record, res);
            logger_1.logger.info('/register end ');
            return common_response_1.success(res, { label: 'auth:welcome', options: { username: record.name } }, { user: record });
        }
        else {
            throw new Error('Server Error.!');
        }
    }
    catch (error) {
        return common_response_1.serverError('POST auth/register error ! : ', error, res, {
            errors: ["Errore server non previsto. E' stata avviata la procedura di autodistruzione."],
        });
    }
}));
const wrongCredentials = (res) => common_response_1.failure(res, { label: 'auth:server.error.wrong_credential' }, 'Wrong credentials', HttpStatusCode_1.HTTPStatusCode.Unauthorized);
router.use('/', (req, res, next) => middleware_1.controllerLogger(req, next, 'Auth Controller', '/api/v2/auth'));
router.get('/check', middleware_1.withAuth, middleware_1.asyncMiddleware((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const additional = { user: req.user };
    return common_response_1.success(res, {
        label: 'auth:server.error.wrong_credential',
        options: { username: req.user.name },
    }, additional);
})));
router.get('/logout', middleware_1.withAuth, middleware_1.asyncMiddleware((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    cookies_utils_1.removeUserCookies(res);
    return common_response_1.success(res, { label: 'auth:logout' });
})));
router.post('/register', registrationController);
router.put('/unsubscribe', middleware_1.withAuth, middleware_1.asyncMiddleware((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user, uuid } = req;
        events_1.unsubscribe(user, uuid);
        return common_response_1.success(res, { label: '' });
    }
    catch (err) {
        return common_response_1.serverError('PUT tournament/unsubscribe error ! : ', err, res);
    }
})));
router.put('/update', middleware_1.withAuth, middleware_1.asyncMiddleware((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let model = auth_manager_1.parseBody(req.body);
        logger_1.logger.info('/update : ', model);
        const user = yield auth_manager_1.findUserByEmailAndUsername(model.email, model.username);
        if (!user) {
            return common_response_1.entityNotFound(res);
        }
        yield user.update(model);
        return common_response_1.success(res, { label: 'common:server.updated' }, { user: auth_manager_1.convertEntityToDTO(user) });
    }
    catch (error) {
        return common_response_1.serverError('PUT auth/update error ! : ', error, res);
    }
})));
router.post('/login', middleware_1.asyncMiddleware((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    return yield loginUserController(res, username, password);
})));
router.delete('/delete', middleware_1.withAuth, middleware_1.asyncMiddleware((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { password } = req.body;
    const { email, username } = req.user;
    return yield deleteUserController(res, username, email, password);
})));
router.post('/test/register', middleware_1.withTestAuth, registrationController);
router.delete('/test/delete', middleware_1.withTestAuth, middleware_1.asyncMiddleware((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, email, username } = req.body;
    return yield deleteUserController(res, username, email, password);
})));
router.post('/test/login', middleware_1.withTestAuth, middleware_1.asyncMiddleware((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    return yield loginUserController(res, username, password);
})));
router.get('/test/user', middleware_1.withTestAuth, middleware_1.asyncMiddleware((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email } = req.query;
    const user = yield auth_manager_1.findUserByEmailAndUsername(email, username);
    if (user) {
        const userDTO = auth_manager_1.convertEntityToDTO(user);
        return common_response_1.success(res, { label: 'auth:welcome', options: { username: userDTO.name } }, { user: userDTO });
    }
    else {
        return common_response_1.entityNotFound(res);
    }
})));
const loginUserController = (res, username, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_1.logger.info('/login start ');
        if (!username || !password) {
            return common_response_1.missingParameters(res);
        }
        const user = yield auth_manager_1.findUserByEmailOrUsername(username, username);
        if (!user) {
            return common_response_1.entityNotFound(res);
        }
        if (!(yield auth_utils_1.comparePasswords(user.email, password, user.password))) {
            return wrongCredentials(res);
        }
        const userDTO = auth_manager_1.convertEntityToDTO(user);
        cookies_utils_1.addUserCookies(userDTO, res);
        return common_response_1.success(res, { label: 'auth:welcome', options: { username: userDTO.name } }, { user: userDTO });
    }
    catch (error) {
        return common_response_1.serverError('POST auth/login error ! : ', error, res);
    }
});
const deleteUserController = (res, username, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_1.logger.info('/delete start ');
        const user = yield auth_manager_1.findUserByEmailAndUsername(email, username);
        if (!user) {
            return common_response_1.entityNotFound(res);
        }
        if (!(yield auth_utils_1.comparePasswords(email, password, user.password))) {
            return wrongCredentials(res);
        }
        yield auth_manager_1.deleteUser(user);
        logger_1.logger.info('/delete end ');
        cookies_utils_1.removeUserCookies(res);
        return common_response_1.success(res, { label: 'auth:server.deleted', options: { username: user.name } });
    }
    catch (error) {
        return common_response_1.serverError('DELETE auth/delete error ! : ', error, res);
    }
});
exports.default = router;
