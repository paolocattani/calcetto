import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from 'model/sequelize/user.model';

export const getRandomIntInclusive = (min: number, max: number): number =>
  Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + Math.ceil(min);

export async function asyncForEach<T>(
  array: Array<T>,
  callback: (element: T, index: number, array: Array<T>) => void
): Promise<void> {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

export const logEntity = (entity: any) => JSON.stringify(entity, null, 2);

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
