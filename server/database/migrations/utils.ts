import { Sequelize } from 'sequelize';

export async function viewUp(context: Sequelize, viewName: string, viewBody: string) {
	// https://stackoverflow.com/questions/48407329/cant-able-to-create-views-in-mysql-using-sequelize-orm
	await context.query(`CREATE OR REPLACE VIEW ${viewName} AS ${viewBody}`);
}

export async function viewDown(context: Sequelize, viewName: string) {
	await context.query(`DROP VIEW ${viewName}`);
}
