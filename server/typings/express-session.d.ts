// ./typings/express-session.d.ts
// don't forget to import the original module
import 'express-session';

// FIXME: unsued
declare module 'express-session' {
	interface SessionData {
		username: string; // whatever property you like
	}
}
