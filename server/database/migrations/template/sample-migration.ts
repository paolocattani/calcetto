/* eslint-disable quotes */
import { Migration, UmzugContext } from '../';
import { logMigrationEnd, logMigrationStart } from '../../../core/logger';

// you can put some team-specific imports/code here to be included in every migration
const migrationName = 'migrationName';
export const up: Migration = async ({ context: sequelize }: UmzugContext) => {
	logMigrationStart('up', migrationName);
	await sequelize.query("raise fail('down migration not implemented')");
	logMigrationEnd('up', migrationName);
};

export const down: Migration = async ({ context: sequelize }: UmzugContext) => {
	logMigrationStart('down', migrationName);
	await sequelize.query("raise fail('down migration not implemented')");
	logMigrationEnd('down', migrationName);
};
