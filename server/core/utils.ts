import bcrypt from 'bcrypt';

export function getRandomIntInclusive(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

export async function asyncForEach<T>(
  array: Array<T>,
  callback: (element: T, index: number, array: Array<T>) => void
): Promise<void> {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

export function logEntity(entity: any) {
  return JSON.stringify(entity, null, 2);
}

// Password utils
export function generatePassword(email: string, password: string) {
  const saltRounds = 10;
  const hashPassword = async () => await bcrypt.hash(generateSecret(email, password), saltRounds);

  return hashPassword();
}

export function comparePasswords(email: string, password: string, hash: string) {
  const compare = async () => await bcrypt.compare(generateSecret(email, password), hash);
  return compare();
}

function generateSecret(email: string, password: string) {
  return email + process.env.SERVER_HASH ? process.env.SERVER_HASH : 'dummy$Hash' + password;
}
