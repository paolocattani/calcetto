import Umzug from 'umzug';
import { dbConnection } from '../express/AppServer';

const umzug = new Umzug({
  migrations: {
    path: './migrations',
    pattern: new RegExp('/.migration.ts$/'),
    params: [dbConnection.getQueryInterface()],
  },
  storage: 'sequelize',
  storageOptions: {
    sequelize: dbConnection,
  },
});

// Checks migrations and run them if they are not already applied. To keep
// track of the executed migrations, a table (and sequelize model) called SequelizeMeta
// will be automatically created (if it doesn't exist already) and parsed.
export const runMigration = async () => await umzug.up();
