import { createAsyncAction, createAction } from 'typesafe-actions';
import { defaultParam, defaultAsyncParams, PurgeResponse } from './constants';
import {
  CheckAuthenticationRequest,
  WatchSessionRequest,
  AuthenticationError,
  AuthenticationResponse,
  LoginRequest,
  RegisterRequest,
  LogoutRequest,
} from 'redux/models/session.model';

const actionName = '[Session]';

export const SessionAction = {
  // Register new user
  register: createAsyncAction(...defaultAsyncParams(actionName, 'Register User'))<
    RegisterRequest,
    AuthenticationResponse,
    AuthenticationError
  >(),
  // Login
  login: createAsyncAction(...defaultAsyncParams(actionName, 'Login User'))<
    LoginRequest,
    AuthenticationResponse,
    AuthenticationError
  >(),
  logout: createAsyncAction(...defaultAsyncParams(actionName, 'Logout User'))<
    LogoutRequest,
    AuthenticationResponse,
    AuthenticationError
  >(),
  // Check if user is already authenticate
  checkAuthentication: createAsyncAction(...defaultAsyncParams(actionName, 'Check User Authentication'))<
    CheckAuthenticationRequest,
    AuthenticationResponse,
    AuthenticationError
  >(),
  // Session watcher
  sessionControl: createAsyncAction(...defaultAsyncParams(actionName, 'Session Watcher'))<
    WatchSessionRequest,
    AuthenticationResponse,
    AuthenticationError
  >(),

  // set selected tournament
  updateSession: createAction(...defaultParam(actionName, 'Set Session'))<AuthenticationResponse>(),
  purge: createAction('persist/PURGE')<PurgeResponse>(),
};
