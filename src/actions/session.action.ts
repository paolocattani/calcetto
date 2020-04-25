import { createAsyncAction } from 'typesafe-actions';
import { Failure, Success, Request } from './constants';
import { CheckAuthenticationRequest, CheckAuthenticationResponse } from 'models/session.model';

const ActionName = '[Session]';

export const SessionAction = {
  // Check if user is already authenticate
  checkAuthentication: createAsyncAction(
    `${ActionName} Get Session ${Request}`,
    `${ActionName} Get Session ${Success}`,
    `${ActionName} Get Session ${Failure}`
  )<CheckAuthenticationRequest, CheckAuthenticationResponse, Error>(),
};
