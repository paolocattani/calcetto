import { UserDTO } from '../../../src/@common/dto';

declare namespace Express {
	interface Request {
		session: {
			user: UserDTO;
			uuid: string;
		};
	}
}
