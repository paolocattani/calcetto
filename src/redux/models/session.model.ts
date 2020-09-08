import { UserDTO } from './user.model';
import { PlayerRole } from 'redux/models';
import * as H from 'history';
import { UserMessage, GenericReponse } from './common.model';

export interface SessionState {
  user?: UserDTO;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  message?: UserMessage; // FIXME: unsed
}

export interface UserRegistration {
  username: string;
  name: string;
  surname: string;
  password: string;
  email: string;
  phone: string;
  birthday: string;
  playerRole: PlayerRole;
}

export interface SessionDTO {}

// Request
export interface AuthenticationRequest {
  history: H.History<unknown>;
}
export interface CheckAuthenticationRequest extends AuthenticationRequest {}
export interface WatchSessionRequest extends AuthenticationRequest {}
export interface LogoutRequest extends AuthenticationRequest {}
export interface LoginRequest extends AuthenticationRequest {
  username: string;
  password: string;
}
export interface DeleteUserRequest extends AuthenticationRequest {
  username: string;
  email: string;
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
  cEmail: string;
  password: string;
  cPassword: string;
  phone: string;
  birthday: Date | null;
  playerRole: PlayerRoleType;
}

export type PlayerRoleType = {
  value: PlayerRole;
  label: PlayerRole;
};

// Response
export interface AuthenticationResponse extends GenericReponse {
  user?: UserDTO;
}

export interface RegistrationResponse extends GenericReponse {
  errors?: Array<string>;
  user?: UserDTO;
}

// Error
export interface AuthenticationError extends GenericReponse {}
