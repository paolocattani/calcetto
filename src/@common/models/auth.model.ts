import * as H from 'history';
import { GenericResponse, I18nLabel } from './common.models';
import { PlayerRole, UserDTO } from '../dto';

//## STATE
export interface AuthState {
	user?: UserDTO;
	isAuthenticated: boolean;
	isAdmin: boolean;
	isLoading: boolean;
}

//## OTHER
export type PlayerRoleType = {
	value: PlayerRole;
	label: PlayerRole;
};

//## REQUEST - RESPONSE - ERROR
// Request
export interface AuthenticationRequest {
	history: H.History;
}
export interface CheckAuthenticationRequest extends AuthenticationRequest {}
export interface LogoutRequest extends AuthenticationRequest {}
export interface LoginRequest extends AuthenticationRequest {
	username: string;
	password: string;
}
export interface DeleteUserRequest extends AuthenticationRequest {
	password: string;
}

export interface UpdateUserRequest extends AuthenticationRequest {
	user: UserDTO;
}

export interface RegistrationRequest extends AuthenticationRequest {
	username: string;
	name: string;
	surname: string;
	email: string;
	confirmEmail: string;
	password: string;
	confirmPassword: string;
	phone: string;
	birthday: Date | null;
	playerRole: PlayerRole;
}

// Response
export interface CSRFResponse extends GenericResponse {
	token: string;
}
export interface AuthenticationResponse extends GenericResponse {
	user?: UserDTO;
}

export interface RegistrationResponse extends GenericResponse {
	errors?: Array<I18nLabel>;
	user?: UserDTO;
}
export interface DeleteUserResponse extends GenericResponse {}
export interface UnsubscribeResponse extends GenericResponse {}

// Error
export interface AuthenticationError extends GenericResponse {}
