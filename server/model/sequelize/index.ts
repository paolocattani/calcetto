
//
// scotch.io/tutorials/getting-started-with-node-express-and-postgres-using-sequelize
// https://truetocode.com/using-sequelize-with-typescript-and-express-import-all-model-files/
// https://github.com/RobinBuschmann/sequelize-typescript
//

import { isProductionMode } from '../../core/debug'
import config from '../../config/config.js';
import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import { Options } from 'sequelize';
import { logger } from '../../core/logger';

export default async function syncModel(): Promise<Sequelize> {
    const envConfig: any | string | SequelizeOptions | Options = isProductionMode ? config.production : config.development;
    const uri: string = process.env[envConfig.use_env_variable]!;
    const models: SequelizeOptions = {
        dialect: "postgres",
        models: [__dirname + '/*.model.ts'],
        modelMatch: (filename: string, member: string) => {
            return filename.substring(0, filename.indexOf('.model')) === member.toLowerCase();
        },
    };
    const sequelizeconnection = uri ?
        new Sequelize(uri, models) :
        new Sequelize(envConfig.database, envConfig.username, envConfig.password, models);

    const syncDb = await sequelizeconnection.sync();
    logger.info("Database creation complete!");
    return syncDb;

}

