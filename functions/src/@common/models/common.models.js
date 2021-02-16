"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialState = exports.Unauthorized = exports.UnexpectedServerError = exports.UserMessageType = exports.Environment = exports.SessionStatus = void 0;
const dto_1 = require("../dto");
const HttpStatusCode_1 = require("./HttpStatusCode");
var SessionStatus;
(function (SessionStatus) {
    SessionStatus["HEARTBEAT"] = "heartbeat";
    SessionStatus["SESSION_EXPIRED"] = "session_expired";
    SessionStatus["TOURNAMENT_NEW"] = "tournament_new";
    SessionStatus["TOURNAMENT_UPDATE"] = "tournament_update";
    SessionStatus["TOURNAMENT_DELETE"] = "tournament_delete";
    SessionStatus["STAGE1_UPDATE"] = "stage1_update";
    SessionStatus["STAGE1_DELETE"] = "stage1_delete";
    SessionStatus["STAGE2_UPDATE"] = "stage2_update";
    SessionStatus["STAGE2_DELETE"] = "stage2_delete";
})(SessionStatus = exports.SessionStatus || (exports.SessionStatus = {}));
var Environment;
(function (Environment) {
    Environment["development"] = "development";
    Environment["test"] = "test";
    Environment["production"] = "production";
})(Environment = exports.Environment || (exports.Environment = {}));
var UserMessageType;
(function (UserMessageType) {
    UserMessageType["Success"] = "success";
    UserMessageType["Warning"] = "warning";
    UserMessageType["Danger"] = "danger";
})(UserMessageType = exports.UserMessageType || (exports.UserMessageType = {}));
exports.UnexpectedServerError = {
    code: HttpStatusCode_1.HTTPStatusCode.InternalServerError,
    message: 'Unexpected Server Error',
    userMessage: {
        type: UserMessageType.Danger,
        label: 'common:server.unexpected',
    },
};
exports.Unauthorized = {
    user: undefined,
    code: HttpStatusCode_1.HTTPStatusCode.Unauthorized,
    message: 'Unauthorized!',
    userMessage: {
        type: UserMessageType.Danger,
        label: 'auth:expired',
    },
};
exports.initialState = {
    statsState: {
        isLoading: false,
    },
    tournamentState: {
        tournament: null,
        tournamentsList: [],
        isLoading: false,
    },
    playerState: {
        isLoading: false,
        playersList: [],
        isSaving: false,
    },
    pairState: {
        isLoading: false,
        isSaving: false,
    },
    authState: {
        isAuthenticated: false,
        isAdmin: false,
        isLoading: false,
    },
    stage1State: {
        toogleRefresh: false,
        selectedPairs: [
            {
                id: null,
                tournamentId: 0,
                rowNumber: 0,
                player1: {
                    id: null,
                    name: '',
                    surname: '',
                    alias: '',
                    label: '',
                    role: dto_1.PlayerRole.GoalKeeper,
                    email: '',
                    phone: '',
                    match_played: 0,
                    match_won: 0,
                    total_score: 0,
                    editable: false,
                    rowNumber: 0,
                },
                player2: {
                    id: null,
                    name: '',
                    surname: '',
                    alias: '',
                    label: '',
                    role: dto_1.PlayerRole.GoalKeeper,
                    email: '',
                    phone: '',
                    match_played: 0,
                    match_won: 0,
                    total_score: 0,
                    editable: false,
                    rowNumber: 0,
                },
                alias: '-',
                stage1Name: '',
                placement: 0,
                paid1: false,
                paid2: false,
            },
        ],
        isLoading: false,
        stages: [],
    },
    stage2State: {
        isLoading: false,
    },
};
