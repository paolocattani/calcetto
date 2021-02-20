import { Session, SessionData } from 'express-session';
import { UserDTO } from '../../../src/@common/dto';

declare module 'express-session' {
	export interface SessionData {
		user: UserDTO;
		uuid: string;
	}
}

declare global {
	namespace Express {
		interface Request {
			session: Session & Partial<SessionData>;
			sessionID: string;
		}
	}
}
