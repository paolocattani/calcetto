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
exports.valueFormatter = exports.rowToModel = exports.parseBodyToPair = exports.fetchPairsStage2 = exports.listInTournament = exports.findAlias = exports.updatePlacement = exports.findById = void 0;
const logger_1 = require("../core/logger");
const sequelize_1 = require("sequelize");
const models_1 = require("../database/models");
const utils_1 = require("../core/utils");
const player_manager_1 = require("./player.manager");
const className = 'Pairs Manager';
const findById = (pairId) => __awaiter(void 0, void 0, void 0, function* () {
    const methodName = className + '.findById';
    logger_1.logProcess(methodName, 'start');
    try {
        const pair = yield models_1.Pair.findOne({
            where: { id: pairId },
            include: [models_1.Pair.associations.tournament, models_1.Pair.associations.player1, models_1.Pair.associations.player2],
        });
        const dto = pair ? rowToModel(pair, 0) : null;
        logger_1.logProcess(methodName, 'end');
        return dto;
    }
    catch (error) {
        logger_1.logProcess(methodName, 'error', error);
    }
    logger_1.logProcess(methodName, 'end');
});
exports.findById = findById;
const updatePlacement = (mapper) => __awaiter(void 0, void 0, void 0, function* () {
    const methodName = className + '.updatePlacement';
    logger_1.logProcess(methodName, 'start');
    try {
        yield utils_1.asyncForEach(mapper, (current, index, ref) => __awaiter(void 0, void 0, void 0, function* () {
            yield models_1.Pair.update({ placement: current.placement }, { where: { id: current.id } });
        }));
    }
    catch (error) {
        logger_1.logProcess(methodName, 'error : ', error);
        return false;
    }
    logger_1.logProcess(methodName, 'end');
    return true;
});
exports.updatePlacement = updatePlacement;
const findAlias = (player1Id, player2Id) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const methodName = className + '.findAlias';
    logger_1.logProcess(methodName, 'start');
    try {
        const pair = yield models_1.Pair.findOne({
            where: {
                player1Id,
                player2Id,
                alias: {
                    [sequelize_1.Op.not]: '',
                    [sequelize_1.Op.not]: null,
                },
            },
            order: [['updatedAt', 'DESC']],
        });
        logger_1.logProcess(methodName, 'end');
        return (_a = pair === null || pair === void 0 ? void 0 : pair.alias) !== null && _a !== void 0 ? _a : '';
    }
    catch (error) {
        logger_1.logProcess(methodName, 'error', error);
        return '';
    }
});
exports.findAlias = findAlias;
const listInTournament = (tId, user) => __awaiter(void 0, void 0, void 0, function* () {
    const methodName = className + '.listInTournament';
    logger_1.logProcess(methodName, 'start');
    try {
        const pairsList = yield models_1.Pair.findAll({
            where: {
                tournamentId: tId,
                [sequelize_1.Op.or]: [{ '$tournament.ownerId$': user.id }, { '$tournament.public$': true }],
            },
            order: [['id', 'ASC']],
            include: [models_1.Pair.associations.tournament, models_1.Pair.associations.player1, models_1.Pair.associations.player2],
        });
        const modelList = pairsList.map((row, index) => rowToModel(row, index));
        logger_1.logProcess(methodName, 'end');
        return modelList;
    }
    catch (error) {
        logger_1.logProcess(methodName, 'error', error);
        return [];
    }
});
exports.listInTournament = listInTournament;
const fetchPairsStage2 = (tournamentId) => __awaiter(void 0, void 0, void 0, function* () {
    const methodName = className + '.fetchPairsStage2';
    logger_1.logProcess(methodName, 'start');
    let result = [];
    try {
        const selectedStage2 = yield models_1.Stage2.findAll({
            attributes: ['pairId'],
            where: { tournamentId, pairId: { [sequelize_1.Op.not]: null }, step: 0 },
            group: ['pairId'],
        });
        logger_1.logger.info('selectedStage2 : ', selectedStage2.map((p) => p.pairId));
        const selectedPairs = yield models_1.Pair.findAll({
            where: {
                tournamentId,
                stage2Selected: true,
                placement: { [sequelize_1.Op.not]: null },
                id: { [sequelize_1.Op.notIn]: selectedStage2.map((p) => p.pairId) },
            },
            include: [models_1.Pair.associations.tournament, models_1.Pair.associations.player1, models_1.Pair.associations.player2],
            order: [
                ['stage1Name', 'ASC'],
                ['placement', 'ASC'],
            ],
        });
        result = selectedPairs.length !== 0 ? selectedPairs.map((p, i) => rowToModel(p, i)) : [];
    }
    catch (error) {
        logger_1.logProcess(methodName, 'error', error);
        logger_1.logger.error('fetchPairsStage2 : ', error);
    }
    logger_1.logProcess(methodName, `end (${result.length})`);
    return result;
});
exports.fetchPairsStage2 = fetchPairsStage2;
const parseBodyToPair = (body) => {
    var _a, _b, _c, _d;
    return ({
        id: body.id,
        alias: body.alias,
        stage1Name: body.stage1Name,
        placement: body.placement,
        paid1: body.paid1,
        paid2: body.paid2,
        tournamentId: body.tournamentId,
        player1Id: (_b = (_a = body.player1) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : body.player1Id,
        player1: body.player1,
        player2Id: (_d = (_c = body.player2) === null || _c === void 0 ? void 0 : _c.id) !== null && _d !== void 0 ? _d : body.player2Id,
        player2: body.player2,
    });
};
exports.parseBodyToPair = parseBodyToPair;
function rowToModel(row, index) {
    var _a, _b, _c, _d;
    return {
        id: row.id,
        rowNumber: index + 1,
        tournamentId: row.tournamentId,
        alias: row.alias,
        stage1Name: row.stage1Name,
        paid1: row.paid1,
        paid2: row.paid2,
        placement: row.placement,
        label: valueFormatter(row),
        player1: player_manager_1.convertEntityToDTO(row.player1, index + 2, (_a = row.player1) === null || _a === void 0 ? void 0 : _a.editable, (_b = row.player1) === null || _b === void 0 ? void 0 : _b.label),
        player2: player_manager_1.convertEntityToDTO(row.player2, index + 3, (_c = row.player2) === null || _c === void 0 ? void 0 : _c.editable, (_d = row.player2) === null || _d === void 0 ? void 0 : _d.label),
    };
}
exports.rowToModel = rowToModel;
function valueFormatter(row) {
    const { alias, id, player1, player2 } = row;
    if (alias && alias !== '') {
        return alias;
    }
    if (!player1 || !player2) {
        return '';
    }
    return `${player1.alias ? player1.alias : player1.name} - ${player2.alias ? player2.alias : player2.name}`;
}
exports.valueFormatter = valueFormatter;
