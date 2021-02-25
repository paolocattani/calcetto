import { viewUp, viewDown } from '../utils';
import { logMigrationStart, logMigrationEnd } from '../../../core/logger';
import { Migration, UmzugContext } from '..';

const viewName = 'stats_pairs';
const migrationName = '01_stats_pairs';

export const up: Migration = async ({ context: sequelize }: UmzugContext) => {
	// https://stackoverflow.com/questions/48407329/cant-able-to-create-views-in-mysql-using-sequelize-orm
	// https://stackoverflow.com/questions/48407329/cant-able-to-create-views-in-mysql-using-sequelize-orm
	logMigrationStart('up', migrationName);
	const viewBody = `
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
	await viewUp(sequelize, viewName, viewBody);
	logMigrationEnd('up', migrationName);
};

export const down: Migration = async ({ context: sequelize }: UmzugContext) => {
	logMigrationStart('down', migrationName);
	await viewDown(sequelize, viewName);
	logMigrationEnd('down', migrationName);
};
