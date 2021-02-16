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
const models_1 = require("../database/models");
const utils_1 = require("../core/utils");
const logger_1 = require("../core/logger");
const debug_1 = require("../core/debug");
const chalk_1 = __importDefault(require("chalk"));
const dto_1 = require("../../src/@common/dto");
const TOURNAMENT_RECORDS = 10;
const players = [
    { name: 'Andrea', surname: 'Messi', alias: 'Messi', email: '', phone: '', role: 'Master' },
    { name: 'Paolo', surname: 'Cattani', alias: 'Pool', email: '', phone: '', role: 'Master' },
    { name: 'Gilberto', surname: 'Turato', alias: 'Gilbe', email: '', phone: '', role: 'Master' },
    { name: 'Enrico', surname: 'Bevilacqua', alias: 'Tocio', email: '', phone: '', role: 'Master' },
    { name: 'Dante', surname: 'Riello', alias: 'The Wall ', email: '', phone: '', role: 'Master' },
    { name: 'Michele', surname: 'Maschio', alias: 'Tope', email: '', phone: '', role: 'Master' },
    { name: 'Fede', surname: 'Beggiato', alias: 'Fede', email: '', phone: '', role: 'Attaccante' },
    { name: 'Salvatore', surname: 'Bonanno', alias: 'Salvo', email: '', phone: '', role: 'Attaccante' },
    { name: 'Gianni', surname: 'Guion', alias: 'Gianni', email: '', phone: '', role: 'Portiere' },
    { name: 'Lorenzo', surname: '', alias: 'Lorenzo', email: '', phone: '', role: 'Portiere' },
    { name: 'Niero', surname: '', alias: 'Niero', email: '', phone: '', role: 'Attaccante' },
    { name: 'Renzo', surname: 'Pinton', alias: 'Renzo', email: '', phone: '', role: 'Portiere' },
    { name: 'Fabio', surname: 'Zambello', alias: 'Fabio', email: '', phone: '', role: 'Attaccante' },
    { name: 'Amante', surname: '', alias: 'Amante', email: '', phone: '', role: 'Attaccante' },
    { name: 'Vanni', surname: '', alias: 'Vanni', email: '', phone: '', role: 'Portiere' },
    { name: 'Mirco', surname: 'Dalan', alias: 'Mirco', email: '', phone: '', role: 'Portiere' },
    { name: 'Jacopo', surname: '', alias: 'Jacopo', email: '', phone: '', role: 'Attaccante' },
    { name: 'Melanie', surname: '', alias: 'Melanie', email: '', phone: '', role: 'Attaccante' },
    { name: 'Luca', surname: '', alias: 'Luca', email: '', phone: '', role: 'Portiere' },
    { name: 'Daniel', surname: '', alias: 'Daniel', email: '', phone: '', role: 'Attaccante' },
];
function generator(start) {
    return __awaiter(this, void 0, void 0, function* () {
        if (start === false || debug_1.isProductionMode()) {
            return;
        }
        logger_1.logger.info(chalk_1.default.cyan.bold('Starting dummy data generator....'));
        yield tournamentGenerator();
        yield playerGenerator();
        yield pairGenerator();
        logger_1.logger.info(chalk_1.default.cyan.bold('Generation complete !'));
    });
}
exports.default = generator;
function tournamentGenerator() {
    return __awaiter(this, void 0, void 0, function* () {
        for (let ii = 1; ii <= TOURNAMENT_RECORDS; ii++) {
            const model = {
                id: null,
                name: 'Torneo' + ii,
                date: new Date(),
                progress: dto_1.TournamentProgress.New,
                autoOrder: ii % 2 == 0,
                public: true,
            };
            yield models_1.Tournament.create(model);
        }
    });
}
function playerGenerator() {
    return __awaiter(this, void 0, void 0, function* () {
        for (let ii = 0; ii < players.length; ii++)
            yield models_1.Player.create({
                name: players[ii].name,
                surname: players[ii].surname,
                alias: players[ii].alias,
                role: players[ii].role,
            });
    });
}
function pairGenerator() {
    return __awaiter(this, void 0, void 0, function* () {
        for (let ii = 1; ii <= players.length / 2; ii++) {
            const model = {
                id: null,
                tournamentId: 1,
                player1Id: utils_1.getRandomIntInclusive(1, players.length),
                player2Id: utils_1.getRandomIntInclusive(1, players.length),
                alias: ii % 2 === 0 ? `PAlias${ii}` : '',
            };
            yield models_1.Pair.create(model);
        }
    });
}
