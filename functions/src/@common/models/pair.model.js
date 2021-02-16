"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEmptyPair = void 0;
const player_model_1 = require("./player.model");
const getEmptyPair = (label, tournamentId = 0) => ({
    id: null,
    tournamentId,
    rowNumber: 0,
    player1: player_model_1.getEmptyPlayer(),
    player2: player_model_1.getEmptyPlayer(),
    alias: label || '',
    stage1Name: '',
    placement: 0,
    paid1: false,
    paid2: false,
});
exports.getEmptyPair = getEmptyPair;
