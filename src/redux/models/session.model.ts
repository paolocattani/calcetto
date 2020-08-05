import { UserDTO } from './user.model';
import { PlayerRole, UserMessage } from 'redux/models';
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
export interface LoginRequest {}
export interface RegisterRequest {}

// Response
export interface AuthenticationResponse {
  user?: UserDTO;
  message?: UserMessage;
  showMessage?: boolean;
}

// Error
export interface AuthenticationError {
  message: string;
}
