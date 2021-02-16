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
const date_utils_1 = require("../../src/@common/utils/date.utils");
const middleware_1 = require("../core/middleware");
const pair_manager_1 = require("../manager/pair.manager");
const stats_manager_1 = require("../manager/stats.manager");
const common_response_1 = require("./common.response");
const router = express_1.Router();
const STATS_LOADED = 'stats:loaded';
const STATS_ERROR = 'stats:error';
router.get('/summary', middleware_1.withAuth, middleware_1.doNotCacheThis, middleware_1.asyncMiddleware((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const aWeekAgo = new Date();
        aWeekAgo.setDate(aWeekAgo.getDate() - 7);
        const aWeekAgoString = date_utils_1.formatDate(aWeekAgo, '-');
        const aMonthAgo = new Date();
        aMonthAgo.setMonth(aMonthAgo.getMonth() - 1);
        const aMonthAgoString = date_utils_1.formatDate(aMonthAgo, '-');
        const pairEver = yield stats_manager_1.getBestPairs();
        const pairWeek = yield stats_manager_1.getBestPairs(aWeekAgoString);
        const pairMonth = yield stats_manager_1.getBestPairs(aMonthAgoString);
        const playerEver = yield stats_manager_1.getBestPlayers();
        const playerWeek = yield stats_manager_1.getBestPlayers(aWeekAgoString);
        const playerMonth = yield stats_manager_1.getBestPlayers(aMonthAgoString);
        return pairEver && playerEver
            ? common_response_1.success(res, { label: STATS_LOADED }, {
                pairs: { ever: pairEver, month: pairMonth, week: pairWeek },
                players: { ever: playerEver, month: playerMonth, week: playerWeek },
            })
            : common_response_1.failure(res, { label: STATS_ERROR });
    }
    catch (error) {
        return common_response_1.serverError('GET stats/pair/best error ! : ', error, res);
    }
})));
router.get('/player/bests', middleware_1.withAuth, middleware_1.doNotCacheThis, middleware_1.asyncMiddleware((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { from } = req.query;
        const stats = yield stats_manager_1.getBestPlayers(from);
        return stats
            ? common_response_1.success(res, { label: STATS_LOADED }, { stats })
            : common_response_1.failure(res, { label: STATS_ERROR });
    }
    catch (error) {
        return common_response_1.serverError('GET stats/player/best error ! : ', error, res);
    }
})));
router.get('/pair/bests', middleware_1.withAuth, middleware_1.doNotCacheThis, middleware_1.asyncMiddleware((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { from } = req.query;
        const stats = yield stats_manager_1.getBestPairs(from);
        return stats
            ? common_response_1.success(res, { label: STATS_LOADED }, { stats })
            : common_response_1.failure(res, { label: STATS_ERROR });
    }
    catch (error) {
        return common_response_1.serverError('GET stats/pair/best error ! : ', error, res);
    }
})));
router.post('/player', middleware_1.withAuth, middleware_1.asyncMiddleware((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { players } = req.body;
        if (!players || players.length === 0) {
            return common_response_1.missingParameters(res);
        }
        const stats = {};
        for (const playerId of players) {
            const statsPplayer = yield stats_manager_1.getStatsByPlayer(playerId);
            if (statsPplayer) {
                stats[`${playerId}`] = statsPplayer;
            }
        }
        return common_response_1.success(res, { label: STATS_LOADED }, { stats });
    }
    catch (error) {
        return common_response_1.serverError('POST stats/player error ! : ', error, res);
    }
})));
router.post('/pair', middleware_1.withAuth, middleware_1.asyncMiddleware((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { pairs } = req.body;
        if (!pairs || pairs.length === 0) {
            return common_response_1.missingParameters(res);
        }
        const stats = {};
        for (const pairId of pairs) {
            const pair = yield pair_manager_1.findById(pairId);
            if (pair && pair.player1 && pair.player2) {
                const statsPair = yield stats_manager_1.getStatsByPairs(pair.player1.id, pair.player2.id);
                if (statsPair) {
                    stats[`${pairId}`] = statsPair;
                }
            }
        }
        return common_response_1.success(res, { label: STATS_LOADED }, { stats });
    }
    catch (error) {
        return common_response_1.serverError('POST stats/pair error ! : ', error, res);
    }
})));
router.get('/pair', middleware_1.withAuth, middleware_1.doNotCacheThis, middleware_1.asyncMiddleware((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { player1Id: player1IdString, player2Id: player2IdString } = req.query;
        if (!player1IdString || player2IdString) {
            return common_response_1.missingParameters(res);
        }
        let player1Id = parseInt(player1IdString);
        let player2Id = parseInt(player2IdString);
        const stats = yield stats_manager_1.getStatsByPairs(player1Id, player2Id);
        return stats
            ? common_response_1.success(res, { label: STATS_LOADED }, { stats })
            : common_response_1.failure(res, { label: STATS_ERROR });
    }
    catch (error) {
        return common_response_1.serverError('GET stats/pair error ! : ', error, res);
    }
})));
exports.default = router;
