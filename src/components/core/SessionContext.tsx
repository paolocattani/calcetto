import { createContext, useContext, useState } from 'react';
import React from 'react';

export interface Session {
  isAuthenticated?: boolean;
  redirectPathOnAuthentication?: string;
}

export const initialSession: Session = {};

export const SessionContext = createContext<[Session, (session: Session) => void]>([initialSession, () => {}]);
export const useSessionContext = () => useContext(SessionContext);

export const SessionContextProvider: React.FC = ({ children }) => {
  const [sessionState, setSessionState] = useState(initialSession);
  const defaultSessionContext: [Session, typeof setSessionState] = [sessionState, setSessionState];

  return <SessionContext.Provider value={defaultSessionContext}>{children}</SessionContext.Provider>;
};
