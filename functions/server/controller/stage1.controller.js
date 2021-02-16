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
const express_1 = require("express");
const logger_1 = require("../core/logger");
const middleware_1 = require("../core/middleware");
const pair_manager_1 = require("../manager/pair.manager");
const stage1_manager_1 = require("../manager/stage1.manager");
const models_1 = require("../../src/@common/models");
const common_response_1 = require("./common.response");
const events_1 = require("../events/events");
const dto_1 = require("../../src/@common/dto");
const router = express_1.Router();
router.put('/update/placement', middleware_1.withAuth, middleware_1.withAdminRights, middleware_1.asyncMiddleware((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { rows } = req.body;
    const result = yield pair_manager_1.updatePlacement(rows);
    return result
        ? common_response_1.success(res, { label: 'stage1:position_done' })
        : common_response_1.failure(res, { label: 'stage1:position_not_done' });
})));
router.put('/update/cell', middleware_1.withAuth, middleware_1.withAdminRights, middleware_1.asyncMiddleware((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tId, stageName, pair1Id, pair2Id, score } = req.body;
    try {
        yield stage1_manager_1.updateCell(tId, stageName, pair1Id, pair2Id, score);
        const message = { status: models_1.SessionStatus.STAGE1_UPDATE, label: 'common:notification.updating' };
        events_1.sendNotifications(message, tId, dto_1.TournamentProgress.Stage1);
        return common_response_1.success(res, { label: 'stage1:cell_done' }, { saved: true });
    }
    catch (error) {
        logger_1.logger.error('/cell error', error);
        return common_response_1.failure(res, { label: 'stage1:cell_done' });
    }
})));
router.post('/', middleware_1.withAuth, middleware_1.asyncMiddleware((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { stageName, pairsList } = req.body;
    const { user, uuid } = req;
    try {
        const result = yield stage1_manager_1.generateStage1Rows(pairsList, stageName, user);
        events_1.subscribe(user, uuid, result[0].pair.tournamentId, dto_1.TournamentProgress.Stage1);
        return common_response_1.success(res, { label: 'stage1:loaded' }, { rows: result, stageName, pairsList });
    }
    catch (error) {
        logger_1.logger.error('Error while update matrix  : ', error);
        return common_response_1.failure(res, { label: 'stage1:error' });
    }
})));
router.delete('/', middleware_1.withAuth, middleware_1.withAdminRights, middleware_1.asyncMiddleware((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { tId } = req.body;
        yield stage1_manager_1.deleteStage1(tId);
        return common_response_1.success(res, { label: 'stage1:deleted' }, { saved: true });
    }
    catch (error) {
        logger_1.logger.error('Error while update matrix  : ', error);
        return common_response_1.failure(res, { label: 'stage1:error' });
    }
})));
exports.default = router;
