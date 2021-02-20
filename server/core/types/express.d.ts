import { Session, SessionData } from 'express-session';
import { UserDTO } from '../../../src/@common/dto';

declare global {
	namespace Express {
		interface Request {
			session: Session & Partial<SessionData>;
		}
	}
}

declare module 'express-session' {
	interface SessionData {
		user: UserDTO;
		uuid: string;
	}
}
