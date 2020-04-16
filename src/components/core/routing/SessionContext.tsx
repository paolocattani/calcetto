import { createContext, useContext, useState, useEffect } from 'react';
import React from 'react';
import { LoadingModal } from '../generic/Commons';

export interface Session {
  isAuthenticated?: boolean;
  username?: string;
  name?: string;
  surname?: string;
  email?: string;
  phone?: string;
  birthday?: string;
  label?: string;
  role?: string;
  isAdmin?: boolean;
  isEditable?: boolean;
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
        console.log('SessionContext.user : ', user);

        if (user && response.ok)
          setSessionState({
            isAuthenticated: true,
            isEditable: user.role === 'Admin',
            ...user
          });
        else setSessionState(initialSession);
      } catch (error) {
        console.error('SessionContext.error :', error);
        setSessionState(initialSession);
      }
    })();
  }, []);

  console.log('sessionContext.session: ', sessionState);

  return (
    <SessionContext.Provider value={defaultSessionContext}>
      {sessionState ? children : <LoadingModal show={true} message={'....Caricamento'} />}
    </SessionContext.Provider>
  );
};
