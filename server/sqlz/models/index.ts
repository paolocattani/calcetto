
// scotch.io/tutorials/getting-started-with-node-express-and-postgres-using-sequelize
// https://truetocode.com/using-sequelize-with-typescript-and-express-import-all-model-files/

import {isProductionMode} from '../../core/debug'
import * as config from '../config/config.js';
import * as fs from 'fs';
import * as path from 'path';
import {Sequelize, SequelizeOptions } from 'sequelize-typescript';
import { Options } from 'sequelize/types';

export default class Db{
    customersone: any;
    constructor() {
        return this.sequelize();
    }

    public sequelize():any {
        // TODO: check construtor
        const envConfig: any | string | SequelizeOptions | Options = isProductionMode ? config.production : config.development;
        const uri:string = process.env[envConfig.use_env_variable]! ;
        const models:SequelizeOptions= {
            models : [__dirname + '/*.model.ts'],
            modelMatch: (filename, member) => {
                return filename.substring(0, filename.indexOf('.model')) === member.toLowerCase();
            },
        };     
        return uri ? 
            new Sequelize(uri,models) : 
            new Sequelize(envConfig.database , envConfig.username, envConfig.password , models);
        //const sequelizeconnection = uri ? 
        //    new Sequelize(uri) : 
        //    new Sequelize(envConfig.database , envConfig.username, envConfig.password , envConfig);

        //const db:any = {};
        //const modelPath = path.join(__dirname );
        //fs.readdirSync(modelPath)
        //  .filter(file => (file.indexOf('.') !== 0) && (file.slice(-3) === '.js'))
        //  .forEach((file) => {
        //    const model = sequelizeconnection.import(modelPath + file);
        //    db[model.name] = model;
        //});
        //
        //Object.keys(db).forEach((modelName) => {
        //    if (db[modelName].associate) db[modelName].associate(db);
        //});
        //db.sequelize = sequelizeconnection;
        //return db;
    }
}
