import React from 'react';
import { useAuth0 } from 'components/core/Auth0';
import { Button } from 'react-bootstrap';

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
  return !isAuthenticated ? <Button onClick={() => loginWithRedirect({})}>Log in</Button> : null;
};
