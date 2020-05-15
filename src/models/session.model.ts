import { UserDTO } from './user.model';
import { PlayerRole, UserMessage } from 'models';

export interface SessionState {
  user?: UserDTO;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  message?: UserMessage;
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
export interface CheckAuthenticationRequest {}
export interface WatchSessionRequest {}
export interface LoginRequest {}
export interface RegisterRequest {}

// Response
export interface AuthenticationResponse {
  user?: UserDTO;
  message?: UserMessage;
}

// Error
export interface AuthenticationError {
  message: string;
}
