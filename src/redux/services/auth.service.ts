import {
  AuthenticationResponse,
  LoginRequest,
  RegistrationRequest,
  RegistrationResponse,
  UpdateUserRequest,
  DeleteUserRequest,
} from '../../@common/models';
import { eventChannel, buffers, END } from 'redux-saga';
import { HTTPStatusCode } from '@common/models/HttpStatusCode';
import { OmitHistory, UnexpectedServerError, UserMessageType } from '@common/models/common.models';
import { putWrapper, deleteWrapper, postWrapper, getWrapper } from '@common/utils';

export enum SessionStatus {
  // Sessione scaduta, reindirizza l'utente alla login
  SESSION_EXPIRED = 'session_expired',
  // Necessario aggiornamento dati su Stage1
  NEED_REFRESH = 'need_refresh',
}

export interface Message {
  status: SessionStatus;
  message?: string;
}

// Update
export const updateUser = async (updateUserRequest: OmitHistory<UpdateUserRequest>): Promise<AuthenticationResponse> =>
  await putWrapper<UpdateUserRequest, AuthenticationResponse>('/api/v2/auth/update', updateUserRequest);

// Delete
export const deleteUser = async (deleteUserRequest: OmitHistory<DeleteUserRequest>): Promise<AuthenticationResponse> =>
  await deleteWrapper<DeleteUserRequest, AuthenticationResponse>('/api/v2/auth/delete', deleteUserRequest);

// Login
export const login = async (loginRequest: OmitHistory<LoginRequest>): Promise<AuthenticationResponse> =>
  await postWrapper<LoginRequest, AuthenticationResponse>('/api/v2/auth/login', loginRequest);

// Login
export const logout = async (): Promise<AuthenticationResponse> =>
  await getWrapper<AuthenticationResponse>('/api/v2/auth/logout');

// Registration
export const registration = async (
  registrationRequest: OmitHistory<RegistrationRequest>
): Promise<RegistrationResponse> =>
  await postWrapper<RegistrationRequest, AuthenticationResponse>('/api/v2/auth/register', registrationRequest);

export const CheckAuthentication = async (): Promise<AuthenticationResponse> => {
  let response;
  try {
    response = await fetch('/api/v2/auth/check');
    return await response.json();
  } catch (error) {
    if (response?.status === HTTPStatusCode.Unauthorized) {
      return {
        user: undefined,
        code: HTTPStatusCode.OK,
        message: '',
        userMessage: { type: UserMessageType.Success, message: '' },
      };
    }
    return {
      user: undefined,
      ...UnexpectedServerError,
    };
  }
};

// Session Control
export const createSessionChannel = (channel: EventSource) =>
  eventChannel<Message>((emitter) => {
    // Listen for open channel
    const openListener = (event: Event) => console.log('Connected...');

    // Listen for new message
    const messageListener = (messageEvent: MessageEvent) => {
      if (messageEvent) {
        const message = JSON.parse(messageEvent.data) as Message;
        if (message.status === SessionStatus.SESSION_EXPIRED) {
          emitter(message);
          closeConnection();
        }
      }
    };
    // Listen for error
    const errorListener = (event: Event) => {
      console.error('An Error Occur: ', event);
      emitter(END);
      closeConnection();
    };
    channel.addEventListener('open', openListener);
    channel.addEventListener('message', messageListener);
    channel.addEventListener('error', errorListener);
    // Cleanup function
    const closeConnection = () => {
      channel.removeEventListener('open', openListener);
      channel.removeEventListener('message', messageListener);
      channel.removeEventListener('error', errorListener);
      channel.close();
    };
    return closeConnection;
  }, buffers.expanding());
