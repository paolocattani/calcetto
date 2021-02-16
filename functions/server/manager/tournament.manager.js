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
exports.parseBody = exports.convertEntityToDTO = exports.findByParams = exports.findByNameAndDate = exports.findById = exports.update = exports.deleteAllTournament = exports.deleteTournament = exports.listAll = void 0;
const logger_1 = require("../core/logger");
const dto_1 = require("../../src/@common/dto");
const models_1 = require("../database/models");
const sequelize_1 = require("sequelize");
const utils_1 = require("../core/utils");
const models_2 = require("../../src/@common/models");
const events_1 = require("../events/events");
const className = 'Tournament Manager : ';
const defaultFilter = (user) => ({ [sequelize_1.Op.or]: [{ ownerId: user.id }, { public: true }] });
const listAll = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_1.logProcess(className + 'listAll', 'start');
        const t = yield models_1.Tournament.findAll({
            where: user.role !== dto_1.UserRole.Admin
                ? Object.assign({ progress: [dto_1.TournamentProgress.Stage1, dto_1.TournamentProgress.Stage2] }, defaultFilter(user)) : Object.assign({}, defaultFilter(user)),
            order: [
                ['date', 'DESC'],
                ['name', 'DESC'],
            ],
        });
        logger_1.logProcess(className + 'listAll', `end. Found : (${t.length})`);
        return t.map((e) => exports.convertEntityToDTO(e));
    }
    catch (error) {
        logger_1.logProcess(className + 'listAll', ` Error : ${error}`);
        return [];
    }
});
exports.listAll = listAll;
const deleteTournament = (tournament) => __awaiter(void 0, void 0, void 0, function* () { return yield models_1.Tournament.destroy({ where: { id: tournament.id } }); });
exports.deleteTournament = deleteTournament;
const deleteAllTournament = () => __awaiter(void 0, void 0, void 0, function* () { return yield models_1.Tournament.truncate({ cascade: true }); });
exports.deleteAllTournament = deleteAllTournament;
const update = (user, model) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.logProcess(className + 'update', 'start');
    try {
        const params = new Map();
        params.set('id', model.id);
        const t = yield exports.findByParams(params, user);
        if (!t) {
            logger_1.logProcess(className + 'update', 'end : Tournament not found');
            return model;
        }
        if (t.public && t.progress === dto_1.TournamentProgress.PairsSelection && model.progress === dto_1.TournamentProgress.Stage1) {
            const message = {
                status: models_2.SessionStatus.TOURNAMENT_NEW,
                label: 'common:notification.tournament_new',
                data: { name: model.name, date: model.date },
            };
            events_1.sendNotifications(message);
        }
        if (t.public && t.progress === dto_1.TournamentProgress.Stage1 && model.progress === dto_1.TournamentProgress.Stage2) {
            const message = {
                status: models_2.SessionStatus.TOURNAMENT_UPDATE,
                label: 'common:notification.tournament_update',
                data: { name: model.name, date: model.date },
            };
            events_1.sendNotifications(message);
        }
        if (t.public && t.progress === dto_1.TournamentProgress.Stage1 && model.progress === dto_1.TournamentProgress.PairsSelection) {
            const message = {
                status: models_2.SessionStatus.TOURNAMENT_DELETE,
                label: 'common:notification.tournament_delete',
                data: { name: model.name, date: model.date },
            };
            events_1.sendNotifications(message);
        }
        const result = yield t.update({
            progress: model.progress,
            autoOrder: model.autoOrder,
        });
        logger_1.logProcess(className + 'update', 'end');
        return exports.convertEntityToDTO(result);
    }
    catch (error) {
        logger_1.logProcess(className + 'update', 'error');
        return model;
    }
});
exports.update = update;
const findById = (user, tId) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.logProcess(className + 'findById', 'start');
    const params = new Map();
    params.set('id', tId);
    const result = yield exports.findByParams(params, user);
    logger_1.logProcess(className + 'findById', 'end');
    return result ? exports.convertEntityToDTO(result) : null;
});
exports.findById = findById;
const findByNameAndDate = (name, date, user) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.logProcess(className + 'findByNameAndDate', 'start');
    const result = yield models_1.Tournament.findOne({
        where: Object.assign({ [sequelize_1.Op.and]: [utils_1.lowerWrapper('name', name), utils_1.dateInRageWrapper('date', date, date)] }, defaultFilter(user)),
        order: [
            ['date', 'DESC'],
            ['name', 'DESC'],
        ],
    });
    logger_1.logProcess(className + 'findByNameAndDate', 'end');
    return result ? exports.convertEntityToDTO(result) : null;
});
exports.findByNameAndDate = findByNameAndDate;
const findByParams = (parameters, user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_1.logProcess(className + 'findByParams', 'start');
        const result = yield models_1.Tournament.findOne({
            where: Object.assign(Object.assign({}, utils_1.getWhereFromMap(parameters)), defaultFilter(user)),
            order: [
                ['date', 'DESC'],
                ['name', 'DESC'],
            ],
        });
        logger_1.logProcess(className + 'findByParams', 'end');
        return result;
    }
    catch (error) {
        logger_1.logProcess(className + 'findByParams', ` Error : ${error}`);
        return null;
    }
});
exports.findByParams = findByParams;
const convertEntityToDTO = (t) => {
    var _a, _b, _c, _d, _e, _f, _g;
    return ({
        id: t === null || t === void 0 ? void 0 : t.id,
        name: (_a = t === null || t === void 0 ? void 0 : t.name) !== null && _a !== void 0 ? _a : '',
        date: (_b = t === null || t === void 0 ? void 0 : t.date) !== null && _b !== void 0 ? _b : new Date(),
        progress: (_c = t === null || t === void 0 ? void 0 : t.progress) !== null && _c !== void 0 ? _c : dto_1.TournamentProgress.New,
        public: (_d = t === null || t === void 0 ? void 0 : t.public) !== null && _d !== void 0 ? _d : false,
        autoOrder: (_e = t === null || t === void 0 ? void 0 : t.autoOrder) !== null && _e !== void 0 ? _e : true,
        label: (_f = t === null || t === void 0 ? void 0 : t.label) !== null && _f !== void 0 ? _f : '',
        ownerId: (_g = t === null || t === void 0 ? void 0 : t.ownerId) !== null && _g !== void 0 ? _g : 0,
    });
};
exports.convertEntityToDTO = convertEntityToDTO;
const parseBody = (body) => {
    var _a, _b, _c, _d, _e, _f, _g;
    return ({
        id: (_a = body.id) !== null && _a !== void 0 ? _a : null,
        name: (_b = body.name) !== null && _b !== void 0 ? _b : null,
        date: (_c = body.date) !== null && _c !== void 0 ? _c : null,
        progress: (_d = body.progress) !== null && _d !== void 0 ? _d : null,
        public: (_e = body.public) !== null && _e !== void 0 ? _e : null,
        autoOrder: (_f = body.autoOrder) !== null && _f !== void 0 ? _f : null,
        label: (_g = body.label) !== null && _g !== void 0 ? _g : null,
        ownerId: body === null || body === void 0 ? void 0 : body.ownerId,
    });
};
exports.parseBody = parseBody;
