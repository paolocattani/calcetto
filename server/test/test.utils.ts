import { UserDTO, PlayerRole } from '@common/dto';
import { logger } from '@core/logger';

export const APPLICATION_JSON = 'application/json';
export const TEST_HEADERS = {
	'Content-Type': APPLICATION_JSON,
};

export const getRandomUser = async (size = 1): Promise<RandomUserList> => {
	try {
		const response = await fetch('https://randomuser.me/api/?password=special,upper,lower,number,8-16&results=' + size);
		return await response.json();
	} catch (error) {
		logger.error('getRandomUser ', error);
		return;
	}
};

export const getFormattedRandomUser = async (size?: number): Promise<Array<UserDTO>> => {
	try {
		const users = await getRandomUser(size);
		if (users) {
			return users.results.map((u) => ({
				username: u.login.username,
				name: u.name.first,
				surname: u.name.last,
				email: u.email,
				confirmEmail: u.email,
				password: u.login.password,
				confirmPassword: u.login.password,
				phone: u.phone,
				birthday: u.registered.date,
				playerRole: PlayerRole.Master,
			}));
		} else {
			logger.error('getFormattedRandomUser ', users);
		}
	} catch (error) {
		logger.error('getFormattedRandomUser ', error);
		return null;
	}
};

export type RandomUserList = {
	results: Array<RandomUser>;
	info: {
		seed: string;
		results: number;
		page: number;
		version: string;
	};
};

export type RandomUser = {
	gender: string;
	name: {
		title: string;
		first: string;
		last: string;
	};
	location: {
		street: string;
		city: string;
		state: string;
		postcode: string;
		coordinates: {
			latitude: string;
			longitude: string;
		};
		timezone: {
			offset: string;
			description: string;
		};
	};
	email: string;
	login: {
		uuid: string;
		username: string;
		password: string;
		salt: string;
		md5: string;
		sha1: string;
		sha256: string;
	};
	dob: {
		date: Date;
		age: number;
	};
	registered: {
		date: Date;
		age: number;
	};
	phone: string;
	cell: string;
	id: {
		name: string;
		value: string;
	};
	picture: {
		large: string;
		medium: string;
		thumbnail: string;
	};
	nat: string;
};
