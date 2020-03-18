import { createContext, useContext, useState, useEffect } from 'react';
import React from 'react';

export interface Session {
  isAuthenticated?: boolean;
  name?: string;
  surname?: string;
  email?: string;
  role?: string;
  redirectPathOnAuthentication?: string;
}

// https://stackoverflow.com/questions/59422159/redirecting-a-user-to-the-page-they-requested-after-successful-authentication-wi
// https://github.com/openscript/react-example-authentication-redirection
export const initialSession: Session = {};

export const SessionContext = createContext<[Session, (session: Session) => void]>([initialSession, () => {}]);
export const useSessionContext = () => useContext(SessionContext);

export const SessionContextProvider: React.FC = ({ children }) => {
  const [sessionState, setSessionState] = useState(initialSession);
  const defaultSessionContext: [Session, typeof setSessionState] = [sessionState, setSessionState];

  useEffect(() => {
    (async () => {
      const response = await fetch('/api/v1/auth/');
      const user = await response.json();
      if (user) setSessionState({ isAuthenticated: true, ...user });
    })();
  }, []);

  return <SessionContext.Provider value={defaultSessionContext}>{children}</SessionContext.Provider>;
};
