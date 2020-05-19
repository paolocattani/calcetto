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
  id: Date;
  token: string;
  response: Response;
}
