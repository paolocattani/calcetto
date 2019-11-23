
// 
// scotch.io/tutorials/getting-started-with-node-express-and-postgres-using-sequelize
// https://truetocode.com/using-sequelize-with-typescript-and-express-import-all-model-files/
// https://github.com/RobinBuschmann/sequelize-typescript/blob/master
//

import {isProductionMode} from '../../core/debug'
import * as config from '../../config/config.js';
import {Sequelize, SequelizeOptions } from 'sequelize-typescript';
import { Options } from 'sequelize/types';

export default (async () => {
    const envConfig: any | string | SequelizeOptions | Options = isProductionMode ? config.production : config.development;
    const uri:string = process.env[envConfig.use_env_variable]! ;
    const models:SequelizeOptions= {
        models : [__dirname + '/*.model.ts'],
        modelMatch: (filename, member) => {
            return filename.substring(0, filename.indexOf('.model')) === member.toLowerCase();
        },
    };     
    const sequelizeconnection = uri ? 
        new Sequelize(uri,models) : 
        new Sequelize(envConfig.database , envConfig.username, envConfig.password , models);

    return await sequelizeconnection.sync({force: true});
})

