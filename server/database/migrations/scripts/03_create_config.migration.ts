/* eslint-disable quotes */
import { DataType } from 'sequelize-typescript';
import { Migration, UmzugContext } from '..';
import { logMigrationEnd, logMigrationStart } from '../../../core/logger';

const migrationName = '03_create_config';
const tableName = 'config';
export const up: Migration = async ({ context: sequelize }: UmzugContext) => {
	logMigrationStart('up', migrationName);

	await sequelize.getQueryInterface().createTable(tableName, {
		id: {
			type: DataType.INTEGER,
			allowNull: false,
			primaryKey: true,
		},
		configSet: {
			type: DataType.STRING,
			allowNull: false,
			defaultValue: 'BASE',
		},
		key: {
			type: DataType.STRING,
			unique: true,
			allowNull: false,
		},
		value: DataType.STRING,
		notes: DataType.STRING,
		createdAt: DataType.DATE,
		updatedAt: DataType.DATE,
	});
	logMigrationEnd('up', migrationName);
};

export const down: Migration = async ({ context: sequelize }: UmzugContext) => {
	logMigrationStart('down', migrationName);
	await sequelize.getQueryInterface().dropTable(tableName);
	logMigrationEnd('down', migrationName);
};
