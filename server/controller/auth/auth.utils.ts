// Password utils
import bcrypt from "bcryptjs";
import {UserDTO} from "../../../src/@common/dto";
import jwt from "jsonwebtoken";

// Password
const DEFAULT_HASH = 'dummy$Hash';
export const TOKEN_SECRET = process.env.SERVER_HASH || DEFAULT_HASH;
const generateHashSecret = (email: string, password: string) => email + TOKEN_SECRET + password;

export const generatePassword = async (email: string, password: string) =>
	await bcrypt.hash(generateHashSecret(email, password), 10);

export const comparePasswords = async (email: string, password: string, hash: string): Promise<boolean> =>
	await bcrypt.compare(generateHashSecret(email, password), hash);


// wrapper per verificare il token
export const safeVerifyToken = (token: any): [UserDTO | null, boolean] => {
	let decoded = null;
	try {
		decoded = jwt.verify(token, TOKEN_SECRET) as UserDTO;
		return [decoded, true];
	} catch (error) {
		return [null, false];
	}
};




