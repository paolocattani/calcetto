// Models/Types
import { User } from '../database';
import { UserDTO, UserRole, PlayerRole, PlayerDTO } from '../../src/@common/dto';
// Logger utils
import { logProcess, logger } from '../core/logger';
// managers
import * as playerManager from './player.manager';
import { Op } from 'sequelize';
import { lowerWrapper } from '../core/utils';
import { RegistrationRequest } from '../../src/@common/models/auth.model';
import { I18nLabel } from '../../src/@common/models';
import { generatePassword } from '../controller/auth/auth.utils';

// Const
const className = 'Authentication Manager : ';
export const phoneRegExp = new RegExp('^d{10}$');
export const passwordRegExp = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,16})');
export const emailRegExp = new RegExp(
	// eslint-disable-next-line quotes
	"^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"
);

// List all users
export const listAll = async (): Promise<UserDTO[]> => {
	try {
		logProcess(className + 'listAll', 'start');
		const users = await User.findAll({
			order: [['id', 'DESC']],
			include: [User.associations.player],
		});
		logProcess(className + 'listAll', 'end');
		return users.map((user) => convertEntityToDTO(user));
	} catch (error) {
		logProcess(className + 'listAll', ` Error : ${error}`);
		return [];
	}
};

// Delete users
export const deleteUser = async (user: User): Promise<void> => {
	try {
		logProcess(className + 'deleteUser', 'start');
		await user.destroy();
		logProcess(className + 'deleteUser', 'end');
	} catch (error) {
		logProcess(className + 'deleteUser', ` Error : ${error}`);
	}
};

// Register new user
export const registerUser = async (user: User, playerRole?: PlayerRole): Promise<UserDTO | null> => {
	try {
		logProcess(className + 'registerUser', 'start');
		user.password = await generatePassword(user.email, user.password);
		if (user.name.startsWith('[A]')) {
			user.name = user.name.substring(3);
			user.role = UserRole.Admin;
		} else {
			user.role = UserRole.User;
		}
		// logger.info(`User : ${JSON.stringify(user, null, 2)}`);
		const record = await User.create(user);
		// Se è stato assegnato un ruolo allora creo anche il giocatore
		if (playerRole && playerRole !== PlayerRole.NotAPlayer) {
			const model = {
				name: record.name,
				surname: record.surname,
				email: record.email,
				phone: record.phone,
				userId: record.id,
				alias: `${record.name} ${record.surname}`,
				role: playerRole,
			} as PlayerDTO;
			logger.info(`Player : ${JSON.stringify(model)}`);
			const player = await playerManager.create(model);
			if (player) {
				logger.info(`User : ${JSON.stringify(record, null, 2)}`);
				await record.update({ playerId: player.id });
			}
		}
		logProcess(className + 'registerUser', 'end');
		return convertEntityToDTO(record);
	} catch (error) {
		logProcess(className + 'registerUser', ` Error : ${error}`);
		return null;
	}
};

// Utils
export function isAdmin(user?: UserDTO): boolean {
	if (!user) return false;
	return user && user.role === UserRole.Admin;
}

export async function findUserByEmail(email: string) {
	try {
		logProcess(className + 'findUserByEmail', '');
		return await User.findOne({ where: { email } });
	} catch (error) {
		logProcess(className + 'findUserByEmail', ` Error : ${error}`);
		return null;
	}
}

export async function findUserDTOByEmailOrUsername(username: string) {
	try {
		logProcess(className + 'findUserDTOByEmailOrUsername', '');
		const user = await User.findOne({
			where: {
				[Op.or]: [lowerWrapper('email', username), lowerWrapper('username', username)],
			},
		});
		return user ? convertEntityToDTO(user) : null;
	} catch (error) {
		logProcess(className + 'findUserDTOByEmailOrUsername', ` Error : ${error}`);
		return null;
	}
}

export async function findUserByEmailOrUsername(username: string, email: string) {
	try {
		logProcess(className + 'findUserByEmailOrUsername', '');
		return await User.findOne({
			where: {
				[Op.or]: [lowerWrapper('email', email), lowerWrapper('username', username)],
			},
		});
	} catch (error) {
		logProcess(className + 'findUserByEmailOrUsername', ` Error : ${error}`);
		return null;
	}
}

export async function findUserByEmailAndUsername(email: string, username: string) {
	try {
		logProcess(className + 'findUserByEmailAndUsername', '');
		return await User.findOne({
			where: {
				[Op.and]: [lowerWrapper('email', email), lowerWrapper('username', username)],
			},
		});
	} catch (error) {
		logProcess(className + 'findUserByEmailAndUsername', ` Error : ${error}`);
		return null;
	}
}

export const isValidRegister = (user: Omit<RegistrationRequest, 'history'>): Array<I18nLabel> => {
	let result: Array<I18nLabel> = [];
	if (!user.username) {
		result.push({ label: 'auth:error.username' });
	}
	if (!user.name) {
		result.push({ label: 'auth:error.name' });
	}
	if (!user.surname) {
		result.push({ label: 'auth:error.surname' });
	}
	if (!user.email) {
		result.push({ label: 'auth:error.email.address' });
	}
	if (!user.confirmEmail) {
		result.push({ label: 'auth:error.email.confirm' });
	}
	if (user.email !== user.confirmEmail) {
		result.push({ label: 'auth:error.email.match' });
	}
	if (!emailRegExp.test(user.email)) {
		result.push({ label: 'auth:error.email.validation' });
	}
	if (!user.password) {
		result.push({ label: 'auth:error.password.password' });
	}
	if (!user.confirmPassword) {
		result.push({ label: 'auth:error.password.confirm' });
	}
	if (user.password !== user.confirmPassword) {
		result.push({ label: 'auth:error.password.match' });
	}
	if (!passwordRegExp.test(user.password)) {
		result.push({ label: 'auth:error.password.validation' });
	}
	return result;
};

/**
 * Converte l'entity in un DTO da passare al FE.
 * @param user  User entity
 */
export const convertEntityToDTO = (user: User): UserDTO => ({
	id: user.id,
	username: user.username,
	name: user.name,
	surname: user.surname,
	email: user.email,
	phone: user.phone || '',
	birthday: user.birthday!,
	label: user.label,
	role: user.role,
});

/**
 * Si potrebbe usare lo spread {...body} ma essendo dati che arrivano dall'utente
 * preferisco impostare le proprietà manualmente.
 *
 * @param body : Request body
 */
export const parseBody = (body: any) =>
	({
		id: body.id || null,
		username: body.username,
		name: body.name,
		surname: body.surname,
		password: body.password,
		email: body.email,
		phone: body.phone,
		birthday: body.birthday,
		role: body.role,
	} as User);
