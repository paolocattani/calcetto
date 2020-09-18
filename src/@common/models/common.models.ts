import { HTTPStatusCode } from './HttpStatusCode';

export interface GenericReponse {
  code: HTTPStatusCode;
  message: string;
  userMessage: UserMessage;
}

export enum UserMessageType {
  Success = 'success',
  Warning = 'warning',
  Danger = 'danger',
}
export interface UserMessage {
  type: UserMessageType;
  message: string;
}

export type OmitHistory<T> = Omit<T, 'history'>;

export const UnexpectedServerError: GenericReponse = {
  code: HTTPStatusCode.InternalServerError,
  message: 'Unexpected Server Error',
  userMessage: {
    type: UserMessageType.Danger,
    // eslint-disable-next-line quotes
    message: "Errore server non previsto. E' stata avviata la procedura di autodistruzione.",
  },
};
