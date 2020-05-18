import { Response } from 'express';

export enum SessionStatus {
  SESSION_EXPIRED = 'session_expired',
}

export interface Message {
  status: SessionStatus;
  message?: string;
  data?: any;
}

export interface ConnectedClient {
  token: string;
  response: Response;
}
