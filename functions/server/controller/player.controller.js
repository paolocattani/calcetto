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
const middleware_1 = require("../core/middleware");
const player_manager_1 = require("../manager/player.manager");
const common_response_1 = require("./common.response");
const router = express_1.Router();
router.get('/list/:tId', middleware_1.withAuth, middleware_1.withAdminRights, middleware_1.asyncMiddleware((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const playersList = yield player_manager_1.listAllInTournament(req.params.tId ? parseInt(req.params.tId) : 0);
        return common_response_1.success(res, { label: 'player:loaded' }, { playersList });
    }
    catch (error) {
        return common_response_1.serverError('GET player/list/:tId error ! : ', error, res);
    }
})));
router.get('/list', middleware_1.withAuth, middleware_1.asyncMiddleware((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const playersList = yield player_manager_1.listAll();
        return common_response_1.success(res, { label: 'player:loaded' }, { playersList });
    }
    catch (error) {
        return common_response_1.serverError('GET player/list/ error ! : ', error, res);
    }
})));
router.put('/update', middleware_1.withAuth, middleware_1.withAdminRights, middleware_1.asyncMiddleware((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { player: dto } = req.body;
    try {
        let player = yield player_manager_1.findById(dto.id);
        if (!player) {
            return common_response_1.entityNotFound(res);
        }
        let playerTest = yield player_manager_1.findByNameSurname(dto.name, dto.surname);
        if (playerTest && playerTest.id !== player.id) {
            return common_response_1.failure(res, { label: 'player:duplicated' }, 'Player already exists');
        }
        yield player_manager_1.update(dto);
        return common_response_1.success(res, { label: 'player:updated' }, { player: dto });
    }
    catch (error) {
        return common_response_1.serverError('PUT player/update error ! : ', error, res);
    }
})));
router.post('/new', middleware_1.withAuth, middleware_1.withAdminRights, middleware_1.asyncMiddleware((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { player: model } = req.body;
    try {
        if (!model.name || !model.surname) {
            return common_response_1.missingParameters(res);
        }
        let player = yield player_manager_1.findByNameSurname(model.name, model.surname);
        if (player) {
            return common_response_1.failure(res, { label: 'player:duplicated' }, 'Player already exists');
        }
        const dto = yield player_manager_1.create(model);
        return common_response_1.success(res, { label: 'player:saved' }, { player: dto });
    }
    catch (error) {
        return common_response_1.serverError('POST player/new error ! : ', error, res);
    }
})));
router.delete('/delete', middleware_1.withAuth, middleware_1.withAdminRights, middleware_1.asyncMiddleware((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const request = req.body;
        const rowsAffected = yield player_manager_1.deletePlayer(request.players.map((e) => player_manager_1.parseBody(e)));
        return common_response_1.success(res, { label: rowsAffected > 1 ? 'player:deleted_2' : 'player:deleted_1' }, { playersList: request.players });
    }
    catch (error) {
        return common_response_1.serverError('DELETE player/delete error ! : ', error, res);
    }
})));
exports.default = router;
