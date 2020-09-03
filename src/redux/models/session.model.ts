import { UserDTO } from './user.model';
import { PlayerRole } from 'redux/models';
import * as H from 'history';

export interface SessionState {
  user?: UserDTO;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
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
export interface CheckAuthenticationRequest {
  history: H.History<unknown>;
}
export interface WatchSessionRequest {
  history: H.History<unknown>;
}
export interface LoginRequest {
  user?: UserDTO;
}
export interface LogoutRequest {}

export interface RegisterRequest {}

// Response
export interface AuthenticationResponse {
  user?: UserDTO;
}

// Error
export interface AuthenticationError {
  message: string;
}
