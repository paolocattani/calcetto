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
exports.generateStructure = exports.getBaseLog = exports.parseBody = exports.deleteStage2 = exports.generateStage2Rows = exports.countStage2 = exports.updateSingleCell = exports.updateCells = void 0;
const logger_1 = require("../core/logger");
const connection_1 = require("../database/config/connection");
const models_1 = require("../database/models");
const dto_1 = require("../../src/@common/dto");
const auth_manager_1 = require("./auth.manager");
const pair_manager_1 = require("./pair.manager");
const models_2 = require("../../src/@common/models");
const events_1 = require("../events/events");
const className = 'Stage2 Manager : ';
const updateCells = (cells) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.logProcess(className + 'updateCells', 'start');
    try {
        cells
            .filter((cell) => cell.pair && (cell.pair.id || cell.pair.alias === '-'))
            .forEach((cell) => __awaiter(void 0, void 0, void 0, function* () {
            return yield exports.updateSingleCell(cell.pair.tournamentId, cell.cellColIndex, cell.cellRowIndex, cell.matchId, cell.pair, cell.isWinner);
        }));
        logger_1.logProcess(className + 'updateCells', 'end');
        return true;
    }
    catch (error) {
        logger_1.logProcess(className + 'updateCells', error);
        logger_1.logger.error('updateCells : ', error);
        return false;
    }
});
exports.updateCells = updateCells;
const updateSingleCell = (tournamentId, step, rowIndex, matchId, pair, isWinner) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.logProcess(className + 'updateSingleCell', 'start');
    try {
        const record = yield models_1.Stage2.findOne({ where: { tournamentId, step, order: rowIndex } });
        if (record) {
            yield record.update({ pairId: pair.id });
            logger_1.logProcess(className + 'updateSingleCell', 'end');
            return true;
        }
    }
    catch (error) {
        logger_1.logger.error('updateSingleCell. Error : ', error);
    }
    return false;
});
exports.updateSingleCell = updateSingleCell;
const countStage2 = (tournamentId) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.logProcess(className + 'countStage2', 'start');
    if (!tournamentId)
        logger_1.logger.info('Missing tournamentId...');
    try {
        const count = yield models_1.Stage2.count({ where: { tournamentId, step: 0 } });
        logger_1.logProcess(className + 'countStage2', `end (${count})`);
        return count;
    }
    catch (error) {
        logger_1.logProcess(className + 'countStage2', error);
        logger_1.logger.error('countStage2 : ', error);
        return 0;
    }
});
exports.countStage2 = countStage2;
const generateStage2Rows = (tournamentId, rowsNumber, user) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.logProcess(className + 'generateStage2Rows', 'start');
    const connection = yield connection_1.getDbConnection();
    const transaction = yield connection.transaction();
    const structure = exports.generateStructure(rowsNumber);
    const cells = new Array(structure.length).fill([]);
    try {
        for (let ii = 0; ii < structure.length; ii++) {
            for (let jj = 0; jj < structure[ii].length; jj++) {
                let record;
                const where = { tournamentId, order: jj, step: ii };
                if (auth_manager_1.isAdmin(user)) {
                    [record] = yield models_1.Stage2.findOrCreate({
                        transaction,
                        where,
                        defaults: { tournamentId, order: jj, step: ii },
                    });
                }
                else {
                    record = yield models_1.Stage2.findOne({ where });
                }
                if (record === null || record === void 0 ? void 0 : record.pairId) {
                    const pair = yield models_1.Pair.findOne({
                        where: { id: record.pairId },
                        include: [models_1.Pair.associations.tournament, models_1.Pair.associations.player1, models_1.Pair.associations.player2],
                    });
                    record.pair = pair;
                }
                structure[ii][jj].pair = (record === null || record === void 0 ? void 0 : record.pair) ? pair_manager_1.rowToModel(record.pair, 0) : models_2.getEmptyPair('-', tournamentId);
                cells[ii].push(structure[ii][jj]);
            }
        }
        yield transaction.commit();
    }
    catch (error) {
        yield transaction.rollback();
        logger_1.logProcess(className + 'generateStage2Rows', error);
        logger_1.logger.error('generateStage2Rows : ', error);
        return structure;
    }
    logger_1.logProcess(className + 'generateStage2Rows', 'end');
    return structure;
});
exports.generateStage2Rows = generateStage2Rows;
const deleteStage2 = (tournamentId) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.logProcess(className + 'deleteStage2', 'start');
    try {
        yield models_1.Stage2.destroy({ where: { tournamentId } });
        const message = { status: models_2.SessionStatus.STAGE2_DELETE, label: 'common:notification.stage2_delete' };
        events_1.sendNotifications(message, tournamentId, dto_1.TournamentProgress.Stage2);
    }
    catch (error) {
        logger_1.logProcess(className + 'deleteStage2', 'error');
        logger_1.logger.error('deleteStage2 : ', error);
    }
    logger_1.logProcess(className + 'deleteStage2', 'end');
});
exports.deleteStage2 = deleteStage2;
const parseBody = ({ tournamentId, pairId, step, order, rank }) => ({
    tournamentId,
    pairId,
    step,
    order,
    rank,
});
exports.parseBody = parseBody;
function getBaseLog(x, y) {
    return Math.log(y) / Math.log(x);
}
exports.getBaseLog = getBaseLog;
const generateStructure = (rowNumber) => {
    const N = getBaseLog(2, rowNumber) + 1;
    let counter = rowNumber * 2;
    return new Array(N).fill([]).map((e, ii) => {
        counter /= 2;
        let bounce = true;
        let index = 0;
        let temp = [];
        for (let jj = 0; jj < counter; jj++) {
            if (bounce)
                index++;
            bounce = !bounce;
            temp.push({
                matchId: index,
                cellColIndex: ii,
                cellRowIndex: jj,
                parentId: ii === 0 ? 0 : jj + 1,
                name: `${ii}-${jj + 1}`,
                pair: undefined,
                isWinner: false,
            });
        }
        return [...temp];
    });
};
exports.generateStructure = generateStructure;
