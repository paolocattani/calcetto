// Target the module containing the `ProcessEnv` interface
// https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation
import { Environment } from '../../../src/@common/models/common.models';

declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: Environment;
    CLIENT_HOST: string;
    CLIENT_PORT: number;
    REACT_APP_CLIENT_VERSION: string;
    REACT_APP_CLIENT_COMMIT_HASH: string;
    CLIENT_COMMIT_HASH: string;
    PORT: number;
    HTTPS: boolean;
    // React build Options
    INLINE_RUNTIME_CHUNK: boolean;
    //FIXME: Avoid Heroku to prune devDependencies ( remove this after server transpile )
    NPM_CONFIG_PRODUCTION: boolean;
    // Server
    SERVER_HOST: string;
    SERVER_PORT: number;
    SERVER_WORKERS: number;
    SERVER_FORCE: boolean;
    //Authentication
    // use this format for EXPIRES_IN :  https://github.com/zeit/ms.js
    SERVER_TOKEN_EXPIRES_IN: string;
    SERVER_SECRET: string;
    SERVER_HASH: string;

    //Dbs
    DEV_URL: string;
    TEST_URL: string;
		TEST_SCHEMA?:string;
    DATABASE_URL: string;

    // max age for static contents
    STATIC_CONTENTS_CACHE: number;

    REACT_EDITOR?: string;
  }
}
