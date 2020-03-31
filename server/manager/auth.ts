// Models/Types
import Player from 'model/sequelize/player.model';
import { PlayerRole } from 'model/sequelize/types';
import { UserDTO } from '../model/dto/user';
import User from '../model/sequelize/user.model';
// Logger utils
import { logProcess } from '../core/logger';
// Password
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
// managers
import * as playerManager from './player';
import { Op } from 'sequelize';

// Const
const className = 'Authentication Manager : ';

// Password utils
export const generatePassword = async (email: string, password: string) =>
  await bcrypt.hash(generateHashSecret(email, password), 10);

export const comparePasswords = async (email: string, password: string, hash: string): Promise<boolean> =>
  await bcrypt.compare(generateHashSecret(email, password), hash);

export const getSecret = () => (process.env.SERVER_HASH ? process.env.SERVER_HASH : 'dummy$Hash');

export const generateHashSecret = (email: string, password: string) => email + getSecret() + password;

export const generateToken = (value: string | User) =>
  typeof value === 'string'
    ? jwt.sign({ email: value }, getSecret(), { expiresIn: '8h', algorithm: 'HS256' })
    : jwt.sign({ name: value.name, surname: value.surname, role: value.role, email: value.email }, getSecret(), {
        expiresIn: '8h',
        algorithm: 'HS256'
      });

export const listAll = async (): Promise<UserDTO[]> => {
  try {
    logProcess(className + 'listAll', 'start');
    const users = await User.findAll({
      order: [['id', 'DESC']],
      include: [User.associations.player]
    });
    logProcess(className + 'listAll', 'end');
    return users.map(user => convertEntityToDTO(user));
  } catch (error) {
    logProcess(className + 'listAll', ` Error : ${error}`);
    return [];
  }
};

export const deleteUser = async (user: User): Promise<void> => {
  try {
    logProcess(className + 'deleteUser', 'start');
    await user.destroy();
    logProcess(className + 'deleteUser', 'end');
  } catch (error) {
    logProcess(className + 'deleteUser', ` Error : ${error}`);
  }
};

export const registerUser = async (user: User, playerRole?: string): Promise<UserDTO | null> => {
  try {
    logProcess(className + 'registerUser', 'start');
    user.password = await generatePassword(user.email, user.password);
    if (user.name.startsWith('[A]')) {
      user.name = user.name.substring(3);
      user.role = 'Admin';
    } else {
      user.role = 'User';
    }
    const record = await User.create(user);
    // Se è stato assegnato un ruolo allora creo anche il giocatore
    if (playerRole) {
      const model = {
        name: record.name,
        surname: record.surname,
        email: record.email,
        phone: record.phone,
        userId: record.id,
        alias: `${record.name} ${record.surname}`,
        role: playerRole as PlayerRole
      } as Player;
      const player = await playerManager.create(model);
      if (player) await record.update({ playerId: player.id });
    }
    logProcess(className + 'registerUser', 'end');
    return convertEntityToDTO(record);
  } catch (error) {
    logProcess(className + 'registerUser', ` Error : ${error}`);
    return null;
  }
};

// Utils
export function isAdmin(token: string | object): boolean {
  let isAdmin: boolean = false;
  if (token && typeof token === 'string') {
    const decodedUser = jwt.verify(token, getSecret()) as User;
    if (decodedUser.role === 'Admin') isAdmin = true;
  }
  return isAdmin;
}

export async function getUserFromToken(token: string | object): Promise<User | null> {
  if (token && typeof token === 'string') {
    const decodedUser = jwt.verify(token, getSecret()) as User;
    return decodedUser.email ? await findUserByEmail(decodedUser.email) : decodedUser;
  } else return null;
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

export async function findUserByEmailOrUsername(username: string) {
  try {
    logProcess(className + 'findUserByEmailOrUsername', '');
    return await User.findOne({ where: { [Op.or]: [{ email: username }, { username }] } });
  } catch (error) {
    logProcess(className + 'findUserByEmailOrUsername', ` Error : ${error}`);
    return null;
  }
}

export async function checkIfExist(user: User) {
  try {
    logProcess(className + 'checkIfExist', '');
    return await User.findOne({ where: { [Op.or]: [{ email: user.email }, { username: user.username }] } });
  } catch (error) {
    logProcess(className + 'checkIfExist', ` Error : ${error}`);
    return null;
  }
}

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
  birthday: user.birthday || null,
  label: user.label,
  role: user.role
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
    role: body.role
  } as User);
