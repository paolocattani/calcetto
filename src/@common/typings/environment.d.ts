// Target the module containing the `ProcessEnv` interface
// https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation
import { Environment } from '../models/common.models';

declare namespace NodeJS {
	export interface ProcessEnv {
		// Environment
		NODE_ENV: Environment;
		// Client
		// API server host
		REACT_APP_SERVER_HOST: string;
		// Current git Tag + Creation date
		REACT_APP_CLIENT_VERSION: string;
		// Current Commit Hash
		REACT_APP_CLIENT_COMMIT_HASH: string;
		// React build options
		INLINE_RUNTIME_CHUNK: boolean;
		GENERATE_SOURCEMAP: boolean;
		// Server
		// Port
		PORT: number;
		// Origin white list
		ORIGIN_WHITE_LIST: string;
		// In dev enviroment drop and recreate db
		SERVER_FORCE: boolean;
		// Cookies duration
		SERVER_TOKEN_EXPIRES_IN: string;
		// Cookies/Session secret
		SERVER_SECRET: string;
		// Jwt secret
		SERVER_HASH: string;
		// In production env cache static contents for 1000 milliseconds
		STATIC_CONTENTS_CACHE: number;
		// PM2 keys
		PM2_PUBLIC_KEY: string;
		PM2_SECRET_KEY: string;
		// Sql
		DATABASE_URL: string;
		DATABASE_SCHEMA: string;
		// Redis
		REDISCLOUD_URL: string;

		// Development
		REACT_EDITOR?: string;
	}
}
