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
const connection_1 = require("../database/config/connection");
const models_1 = require("../database/models");
const middleware_1 = require("../core/middleware");
const pair_manager_1 = require("../manager/pair.manager");
const common_response_1 = require("./common.response");
const router = express_1.Router();
router.get('/list/', middleware_1.withAuth, middleware_1.doNotCacheThis, middleware_1.asyncMiddleware((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user, query } = req;
        if (!query.tId) {
            return common_response_1.missingParameters(res);
        }
        const tId = parseInt(query.tId);
        logger_1.logger.info(`Looking for pairs in tournament ${chalk_1.default.greenBright(tId.toString())}`);
        const pairsList = yield pair_manager_1.listInTournament(tId, user);
        return common_response_1.success(res, { label: 'pair:loaded' }, { pairsList });
    }
    catch (err) {
        return common_response_1.serverError('GET pair/list error : ', err, res);
    }
})));
router.get('/alias', middleware_1.withAuth, middleware_1.withAdminRights, middleware_1.asyncMiddleware((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { player1Id, player2Id } = req.query;
        logger_1.logger.info('/alias : ', player1Id, player2Id);
        if (!player1Id || !player2Id) {
            return common_response_1.missingParameters(res);
        }
        const alias = yield pair_manager_1.findAlias(parseInt(player1Id), parseInt(player2Id));
        return common_response_1.success(res, { label: 'pair:loaded' }, { alias });
    }
    catch (err) {
        return common_response_1.serverError('GET pair/alias error : ', err, res);
    }
})));
router.put('/selected', middleware_1.withAuth, middleware_1.withAdminRights, middleware_1.asyncMiddleware((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { stage1Rows, stage1Name, tournamentId } = req.body;
    const connection = yield connection_1.getDbConnection();
    const transaction = yield connection.transaction();
    if (!stage1Rows) {
        return common_response_1.missingParameters(res);
    }
    try {
        yield models_1.Pair.update({ stage2Selected: false }, { where: { tournamentId, stage1Name }, transaction });
        if (stage1Rows.length > 0) {
            yield models_1.Pair.update({ stage2Selected: true }, { where: { tournamentId, stage1Name, id: stage1Rows.map((e) => e.pair.id) }, transaction });
        }
        yield transaction.commit();
    }
    catch (err) {
        logger_1.logger.error('PUT pair/selected error : ', err);
        yield transaction.rollback();
        return common_response_1.serverError('PUT pair/selected error : ', err, res);
    }
    return common_response_1.success(res, { label: stage1Rows.length > 1 ? 'pair:selected_2' : 'pair:selected_1' }, { stage1Rows, stage1Name });
})));
router.post('/new', middleware_1.withAuth, middleware_1.withAdminRights, middleware_1.asyncMiddleware((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const dto = pair_manager_1.parseBodyToPair(req.body.pair);
    try {
        let pair = null;
        if (dto.id)
            pair = yield models_1.Pair.findOne({ where: { id: dto.id } });
        if (pair) {
            yield pair.update(dto);
            logger_1.logger.info(`updated => ${pair.toString()}`);
        }
        else {
            pair = yield models_1.Pair.create(dto);
            logger_1.logger.info(`created => ${pair.toString()}`);
        }
        return common_response_1.success(res, { label: 'pair:saved' }, { pair: pair_manager_1.rowToModel(pair, pair.id) });
    }
    catch (err) {
        return common_response_1.serverError('POST pair/ error : ', err, res);
    }
})));
router.delete('/delete', middleware_1.withAuth, middleware_1.withAdminRights, middleware_1.asyncMiddleware((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const request = req.body;
        if (request.pairsList.length === 0) {
            return common_response_1.missingParameters(res);
        }
        yield models_1.Pair.destroy({ where: { id: request.pairsList.map((e) => e.id) } });
        return common_response_1.success(res, { label: request.pairsList.length > 1 ? 'pair:deleted_2' : 'pair:deleted_1' }, {
            pairsList: request.pairsList,
        });
    }
    catch (err) {
        return common_response_1.serverError('DELETE pair/delete error : ', err, res);
    }
})));
exports.default = router;
