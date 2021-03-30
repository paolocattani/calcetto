// don't forget to import the original module
import 'express-session';

declare module 'express-session' {
	interface SessionData {
		jwt: string;
		csrfSecret: string;
		uuid: string;
	}
}
