export enum SessionStatus {
  SESSION_EXPIRED = 'session_expired',
}

export interface Message {
  status: SessionStatus;
  message?: string;
}
