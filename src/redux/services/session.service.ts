import { CheckAuthenticationRequest, AuthenticationResponse, LoginRequest, UserMessageType } from 'redux/models';
import { UserDTO } from 'redux/models/user.model';
import { eventChannel, buffers, END } from 'redux-saga';
import { HTTPStatusCode } from 'redux/models/HttpStatusCode';
import { handleError, handleGenericError, UnexpectedServerError } from './common';

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

export const login = async ({ username, password }: LoginRequest): Promise<AuthenticationResponse> => {
  try {
    const response = await fetch('/api/v1/auth/authenticate', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    const result: AuthenticationResponse = await response.json();
    return result;
  } catch (error) {
    return {
      user: undefined,
      ...UnexpectedServerError,
    };
  }
};

// eslint-disable-next-line no-empty-pattern
export const CheckAuthentication = async ({}: CheckAuthenticationRequest): Promise<AuthenticationResponse> => {
  try {
    const response = await fetch('/api/v1/auth/');
    const user: UserDTO | null = await response.json();
    // FIXME:
    return {
      user: user && response.ok ? user : undefined,
      code: HTTPStatusCode.Accepted,
      message: '',
      userMessage: {
        type: UserMessageType.Success,
        message: '',
      },
    };
  } catch (error) {
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
