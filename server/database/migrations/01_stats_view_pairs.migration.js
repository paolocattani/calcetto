import { getDbConnection } from '../database/connection';

const viewName = 'stats_player';
async function up({ context: queryInterface }) {
	// https://stackoverflow.com/questions/48407329/cant-able-to-create-views-in-mysql-using-sequelize-orm
	const viewBody = `
		select
			pl.id playerId, pl."name" "name", pl.surname surname , pa.id pairId,
			coalesce(countPairMatch(pa.id,1, true) ,0 ) pair1Winnings,
			coalesce(countPairMatch(pa.id,2, true),0 ) pair2Winnings,
			coalesce(countPairMatch(pa.id,1, false),0 ) pair1Defeats,
			coalesce(countPairMatch(pa.id,1, false),0 ) pair2Defeats,
			coalesce(s2w.tot, 0 ) stage2Winnings,
			coalesce(s2l.tot, 0 ) stage2Defeats
		from player pl
		join pairs pa on pa."player1Id" = pl.id or pa."player2Id" = pl.id
		left join (
			select s2."pairId" "pairId", count(*) tot from stage2 s2 group by s2."pairId"
		) s2w on s2w."pairId" = pa.id
		left join (
			select s2."pairId" "pairId", count(*) tot from stage2 s2 group by s2."pairId"
		) s2l on s2l."pairId" = pa.id
		order by pl.id, pa.id
	`;
	const dbConnection = await getDbConnection();
	await dbConnection.query(`CREATE OR REPLACE VIEW ${viewName} AS ${viewBody}`);
}

async function down({ context: queryInterface }) {
	const dbConnection = await getDbConnection();
	await dbConnection.query(`DROP VIEW ${viewName}`);
}

export default { up, down };