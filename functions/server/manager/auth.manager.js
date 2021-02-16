"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.parseBody = exports.convertEntityToDTO = exports.isValidRegister = exports.findUserByEmailAndUsername = exports.findUserByEmailOrUsername = exports.findUserDTOByEmailOrUsername = exports.findUserByEmail = exports.isAdmin = exports.registerUser = exports.deleteUser = exports.listAll = exports.emailRegExp = exports.passwordRegExp = exports.phoneRegExp = void 0;
const models_1 = require("../database/models");
const dto_1 = require("../../src/@common/dto");
const logger_1 = require("../core/logger");
const playerManager = __importStar(require("./player.manager"));
const sequelize_1 = require("sequelize");
const utils_1 = require("../core/utils");
const auth_utils_1 = require("../controller/auth/auth.utils");
const className = 'Authentication Manager : ';
exports.phoneRegExp = new RegExp('^d{10}$');
exports.passwordRegExp = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,16})');
exports.emailRegExp = new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$");
const listAll = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_1.logProcess(className + 'listAll', 'start');
        const users = yield models_1.User.findAll({
            order: [['id', 'DESC']],
            include: [models_1.User.associations.player],
        });
        logger_1.logProcess(className + 'listAll', 'end');
        return users.map((user) => exports.convertEntityToDTO(user));
    }
    catch (error) {
        logger_1.logProcess(className + 'listAll', ` Error : ${error}`);
        return [];
    }
});
exports.listAll = listAll;
const deleteUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_1.logProcess(className + 'deleteUser', 'start');
        yield user.destroy();
        logger_1.logProcess(className + 'deleteUser', 'end');
    }
    catch (error) {
        logger_1.logProcess(className + 'deleteUser', ` Error : ${error}`);
    }
});
exports.deleteUser = deleteUser;
const registerUser = (user, playerRole) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_1.logProcess(className + 'registerUser', 'start');
        user.password = yield auth_utils_1.generatePassword(user.email, user.password);
        if (user.name.startsWith('[A]')) {
            user.name = user.name.substring(3);
            user.role = dto_1.UserRole.Admin;
        }
        else {
            user.role = dto_1.UserRole.User;
        }
        const record = yield models_1.User.create(user);
        if (playerRole && playerRole !== dto_1.PlayerRole.NotAPlayer) {
            const model = {
                name: record.name,
                surname: record.surname,
                email: record.email,
                phone: record.phone,
                userId: record.id,
                alias: `${record.name} ${record.surname}`,
                role: playerRole,
            };
            logger_1.logger.info(`Player : ${JSON.stringify(model)}`);
            const player = yield playerManager.create(model);
            if (player) {
                logger_1.logger.info(`User : ${JSON.stringify(record, null, 2)}`);
                yield record.update({ playerId: player.id });
            }
        }
        logger_1.logProcess(className + 'registerUser', 'end');
        return exports.convertEntityToDTO(record);
    }
    catch (error) {
        logger_1.logProcess(className + 'registerUser', ` Error : ${error}`);
        return null;
    }
});
exports.registerUser = registerUser;
function isAdmin(user) {
    if (!user)
        return false;
    return user && user.role === dto_1.UserRole.Admin;
}
exports.isAdmin = isAdmin;
function findUserByEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.logProcess(className + 'findUserByEmail', '');
            return yield models_1.User.findOne({ where: { email } });
        }
        catch (error) {
            logger_1.logProcess(className + 'findUserByEmail', ` Error : ${error}`);
            return null;
        }
    });
}
exports.findUserByEmail = findUserByEmail;
function findUserDTOByEmailOrUsername(username) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.logProcess(className + 'findUserDTOByEmailOrUsername', '');
            const user = yield models_1.User.findOne({
                where: {
                    [sequelize_1.Op.or]: [utils_1.lowerWrapper('email', username), utils_1.lowerWrapper('username', username)],
                },
            });
            return user ? exports.convertEntityToDTO(user) : null;
        }
        catch (error) {
            logger_1.logProcess(className + 'findUserDTOByEmailOrUsername', ` Error : ${error}`);
            return null;
        }
    });
}
exports.findUserDTOByEmailOrUsername = findUserDTOByEmailOrUsername;
function findUserByEmailOrUsername(username, email) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.logProcess(className + 'findUserByEmailOrUsername', '');
            return yield models_1.User.findOne({
                where: {
                    [sequelize_1.Op.or]: [utils_1.lowerWrapper('email', email), utils_1.lowerWrapper('username', username)],
                },
            });
        }
        catch (error) {
            logger_1.logProcess(className + 'findUserByEmailOrUsername', ` Error : ${error}`);
            return null;
        }
    });
}
exports.findUserByEmailOrUsername = findUserByEmailOrUsername;
function findUserByEmailAndUsername(email, username) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.logProcess(className + 'findUserByEmailAndUsername', '');
            return yield models_1.User.findOne({
                where: {
                    [sequelize_1.Op.and]: [utils_1.lowerWrapper('email', email), utils_1.lowerWrapper('username', username)],
                },
            });
        }
        catch (error) {
            logger_1.logProcess(className + 'findUserByEmailAndUsername', ` Error : ${error}`);
            return null;
        }
    });
}
exports.findUserByEmailAndUsername = findUserByEmailAndUsername;
const isValidRegister = (user) => {
    let result = [];
    if (!user.username) {
        result.push({ label: 'auth:error.username' });
    }
    if (!user.name) {
        result.push({ label: 'auth:error.name' });
    }
    if (!user.surname) {
        result.push({ label: 'auth:error.surname' });
    }
    if (!user.email) {
        result.push({ label: 'auth:error.email.address' });
    }
    if (!user.confirmEmail) {
        result.push({ label: 'auth:error.email.confirm' });
    }
    if (user.email !== user.confirmEmail) {
        result.push({ label: 'auth:error.email.match' });
    }
    if (!exports.emailRegExp.test(user.email)) {
        result.push({ label: 'auth:error.email.validation' });
    }
    if (!user.password) {
        result.push({ label: 'auth:error.password.password' });
    }
    if (!user.confirmPassword) {
        result.push({ label: 'auth:error.password.confirm' });
    }
    if (user.password !== user.confirmPassword) {
        result.push({ label: 'auth:error.password.match' });
    }
    if (!exports.passwordRegExp.test(user.password)) {
        result.push({ label: 'auth:error.password.validation' });
    }
    return result;
};
exports.isValidRegister = isValidRegister;
const convertEntityToDTO = (user) => ({
    id: user.id,
    username: user.username,
    name: user.name,
    surname: user.surname,
    email: user.email,
    phone: user.phone || '',
    birthday: user.birthday,
    label: user.label,
    role: user.role,
});
exports.convertEntityToDTO = convertEntityToDTO;
const parseBody = (body) => ({
    id: body.id || null,
    username: body.username,
    name: body.name,
    surname: body.surname,
    password: body.password,
    email: body.email,
    phone: body.phone,
    birthday: body.birthday,
    role: body.role,
});
exports.parseBody = parseBody;
