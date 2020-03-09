import React from 'react';
import { useSessionContext } from '../core/SessionContext';
import { useHistory } from 'react-router';

// TODO:
export const Login: React.FC = _ => {
  const [sessionContext, updateSessionContext] = useSessionContext();
  const currentHistory = useHistory();

  const handleClick = () => {
    updateSessionContext({ ...sessionContext, isAuthenticated: true });
    currentHistory.push('/');
  };

  return <button onClick={handleClick}>Login</button>;
};
