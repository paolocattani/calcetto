import {
  AuthenticationResponse,
  LoginRequest,
  UserMessageType,
  RegistrationRequest,
  RegistrationResponse,
  UpdateUserRequest,
  DeleteUserRequest,
} from 'redux/models';
import { eventChannel, buffers, END } from 'redux-saga';
import { HTTPStatusCode } from '@common/models/HttpStatusCode';
import { handleGenericError, UnexpectedServerError, DEFAULT_HEADERS } from './common';

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
export const updateUser = async (params: UpdateUserRequest): Promise<AuthenticationResponse> => {
  try {
    const response = await fetch('/api/v1/auth/update', {
      method: 'PUT',
      body: JSON.stringify(params.user),
      ...DEFAULT_HEADERS,
    });
    return await response.json();
  } catch (error) {
    return {
      user: undefined,
      ...UnexpectedServerError,
    };
  }
};

// Delete
export const deleteUser = async (params: DeleteUserRequest): Promise<AuthenticationResponse> => {
  try {
    const response = await fetch('/api/v1/auth/', {
      method: 'DELETE',
      body: JSON.stringify(params),
      ...DEFAULT_HEADERS,
    });
    return await response.json();
  } catch (error) {
    return {
      user: undefined,
      ...UnexpectedServerError,
    };
  }
};

// Login
export const login = async ({ username, password }: LoginRequest): Promise<AuthenticationResponse> => {
  try {
    const response = await fetch('/api/v1/auth/authenticate', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      ...DEFAULT_HEADERS,
    });
    return await response.json();
  } catch (error) {
    return {
      user: undefined,
      ...UnexpectedServerError,
    };
  }
};

// Login
export const logout = async (): Promise<AuthenticationResponse> => {
  try {
    const response = await fetch('/api/v1/auth/logout');
    return await response.json();
  } catch (error) {
    return {
      user: undefined,
      ...UnexpectedServerError,
    };
  }
};

// Registration
export const registration = async ({
  history,
  ...registrationInfo
}: RegistrationRequest): Promise<RegistrationResponse> => {
  try {
    const response = await fetch('/api/v1/auth/register', {
      method: 'POST',
      body: JSON.stringify(registrationInfo),
      ...DEFAULT_HEADERS,
    });
    return await response.json();
  } catch (error) {
    return {
      user: undefined,
      ...UnexpectedServerError,
    };
  }
};

export const CheckAuthentication = async (): Promise<AuthenticationResponse> => {
  let response;
  try {
    response = await fetch('/api/v1/auth/');
    return await response.json();
  } catch (error) {
    if (response?.status === HTTPStatusCode.Unauthorized) {
      return {
        user: undefined,
        code: HTTPStatusCode.Accepted,
        message: '',
        userMessage: { type: UserMessageType.Success, message: '' },
      };
    }
    const result = {
      user: undefined,
      ...UnexpectedServerError,
    };
    handleGenericError<AuthenticationResponse>(error, result);
    return result;
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
