"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TEST_USER_2 = exports.TEST_USER_1 = void 0;
const player_dto_1 = require("../../../../src/@common/dto/player.dto");
exports.TEST_USER_1 = {
    username: 'dummy1',
    name: 'William1',
    surname: 'J. Ayers1',
    email: 'WilliamJAyers@spy1.com',
    cEmail: 'WilliamJAyers@spy1.com',
    password: 'dummyPassword1',
    cPassword: 'dummyPassword1',
    phone: '0362 3981901',
    birthday: new Date(1939, 0, 16),
    playerRole: player_dto_1.PlayerRole.Master,
};
exports.TEST_USER_2 = {
    username: 'dummy2',
    name: 'William2',
    surname: 'J. Ayers2',
    email: 'WilliamJAyers@army2.com',
    cEmail: 'WilliamJAyers@army2.com',
    password: 'dummyPassword12',
    cPassword: 'dummyPassword12',
    phone: '0362 398190022',
    birthday: new Date(1939, 0, 16),
    playerRole: player_dto_1.PlayerRole.GoalKeeper,
};
