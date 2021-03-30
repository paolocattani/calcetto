import AppServer from 'express/AppServer';

declare global {
	namespace NodeJS {
		interface Global {
			__APPLICATION__: AppServer;
		}
	}
}
