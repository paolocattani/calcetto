import { viewUp, viewDown } from './utils';
import { logMigrationStart, logMigrationEnd } from '../../core/logger';
import { Migration, UmzugContext } from '.';

const viewName = 'stats_players';
const migrationName = '00_stats_players';

export const up: Migration = async ({ context: sequelize }: UmzugContext) => {
	logMigrationStart('up', migrationName);
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
	await viewUp(sequelize, viewName, viewBody);
	logMigrationEnd('up', migrationName);
};

export const down: Migration = async ({ context: sequelize }: UmzugContext) => {
	logMigrationStart('down', migrationName);
	await viewDown(sequelize, viewName);
	logMigrationEnd('down', migrationName);
};
