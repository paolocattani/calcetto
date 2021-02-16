"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEmptyPlayer = void 0;
const dto_1 = require("../dto");
const getEmptyPlayer = (label) => ({
    id: null,
    name: '',
    surname: '',
    alias: '',
    label: label || '',
    role: dto_1.PlayerRole.GoalKeeper,
    email: '',
    phone: '',
    match_played: 0,
    match_won: 0,
    total_score: 0,
    editable: false,
    rowNumber: 0,
});
exports.getEmptyPlayer = getEmptyPlayer;
