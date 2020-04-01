import { createContext, useContext, useState, useEffect } from 'react';
import React from 'react';

export interface Session {
  isAuthenticated?: boolean | null;
  username?: string | null;
  name?: string | null;
  surname?: string | null;
  email?: string | null;
  phone?: string | null;
  birthday?: string | null;
  label?: string | null;
  role?: string | null;
}

// https://stackoverflow.com/questions/59422159/redirecting-a-user-to-the-page-they-requested-after-successful-authentication-wi
// https://github.com/openscript/react-example-authentication-redirection

// https://www.freecodecamp.org/news/react-context-in-5-minutes/
export const initialSession: Session = { isAuthenticated: false };

export const SessionContext = createContext<[Session, (session: Session) => void]>([initialSession, () => {}]);
export const useSessionContext = () => useContext(SessionContext);

export const SessionContextProvider: React.FC = ({ children }) => {
  const [sessionState, setSessionState] = useState(initialSession);
  const defaultSessionContext: [Session, typeof setSessionState] = [sessionState, setSessionState];

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch('/api/v1/auth/');
        const user = await response.json();
        if (user && response.ok) setSessionState({ isAuthenticated: true, ...user });
        else setSessionState(initialSession);
      } catch (error) {
        console.error('SessionContext.error :', error);
        setSessionState(initialSession);
      }
    })();
  }, []);

  console.log('sessionContext.session: ', sessionState);

  return (
    <SessionContext.Provider value={defaultSessionContext}>{sessionState ? children : null}</SessionContext.Provider>
  );
};

export const isEditable = (sessionContext: Session): boolean =>
  !sessionContext || !sessionContext.isAuthenticated || !sessionContext.role
    ? false
    : sessionContext.isAuthenticated && sessionContext.role === 'Admin';
