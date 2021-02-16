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
exports.getOpposite = exports.generateStage1Rows = exports.updateCell = exports.findStage1 = exports.deleteStage1 = void 0;
const models_1 = require("../database/models");
const logger_1 = require("../core/logger");
const utils_1 = require("../core/utils");
const connection_1 = require("../database/config/connection");
const auth_manager_1 = require("../manager/auth.manager");
const sequelize_1 = require("sequelize");
const models_2 = require("../../src/@common/models");
const events_1 = require("../events/events");
const className = 'Stage1 Manager : ';
const deleteStage1 = (tournamentId) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.logProcess(className + 'deleteStage1', 'start');
    try {
        const tournament = yield models_1.Tournament.findByPk(tournamentId);
        if (!tournament) {
            return;
        }
        yield models_1.Stage1.destroy({ where: { tournamentId } });
        const message = {
            status: models_2.SessionStatus.STAGE1_DELETE,
            label: 'common:notification.stage1_delete',
            data: { name: tournament.name, date: tournament.date },
        };
        events_1.sendNotifications(message);
    }
    catch (error) {
        logger_1.logProcess(className + 'deleteStage1', 'error');
        logger_1.logger.error('deleteStage1 : ', error);
    }
    logger_1.logProcess(className + 'deleteStage1', 'end');
});
exports.deleteStage1 = deleteStage1;
const findStage1 = (tournamentId, name, pair1Id, pair2Id) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.logProcess(className + 'findFromPairs', 'start');
    let stage = null;
    try {
        stage = yield models_1.Stage1.findOne({
            where: {
                [sequelize_1.Op.or]: [{ [sequelize_1.Op.and]: { pair1Id, pair2Id } }, { [sequelize_1.Op.and]: { pair1Id: pair2Id, pair2Id: pair1Id } }],
                name,
                tournamentId,
            },
        });
    }
    catch (error) {
        logger_1.logProcess(className + 'updateCell', 'error');
    }
    logger_1.logProcess(className + 'findFromPairs', 'end');
    return stage;
});
exports.findStage1 = findStage1;
const updateCell = (tournamentId, name, pair1Id, pair2Id, score) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.logProcess(className + 'updateCell', 'start');
    try {
        logger_1.logger.info('updateCell : ', tournamentId, name, pair1Id, pair2Id, score);
        const record = yield exports.findStage1(tournamentId, name, pair1Id, pair2Id);
        if (record) {
            if (record.pair1Id === pair1Id) {
                yield record.update({ score: !!score ? score : null });
            }
            else {
                yield record.update({ score: getOpposite(score ? parseInt(score) : null) });
            }
        }
        else {
            throw new Error('Record not found');
        }
    }
    catch (error) {
        logger_1.logProcess(className + 'updateCell', error);
        logger_1.logger.error('updateCell : ', error);
    }
    logger_1.logProcess(className + 'updateCell', 'end');
});
exports.updateCell = updateCell;
const generateStage1Rows = (pairsList, stageName, user) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.logProcess(className + 'generateStage1Rows', 'start');
    const rows = pairsList.map((e, ii) => {
        const row = {
            id: `row-${e.tournamentId}-${ii}`,
            rowNumber: ii + 1,
            pair: e,
            total: 0,
            placement: e.placement || 0,
        };
        for (let jj = 1; jj <= pairsList.length; jj++) {
            row[`col${jj}`] = null;
        }
        return row;
    });
    try {
        const connection = yield connection_1.getDbConnection();
        const transaction = yield connection.transaction();
        yield utils_1.asyncForEach(rows, (currentRow, index, rowsRef) => __awaiter(void 0, void 0, void 0, function* () {
            rowsRef[index]['total'] = 0;
            for (let currentRowKey in currentRow) {
                if (currentRowKey.startsWith('col')) {
                    let currentRowRef = rowsRef[index];
                    const rowIndex = currentRowRef.rowNumber;
                    const colIndex = parseInt(currentRowKey.substring(3));
                    let oppositeRow = rowsRef[colIndex - 1];
                    const pair1 = currentRowRef.pair;
                    const pair2 = oppositeRow.pair;
                    const { tournamentId } = pair1;
                    if (rowIndex !== colIndex) {
                        try {
                            const model = { name: stageName, tournamentId, pair1Id: pair1.id, pair2Id: pair2.id };
                            const isEditable = auth_manager_1.isAdmin(user);
                            const where = {
                                [sequelize_1.Op.or]: [
                                    { [sequelize_1.Op.and]: { pair1Id: pair1.id, pair2Id: pair2.id } },
                                    { [sequelize_1.Op.and]: { pair1Id: pair2.id, pair2Id: pair1.id } },
                                ],
                                name: stageName,
                                tournamentId,
                            };
                            const include = [models_1.Stage1.associations.pair1, models_1.Stage1.associations.pair2];
                            let record = null;
                            let created = false;
                            if (isEditable) {
                                [record, created] = yield models_1.Stage1.findOrCreate({
                                    where,
                                    defaults: model,
                                    transaction,
                                    include,
                                });
                            }
                            else
                                record = yield models_1.Stage1.findOne({ where, transaction, include });
                            if (!created && record) {
                                updateRow(currentRowRef, currentRowKey, oppositeRow, rowIndex, record.pair1Id === pair1.id ? record.score : getOpposite(record.score), record.pair1Id === pair1.id ? record.pair1.placement : record.pair2.placement);
                            }
                        }
                        catch (error) {
                            logger_1.logger.error('Error on  : ', currentRowRef, currentRowKey, error);
                        }
                    }
                }
            }
        }));
        yield transaction.commit();
        logger_1.logProcess(className + 'generateStage1Rows', 'end');
        return rows;
    }
    catch (error) {
        logger_1.logProcess(className + 'generateStage1Rows', error);
        logger_1.logger.error('generateStage1Rows : ', error);
    }
    return rows;
});
exports.generateStage1Rows = generateStage1Rows;
const updateRow = (currentRowRef, currentRowKey, oppositeRow, rowIndex, score, placement) => {
    currentRowRef[currentRowKey] = score !== undefined ? score : null;
    currentRowRef['placement'] = placement ? placement : 0;
    if (score !== undefined && score !== null) {
        currentRowRef['total'] = currentRowRef['total'] ? currentRowRef['total'] + score : score;
    }
    oppositeRow[`col${rowIndex}`] = getOpposite(score);
};
function getOpposite(value) {
    if (value === null)
        return null;
    switch (value) {
        case 3:
            return 0;
        case 2:
            return 1;
        case 1:
            return 2;
        case 0:
            return 3;
        default:
            return null;
    }
}
exports.getOpposite = getOpposite;
