import * as H from 'history';
import { GenericReponse } from '@common/models/common.models';
import { PlayerRole, UserDTO } from '@common/dto';

//## STATE
export interface SessionState {
  user?: UserDTO;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
}

//## OTHER
export interface SessionDTO {}
export type PlayerRoleType = {
  value: PlayerRole;
  label: PlayerRole;
};

//## REQUEST - RESPONSE - ERROR
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
  playerRole: PlayerRole;
}

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
