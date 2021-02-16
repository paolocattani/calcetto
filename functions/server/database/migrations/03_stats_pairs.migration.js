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
const viewPairName = 'stats_pairs';
const viewPlayerName = 'stats_players';
const functionPairName = 'getPairStats';
const functionPlayerName = 'getPlayerStats';
const migrationName = '03_stats';
const up = ({ context: sequelize }) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.logMigrationStart('up', migrationName);
    let functionParams = "p_date varchar default '1900-01-01'";
    let functionReturn = 'table(id bigint,player1Id integer,player2Id integer,s1win numeric,s1def numeric,s2win numeric,s2def numeric,totwin numeric,totdef numeric, ratioTot float )';
    let functionBody = `
		select
			row_number() over (order by least("player1Id" ,"player2Id" ), greatest("player1Id" ,"player2Id" )) id,
			least("player1Id" ,"player2Id" ) "player1Id",
			greatest("player1Id" ,"player2Id" ) "player2Id",
			sum(s1Win) s1Win,sum(s1Def) s1Def,
			sum(s2Win) s2Win,sum(s2Def) s2Def,
			sum(s1Win + s2Win) totWin,sum(s1Def + s2Def) totDef,
			case when sum(s1Def + s2Def) != 0 then (sum(s1Win + s2Win)/sum(s1Def + s2Def))::float else '+Infinity' end ratioTot
		from (
			select
				pa."player1Id" ,pa."player2Id", count(s1.id) filter (where s1.score > 1) s1Win,
				count(s1.id) filter (where s1.score < 2) s1Def,
				coalesce(min(s2w.total), 0) s2Win, coalesce(min(s2d.total), 0) s2Def
			from pairs pa
			join tournament t on pa."tournamentId" =t.id and t."date" >= p_date::date
			join stage1 s1 on s1."pair1Id" = pa.id or s1."pair2Id" = pa.id
			-- stage1 winnings
			left join (
				select s2."pairId" pairId, count(*) total from stage2 s2 where step > 0 group by s2."pairId"
			) s2w on s2w.pairId = pa.id
			-- stage2 defeats
			left join (
				select s2."pairId" pairId, count(*) total from stage2 s2
				-- Exclude pairs that doesn't exists in next step
				where "pairId" is not null and not exists (
					select s3."pairId" pairId from stage2 s3
					where s3.step = s2.step +1 and s3."pairId" = s2."pairId"  and s3."tournamentId" = s2."tournamentId"
				-- Exclude last step
				) and s2.step != (
					select max(step) from stage2 s3 where s3."tournamentId" = s2."tournamentId"
				)
				group by s2."pairId"
			) s2d on s2d.pairId = pa.id
			group by pa."player1Id" ,pa."player2Id"
		) stat_player
		group by least("player1Id" ,"player2Id" ), greatest("player1Id" ,"player2Id" )
		order by least("player1Id" ,"player2Id" ), greatest("player1Id" ,"player2Id" )
	`;
    yield utils_1.functionUp(sequelize, functionPairName, functionParams, functionReturn, functionBody);
    functionParams = "p_date varchar default '1900-01-01'";
    functionReturn =
        'table(id bigint,playerId integer,s1win numeric,s1def numeric,s2win numeric,s2def numeric,totwin numeric,totdef numeric, ratioTot float )';
    functionBody = `
		select
			row_number() over (order by playerId) id,
			playerId,sum(s1Win) s1Win,sum(s1Def) s1Def,sum(s2Win) s2Win,sum(s2Def) s2Def,
			sum(s1Win + s2Win) totWin,sum(s1Def + s2Def) totDef,
			case when sum(s1Def + s2Def) != 0 then (sum(s1Win + s2Win)/sum(s1Def + s2Def))::float else '+Infinity'::float end ratioTot
		from (
			select sp."player1id" playerId,sum(s1Win) s1Win,sum(s1Def) s1Def,sum(s2Win) s2Win,sum(s2Def) s2Def
			from ${functionPairName}(p_date) sp
			group by sp."player1id"
			union
			select sp."player2id" playerId,sum(s1Win) s1Win,sum(s1Def) s1Def,sum(s2Win) s2Win,sum(s2Def) s2Def
			from ${functionPairName}(p_date) sp
			group by sp."player2id"
		) stats_player
		group by playerId
		order by playerId
	`;
    yield utils_1.functionUp(sequelize, functionPlayerName, functionParams, functionReturn, functionBody);
    yield utils_1.viewDown(sequelize, viewPlayerName);
    yield utils_1.viewDown(sequelize, viewPairName);
    let viewBody = `select * from ${functionPairName}()`;
    yield utils_1.viewUp(sequelize, viewPairName, viewBody);
    viewBody = `select * from ${functionPlayerName}()`;
    yield utils_1.viewUp(sequelize, viewPlayerName, viewBody);
    logger_1.logMigrationEnd('up', migrationName);
});
exports.up = up;
const down = ({ context: sequelize }) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.logMigrationStart('down', migrationName);
    yield utils_1.viewDown(sequelize, viewPlayerName);
    yield utils_1.viewDown(sequelize, viewPairName);
    yield utils_1.functionDown(sequelize, functionPlayerName);
    yield utils_1.functionDown(sequelize, functionPairName);
    let viewBody = `
		select
			row_number() over (order by least("player1Id" ,"player2Id" ), greatest("player1Id" ,"player2Id" )) id,
			least("player1Id" ,"player2Id" ) "player1Id",
			greatest("player1Id" ,"player2Id" ) "player2Id",
			sum(s1Win) s1Win,sum(s1Def) s1Def,
			sum(s2Win) s2Win,sum(s2Def) s2Def,
			sum(s1Win + s2Win) totWin,sum(s1Def + s2Def) totDef,
			case when sum(s1Def + s2Def) != 0 then (sum(s1Win + s2Win)/sum(s1Def + s2Def))::float else '+Infinity' end ratioTot
		from (
			select
				pa."player1Id" ,pa."player2Id", count(s1.id) filter (where s1.score > 1) s1Win,
				count(s1.id) filter (where s1.score < 2) s1Def,
				coalesce(min(s2w.total), 0) s2Win, coalesce(min(s2d.total), 0) s2Def
			from pairs pa
			join stage1 s1 on s1."pair1Id" = pa.id or s1."pair2Id" = pa.id
			-- stage1 winnings
			left join (
				select s2."pairId" pairId, count(*) total from stage2 s2 where step > 0 group by s2."pairId"
			) s2w on s2w.pairId = pa.id
			-- stage2 defeats
			left join (
				select s2."pairId" pairId, count(*) total from stage2 s2
				-- Exclude pairs that doesn't exists in next step
				where "pairId" is not null and not exists (
					select s3."pairId" pairId from stage2 s3
					where s3.step = s2.step +1 and s3."pairId" = s2."pairId"  and s3."tournamentId" = s2."tournamentId"
				-- Exclude last step
				) and s2.step != (
					select max(step) from stage2 s3 where s3."tournamentId" = s2."tournamentId"
				)
				group by s2."pairId"
			) s2d on s2d.pairId = pa.id
			group by pa."player1Id" ,pa."player2Id"
		) stat_player
		group by least("player1Id" ,"player2Id" ), greatest("player1Id" ,"player2Id" )
		order by least("player1Id" ,"player2Id" ), greatest("player1Id" ,"player2Id" )
	`;
    yield utils_1.viewUp(sequelize, viewPairName, viewBody);
    viewBody = `
		select
			row_number() over (order by playerId) id,
			playerId,sum(s1Win) s1Win,sum(s1Def) s1Def,sum(s2Win) s2Win,sum(s2Def) s2Def,
			sum(s1Win + s2Win) totWin,sum(s1Def + s2Def) totDef,
			case when sum(s1Def + s2Def) != 0 then (sum(s1Win + s2Win)/sum(s1Def + s2Def))::float else '+Infinity'::float end ratioTot
		from (
			select sp."player1id" playerId,sum(s1Win) s1Win,sum(s1Def) s1Def,sum(s2Win) s2Win,sum(s2Def) s2Def
			from ${viewPairName} sp
			group by sp."player1id"
			union
			select sp."player2id" playerId,sum(s1Win) s1Win,sum(s1Def) s1Def,sum(s2Win) s2Win,sum(s2Def) s2Def
			from ${viewPairName} sp
			group by sp."player2id"
		) stats_player
		group by playerId
		order by playerId
	`;
    yield utils_1.viewUp(sequelize, viewPlayerName, viewBody);
    logger_1.logMigrationEnd('down', migrationName);
});
exports.down = down;
