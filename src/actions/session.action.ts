import { createAsyncAction, createAction } from 'typesafe-actions';
import { Failure, Success, Request } from './constants';
import {
  CheckAuthenticationRequest,
  WatchSessionRequest,
  AuthenticationError,
  AuthenticationResponse,
  LoginRequest,
  RegisterRequest,
} from 'models/session.model';

const ActionName = '[Session]';

export const SessionAction = {
  // Register new user
  register: createAsyncAction(
    `${ActionName} Register ${Request}`,
    `${ActionName} Register ${Success}`,
    `${ActionName} Register ${Failure}`
  )<RegisterRequest, AuthenticationResponse, AuthenticationError>(),
  // Login
  login: createAsyncAction(
    `${ActionName} Login ${Request}`,
    `${ActionName} Login ${Success}`,
    `${ActionName} Login ${Failure}`
  )<LoginRequest, AuthenticationResponse, AuthenticationError>(),
  // Check if user is already authenticate
  checkAuthentication: createAsyncAction(
    `${ActionName} Get Session ${Request}`,
    `${ActionName} Get Session ${Success}`,
    `${ActionName} Get Session ${Failure}`
  )<CheckAuthenticationRequest, AuthenticationResponse, AuthenticationError>(),
  // Session watcher
  sessionControl: createAsyncAction(
    `${ActionName} Watch Session ${Request}`,
    `${ActionName} Watch Session ${Success}`,
    `${ActionName} Watch Session ${Failure}`
  )<WatchSessionRequest, AuthenticationResponse, AuthenticationError>(),
  // set selected tournament
  updateSession: createAction(`${ActionName} Set Session`)<AuthenticationResponse>(),
};
