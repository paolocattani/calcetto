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
exports.down = exports.up = void 0;
const utils_1 = require("./utils");
const logger_1 = require("../../core/logger");
const viewName = 'stats_players';
const migrationName = '00_stats_players';
const up = ({ context: sequelize }) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.logMigrationStart('up', migrationName);
    const viewBody = `
		select
			row_number() over (order by playerId) id,
			playerId,sum(s1Win) s1Win,sum(s1Def) s1Def,sum(s2Win) s2Win,sum(s2Def) s2Def,
			sum(s1Win + s2Win) totWin,sum(s1Def + s2Def) totDef,
			case when sum(s1Def + s2Def) != 0 then (sum(s1Win + s2Win)/sum(s1Def + s2Def))::float else '+Infinity'::float end ratioTot
		from (
			select sp."player1Id" playerId,sum(s1Win) s1Win,sum(s1Def) s1Def,sum(s2Win) s2Win,sum(s2Def) s2Def
			from stats_pairs sp
			group by sp."player1Id"
			union
			select sp."player2Id" playerId,sum(s1Win) s1Win,sum(s1Def) s1Def,sum(s2Win) s2Win,sum(s2Def) s2Def
			from stats_pairs sp
			group by sp."player2Id"
		) stats_player
		group by playerId
		order by playerId
	`;
    yield utils_1.viewUp(sequelize, viewName, viewBody);
    logger_1.logMigrationEnd('up', migrationName);
});
exports.up = up;
const down = ({ context: sequelize }) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.logMigrationStart('down', migrationName);
    yield utils_1.viewDown(sequelize, viewName);
    logger_1.logMigrationEnd('down', migrationName);
});
exports.down = down;
