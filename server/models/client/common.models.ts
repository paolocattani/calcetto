import { HTTPStatusCode } from '../../../src/@common/models/HttpStatusCode';

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
