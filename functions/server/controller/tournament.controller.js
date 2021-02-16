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
const tournament_manager_1 = require("../manager/tournament.manager");
const models_1 = require("../database/models");
const common_response_1 = require("./common.response");
const router = express_1.Router();
router.get('/list', middleware_1.withAuth, middleware_1.doNotCacheThis, middleware_1.asyncMiddleware((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tournamentsList = yield tournament_manager_1.listAll(req.user);
        return common_response_1.success(res, { label: tournamentsList.length > 1 ? 'tournament:loaded_2' : 'tournament:loaded_1' }, { tournamentsList });
    }
    catch (err) {
        return common_response_1.serverError('GET tournament/list error : ', err, res);
    }
})));
router.get('/:tId', middleware_1.withAuth, middleware_1.doNotCacheThis, middleware_1.asyncMiddleware((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.params.tId) {
            return common_response_1.missingParameters(res);
        }
        const tournament = yield tournament_manager_1.findById(req.user, parseInt(req.params.tId));
        if (!tournament) {
            return common_response_1.entityNotFound(res);
        }
        return common_response_1.success(res, { label: 'tournament:loaded_1' }, { tournament: tournament });
    }
    catch (err) {
        return common_response_1.serverError('GET tournament/{tId} error ! : ', err, res);
    }
})));
router.put('/update', middleware_1.withAuth, middleware_1.withAdminRights, middleware_1.asyncMiddleware((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const request = req.body;
        logger_1.logger.info(`Tournament ${request.tournament.name} updating....`);
        const tournament = yield tournament_manager_1.update(req.user, tournament_manager_1.parseBody(request.tournament));
        logger_1.logger.info(`Tournament ${request.tournament.name} updated`);
        return common_response_1.success(res, { label: 'tournament:saved' }, { tournament });
    }
    catch (err) {
        return common_response_1.serverError('PUT tournament/update error ! : ', err, res);
    }
})));
router.post('/new', middleware_1.withAuth, middleware_1.withAdminRights, middleware_1.asyncMiddleware((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const request = req.body;
    const model = tournament_manager_1.parseBody(request.tournament);
    const user = req.user;
    try {
        let t = yield tournament_manager_1.findByNameAndDate(model.name, model.date, user);
        if (t) {
            logger_1.logger.info(`Tournament ${model.name} already exists....`);
            return common_response_1.failure(res, { label: 'tournament:duplicated', options: { name: model.name } });
        }
        model.ownerId = user.id;
        t = yield models_1.Tournament.create(model);
        const tournament = tournament_manager_1.convertEntityToDTO(t);
        logger_1.logger.info(`Created Tournament => ${t}`);
        return common_response_1.success(res, { label: 'tournament:saved' }, { tournament });
    }
    catch (err) {
        return common_response_1.serverError('POST tournament/new error ! : ', err, res);
    }
})));
router.delete('/delete', middleware_1.withAuth, middleware_1.withAdminRights, middleware_1.asyncMiddleware((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const request = req.body;
        yield tournament_manager_1.deleteTournament(tournament_manager_1.parseBody(request.tournament));
        return common_response_1.success(res, { label: 'tournament:deleted' }, { tournament: request.tournament });
    }
    catch (error) {
        return common_response_1.serverError('DELETE tournament/delete error ! : ', error, res);
    }
})));
router.delete('/test/delete', middleware_1.withAuth, middleware_1.withAdminRights, middleware_1.withTestAuth, middleware_1.asyncMiddleware((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield tournament_manager_1.deleteAllTournament();
        return common_response_1.success(res, { label: 'tournament:deleted' });
    }
    catch (error) {
        return common_response_1.serverError('DELETE tournament/delete error ! : ', error, res);
    }
})));
exports.default = router;
