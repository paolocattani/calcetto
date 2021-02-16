"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const player_controller_1 = __importDefault(require("./player.controller"));
const pair_controller_1 = __importDefault(require("./pair.controller"));
const tournament_controller_1 = __importDefault(require("./tournament.controller"));
const stage1_controller_1 = __importDefault(require("./stage1.controller"));
const stage2_controller_1 = __importDefault(require("./stage2.controller"));
const auth_controller_1 = __importDefault(require("./auth/auth.controller"));
const stats_controller_1 = __importDefault(require("./stats.controller"));
const events_1 = require("../events/events");
const HttpStatusCode_1 = require("../../src/@common/models/HttpStatusCode");
const middleware_1 = require("../core/middleware");
exports.default = (application) => {
    const controller = [
        { name: 'Pair', api: '/api/v2/Pair', router: pair_controller_1.default },
        { name: 'Auth', api: '/api/v2/auth', router: auth_controller_1.default },
        { name: 'Stats', api: '/api/v2/stats', router: stats_controller_1.default },
        { name: 'Player', api: '/api/v2/player', router: player_controller_1.default },
        { name: 'Stage1', api: '/api/v2/stage1', router: stage1_controller_1.default },
        { name: 'Stage2', api: '/api/v2/stage2', router: stage2_controller_1.default },
        { name: 'Tournament', api: '/api/v2/tournament', router: tournament_controller_1.default },
    ];
    controller.forEach((c) => {
        application.use(c.api, (req, res, next) => middleware_1.controllerLogger(req, next, c.name, c.api), c.router);
    });
    application.get('/sse/v1/session', middleware_1.withAuth, events_1.sessionControl);
    application.get('/status', (req, res) => res
        .status(HttpStatusCode_1.HTTPStatusCode.OK)
        .json({ code: HttpStatusCode_1.HTTPStatusCode.ImATeapot, message: "I ain't gonna brew coffee. I'm a fucking teapot!" }));
    application.get('/__coverage__', (req, res) => res.json({ coverage: global.__coverage__ || null }));
};
