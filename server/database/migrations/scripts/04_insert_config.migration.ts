import { Migration, UmzugContext } from '..';
import { logMigrationEnd, logMigrationStart } from '../../../core/logger';
import Config from '../../models/config.model';

const migrationName = '04_insert_config';
const tableName = 'config';
const config: Array<Partial<Config>> = [
	{ id: 1, key: 'MAX_ATTEMPS_PER_MINUTE', value: '5', notes: 'Max login attemps per minute' },
	{ id: 2, key: 'MAX_ATTEMPS_PER_DAY', value: '25', notes: 'Max login attemps per day' },
];
export const up: Migration = async ({ context: sequelize }: UmzugContext) => {
	logMigrationStart('up', migrationName);
	await sequelize.getQueryInterface().bulkInsert(tableName, config);
	logMigrationEnd('up', migrationName);
};

export const down: Migration = async ({ context: sequelize }: UmzugContext) => {
	logMigrationStart('down', migrationName);
	await sequelize.getQueryInterface().bulkDelete(tableName, { key: config.map((c) => c.key!) });
	logMigrationEnd('down', migrationName);
};
