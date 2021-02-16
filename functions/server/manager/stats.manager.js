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
exports.pairEntity2DTO = exports.playerEntity2DTO = exports.getStatsByPairs = exports.getStatsByPlayer = exports.getBestPairs = exports.getBestPlayers = void 0;
const logger_1 = require("../core/logger");
const sequelize_1 = require("sequelize");
const models_1 = require("../database/models");
const player_manager_1 = require("./player.manager");
const utils_1 = require("../core/utils");
const className = 'Stats Manager : ';
const getBestPlayers = (from) => __awaiter(void 0, void 0, void 0, function* () {
    const methodName = className + 'getBestPlayers';
    logger_1.logProcess(methodName, 'start');
    let result = [];
    try {
        const rowsLimit = 10;
        const list = yield models_1.StatsPlayer.sequelize.query(`select * from getPlayerStats${from ? `('${from}')` : '()'}
				order by totwin desc
				fetch first ${rowsLimit} rows only`, {
            type: sequelize_1.QueryTypes.SELECT,
            raw: false,
            model: models_1.StatsPlayer,
            mapToModel: true,
        });
        if (list) {
            yield utils_1.asyncForEach(list, (p) => __awaiter(void 0, void 0, void 0, function* () {
                const player = yield models_1.Player.findByPk(p.playerid);
                p.player = player;
                const dto = exports.playerEntity2DTO(p);
                result.push(dto);
            }));
        }
    }
    catch (error) {
        logger_1.logProcess(methodName, 'error', error);
    }
    logger_1.logProcess(methodName, 'end');
    return result;
});
exports.getBestPlayers = getBestPlayers;
const getBestPairs = (from) => __awaiter(void 0, void 0, void 0, function* () {
    const methodName = className + 'getBestPairs';
    logger_1.logProcess(methodName, 'start');
    let result = [];
    try {
        const rowsLimit = 10;
        const list = yield models_1.StatsPairs.sequelize.query(`select * from getPairStats${from ? `('${from}')` : '()'}
			order by totwin desc
			fetch first ${rowsLimit} rows only`, {
            type: sequelize_1.QueryTypes.SELECT,
            raw: false,
            model: models_1.StatsPairs,
            mapToModel: true,
        });
        if (list) {
            yield utils_1.asyncForEach(list, (p) => __awaiter(void 0, void 0, void 0, function* () {
                const player1 = yield models_1.Player.findByPk(p.player1id);
                p.player1 = player1;
                const player2 = yield models_1.Player.findByPk(p.player2id);
                p.player2 = player2;
                const dto = exports.pairEntity2DTO(p);
                result.push(dto);
            }));
            result = list.map(exports.pairEntity2DTO);
        }
    }
    catch (error) {
        logger_1.logProcess(methodName, 'error', error);
    }
    logger_1.logProcess(methodName, 'end');
    return result;
});
exports.getBestPairs = getBestPairs;
const getStatsByPlayer = (playerid) => __awaiter(void 0, void 0, void 0, function* () {
    const methodName = className + 'getStatsByPlayer';
    logger_1.logProcess(methodName, 'start');
    let result = null;
    try {
        const entity = yield models_1.StatsPlayer.findOne({ where: { playerid } });
        result = entity ? exports.playerEntity2DTO(entity) : null;
    }
    catch (error) {
        logger_1.logProcess(methodName, 'error', error);
    }
    logger_1.logProcess(methodName, 'end');
    return result;
});
exports.getStatsByPlayer = getStatsByPlayer;
function getStatsByPairs(player1Id, player2Id) {
    return __awaiter(this, void 0, void 0, function* () {
        const methodName = className + 'getStatsByPairs';
        logger_1.logProcess(methodName, 'start');
        let result = null;
        try {
            const entity = yield models_1.StatsPairs.findOne({
                where: {
                    [sequelize_1.Op.or]: [{ [sequelize_1.Op.and]: { player1Id, player2Id } }, { [sequelize_1.Op.and]: { player1Id: player2Id, player2Id: player1Id } }],
                },
            });
            result = entity ? exports.pairEntity2DTO(entity) : null;
        }
        catch (error) {
            logger_1.logProcess(methodName, 'error', error);
        }
        logger_1.logProcess(methodName, 'end');
        return result;
    });
}
exports.getStatsByPairs = getStatsByPairs;
const playerEntity2DTO = (stats) => (Object.assign(Object.assign({}, JSON.parse(utils_1.logEntity(stats))), { player: player_manager_1.convertEntityToDTO(stats.player, 1, false, stats.player.label || '') }));
exports.playerEntity2DTO = playerEntity2DTO;
const pairEntity2DTO = (stats) => (Object.assign(Object.assign({}, JSON.parse(utils_1.logEntity(stats))), { player1: player_manager_1.convertEntityToDTO(stats.player1, 1, false, stats.player1.label || ''), player2: player_manager_1.convertEntityToDTO(stats.player2, 1, false, stats.player2.label || '') }));
exports.pairEntity2DTO = pairEntity2DTO;
