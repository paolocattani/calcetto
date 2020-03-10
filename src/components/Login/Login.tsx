import React from 'react';
import { useSessionContext } from '../core/SessionContext';
import { useHistory } from 'react-router';
import { useAuth0 } from 'components/core/Auth0';

// TODO:
export const Login: React.FC = _ => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  /*
  const [sessionContext, updateSessionContext] = useSessionContext();
  const currentHistory = useHistory();

  const handleClick = () => {
    updateSessionContext({ ...sessionContext, isAuthenticated: true });
    currentHistory.push('/');
  };

  return <button onClick={handleClick}>Login</button>;
  */
  console.log();
  return !isAuthenticated ? <button onClick={() => loginWithRedirect({})}>Log in</button> : null;
};
