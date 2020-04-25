import { UserDTO } from './user.model';

export interface SessionState {
  user?: UserDTO;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
}

export interface SessionDTO {}

export interface SessionDTO {}

export interface CheckAuthenticationRequest {}
export interface CheckAuthenticationResponse {
  user?: UserDTO;
}
