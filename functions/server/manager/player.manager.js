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
exports.convertEntityToDTO = exports.parseBody = exports.findByParams = exports.deletePlayer = exports.findById = exports.findByNameSurname = exports.update = exports.create = exports.listAll = exports.listAllInTournament = void 0;
const dto_1 = require("../../src/@common/dto");
const models_1 = require("../database/models");
const logger_1 = require("../core/logger");
const utils_1 = require("../core/utils");
const className = 'Player Manager : ';
const listAllInTournament = (tId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_1.logProcess(className + 'listAllInTournament', 'start');
        const users = yield models_1.Player.scope('withPairs').findAll({
            order: [
                ['alias', 'DESC'],
                ['name', 'DESC'],
                ['surname', 'DESC'],
            ],
        });
        logger_1.logProcess(className + 'listAllInTournament', 'users fetched');
        const result = users
            .filter((player) => {
            if (player.alias === '' && player.name === '') {
                return false;
            }
            if (!player.pair1 && !player.pair2) {
                return true;
            }
            return !((player.pair1 && player.pair1.find((e) => e.tournamentId === tId)) ||
                (player.pair2 && player.pair2.find((e) => e.tournamentId === tId)));
        })
            .map((player, ii) => exports.convertEntityToDTO(player, ii, player.editable, player.label));
        logger_1.logProcess(className + 'listAllInTournament', 'end');
        return result;
    }
    catch (error) {
        logger_1.logProcess(className + 'listAllInTournament', ` Error : ${error}`);
        return [];
    }
});
exports.listAllInTournament = listAllInTournament;
const listAll = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_1.logProcess(className + 'listAll', 'start');
        const users = yield models_1.Player.scope('withPairs').findAll({ order: [['id', 'ASC']] });
        logger_1.logProcess(className + 'listAll', 'end');
        return users.map((player, ii) => { var _a, _b; return exports.convertEntityToDTO(player, ii, (_a = player === null || player === void 0 ? void 0 : player.editable) !== null && _a !== void 0 ? _a : false, (_b = player === null || player === void 0 ? void 0 : player.label) !== null && _b !== void 0 ? _b : ''); });
    }
    catch (error) {
        logger_1.logProcess(className + 'listAll', ` Error : ${error}`);
        return [];
    }
});
exports.listAll = listAll;
const create = (model) => __awaiter(void 0, void 0, void 0, function* () {
    let player = null;
    try {
        logger_1.logProcess(className + 'create', 'start');
        if (model.id === 0)
            model.id = null;
        player = yield exports.findByNameSurname(model.name, model.surname);
        if (player) {
            logger_1.logProcess(className + 'create', ' : Player already exists!');
            throw new Error('Player already exists!');
        }
        player = yield models_1.Player.create(model);
        logger_1.logProcess(className + 'create', `created => ${player.toString()}`);
    }
    catch (error) {
        logger_1.logProcess(className + 'create', ` Error : ${error}`);
    }
    logger_1.logProcess(className + 'create', 'end');
    return exports.convertEntityToDTO(player, model.rowNumber, model.editable, model.label);
});
exports.create = create;
const update = (model) => __awaiter(void 0, void 0, void 0, function* () {
    let player = null;
    try {
        logger_1.logProcess(className + 'update', 'start');
        if (model.id)
            player = yield models_1.Player.findByPk(model.id);
        if (player) {
            yield player.update(model);
            logger_1.logProcess(className + 'update', `updated => ${player.toString()}`);
        }
    }
    catch (error) {
        logger_1.logProcess(className + 'update', ` Error : ${error}`);
    }
    logger_1.logProcess(className + 'update', 'end');
    return exports.convertEntityToDTO(player, model.rowNumber, model.editable, model.label);
});
exports.update = update;
const findByNameSurname = (name, surname) => __awaiter(void 0, void 0, void 0, function* () {
    let player = null;
    try {
        logger_1.logProcess(className + 'findById', 'start');
        const params = new Map();
        params.set('name', name);
        params.set('surname', surname);
        player = yield exports.findByParams(params);
    }
    catch (error) {
        logger_1.logProcess(className + 'findById', ` Error : ${error}`);
    }
    logger_1.logProcess(className + 'findById', 'end');
    return player;
});
exports.findByNameSurname = findByNameSurname;
const findById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    let player = null;
    try {
        logger_1.logProcess(className + 'findById', 'start');
        player = yield models_1.Player.findByPk(id);
    }
    catch (error) {
        logger_1.logProcess(className + 'findById', ` Error : ${error}`);
    }
    logger_1.logProcess(className + 'findById', 'end');
    return player;
});
exports.findById = findById;
const deletePlayer = (models) => models_1.Player.destroy({ where: { id: models.map((e) => e.id) } });
exports.deletePlayer = deletePlayer;
const findByParams = (parameters) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_1.logProcess(className + 'findByParams', 'start');
        const result = yield models_1.Player.findOne({
            where: Object.assign({}, utils_1.getWhereFromMap(parameters)),
            order: [['id', 'DESC']],
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
const parseBody = (body) => ({
    id: body.id,
    name: body.name || '',
    surname: body.surname || '',
    alias: body.alias || '',
    role: body.role || dto_1.PlayerRole.Striker,
    email: body.email || '',
    phone: body.phone || '',
    match_played: body.match_played || 0,
    match_won: body.match_won || 0,
    total_score: body.total_score || 0,
    editable: body.editable,
});
exports.parseBody = parseBody;
const convertEntityToDTO = (player, index, editable, label) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    return ({
        id: (_a = player === null || player === void 0 ? void 0 : player.id) !== null && _a !== void 0 ? _a : 0,
        rowNumber: index,
        name: (_b = player === null || player === void 0 ? void 0 : player.name) !== null && _b !== void 0 ? _b : '',
        surname: (_c = player === null || player === void 0 ? void 0 : player.surname) !== null && _c !== void 0 ? _c : '',
        alias: (_d = player === null || player === void 0 ? void 0 : player.alias) !== null && _d !== void 0 ? _d : '',
        label: label,
        email: (_e = player === null || player === void 0 ? void 0 : player.email) !== null && _e !== void 0 ? _e : '',
        phone: (_f = player === null || player === void 0 ? void 0 : player.phone) !== null && _f !== void 0 ? _f : '',
        role: (_g = player === null || player === void 0 ? void 0 : player.role) !== null && _g !== void 0 ? _g : dto_1.PlayerRole.GoalKeeper,
        match_played: (_h = player === null || player === void 0 ? void 0 : player.match_played) !== null && _h !== void 0 ? _h : 0,
        match_won: (_j = player === null || player === void 0 ? void 0 : player.match_won) !== null && _j !== void 0 ? _j : 0,
        total_score: (_k = player === null || player === void 0 ? void 0 : player.total_score) !== null && _k !== void 0 ? _k : 0,
        editable: editable,
    });
};
exports.convertEntityToDTO = convertEntityToDTO;
