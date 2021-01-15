import Umzug from 'umzug';
import { getDbConnection } from '../connection';

// https://github.com/sequelize/umzug
const getUmzug = async (): Promise<Umzug.Umzug> => {
	const connection = await getDbConnection();
	return new Umzug({
		migrations: {
			path: './',
			pattern: new RegExp('/.migration.js$/'),
			params: [connection.getQueryInterface()],
		},
		storage: 'sequelize',
		storageOptions: {
			sequelize: connection,
		},
	});
};

// Checks migrations and run them if they are not already applied. To keep
// track of the executed migrations, a table (and sequelize model) called SequelizeMeta
// will be automatically created (if it doesn't exist already) and parsed.
export const migrationUp = async () => (await getUmzug()).up();
export const migrationDown = async () => (await getUmzug()).down();
