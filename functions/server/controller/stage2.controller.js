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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const chalk_1 = __importDefault(require("chalk"));
const logger_1 = require("../core/logger");
const middleware_1 = require("../core/middleware");
const stage2_manager_1 = require("../manager/stage2.manager");
const pair_manager_1 = require("../manager/pair.manager");
const common_response_1 = require("./common.response");
const models_1 = require("../../src/@common/models");
const events_1 = require("../events/events");
const dto_1 = require("../../src/@common/dto");
const router = express_1.Router();
router.post('/', middleware_1.withAuth, middleware_1.asyncMiddleware((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { tournamentId, count } = req.body;
        const { user, uuid } = req;
        if (!count || count === 0) {
            count = yield stage2_manager_1.countStage2(tournamentId);
        }
        const model = yield stage2_manager_1.generateStage2Rows(tournamentId, count, req.user);
        events_1.subscribe(user, uuid, tournamentId, dto_1.TournamentProgress.Stage2);
        return common_response_1.success(res, { label: 'stage2:loaded' }, { cells: model, count });
    }
    catch (error) {
        logger_1.logger.error(chalk_1.default.redBright('Error while fetching Stage2 ! : ', error));
        return common_response_1.serverError('POST stage2/ error ! : ', error, res);
    }
})));
router.get('/pairs/:tournamentId', middleware_1.withAuth, middleware_1.doNotCacheThis, middleware_1.asyncMiddleware((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.params.tournamentId) {
            return common_response_1.missingParameters(res);
        }
        const tournamentId = parseInt(req.params.tournamentId);
        const pairs = yield pair_manager_1.fetchPairsStage2(tournamentId);
        return common_response_1.success(res, { label: 'stage2:pairs' }, { pairs });
    }
    catch (error) {
        logger_1.logger.error(chalk_1.default.redBright('Error while fetching pairs Stage2 ! : ', error));
        return common_response_1.serverError('GET stage2/pairs/:tournamentId error ! : ', error, res);
    }
})));
router.post('/count', middleware_1.withAuth, middleware_1.doNotCacheThis, middleware_1.asyncMiddleware((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { tournamentId } = req.body;
        const count = yield stage2_manager_1.countStage2(tournamentId);
        return common_response_1.success(res, { label: 'stage2:count' }, { count });
    }
    catch (error) {
        logger_1.logger.error(chalk_1.default.redBright('Error while counting Stage2 ! : ', error));
        return common_response_1.serverError('POST stage2/count error ! : ', error, res);
    }
})));
router.post('/cells', middleware_1.withAuth, middleware_1.withAdminRights, middleware_1.asyncMiddleware((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cells } = req.body;
        yield stage2_manager_1.updateCells(cells);
        const tournamentId = cells[0].pair.tournamentId;
        const message = {
            status: models_1.SessionStatus.STAGE2_UPDATE,
            label: 'common:notification.updating',
            data: { tournamentId },
        };
        events_1.sendNotifications(message, tournamentId, dto_1.TournamentProgress.Stage2);
        return common_response_1.success(res, { label: 'stage2:updated_cell' });
    }
    catch (error) {
        logger_1.logger.error(chalk_1.default.redBright('Error while updating Stage2 cell ! : ', error));
        return common_response_1.serverError('POST stage2/cells error ! : ', error, res);
    }
})));
router.delete('/', middleware_1.withAuth, middleware_1.withAdminRights, middleware_1.asyncMiddleware((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { tId } = req.body;
        yield stage2_manager_1.deleteStage2(tId);
        return common_response_1.success(res, { label: 'stage2:loaded' });
    }
    catch (error) {
        logger_1.logger.error(chalk_1.default.redBright('Error while deleting Stage2 ! : ', error));
        return common_response_1.serverError('DELETE stage2/ error ! : ', error, res);
    }
})));
exports.default = router;
