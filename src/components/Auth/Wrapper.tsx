import React, { useState } from 'react';
import { useSessionContext } from 'components/core/SessionContext';
import { useHistory } from 'react-router-dom';
import { RegisterFormValues } from './types';
import { FormikHelpers } from 'formik';

// TODO:
export const Login: React.FC = _ => {
  // State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [sessionContext, updateSessionContext] = useSessionContext();
  const currentHistory = useHistory();

  const handleClick = () => {
    updateSessionContext({ ...sessionContext, isAuthenticated: true });
    currentHistory.push('/');
  };

  const onSubmitRegister = async (values: RegisterFormValues, { setSubmitting }: FormikHelpers<RegisterFormValues>) => {
    const response = await fetch('/api/v1/auth/authenticate', {
      method: 'POST',
      body: JSON.stringify(values),
      headers: { 'Content-Type': 'application/json' }
    });
    const result = await response.json();
    updateSessionContext({ ...sessionContext, isAuthenticated: true });
    currentHistory.push('/');
  };

  return <button onClick={handleClick}>Login</button>;
  /*
  return (
    <form onSubmit={this.onSubmit}>
      <h1>Login Below!</h1>
      <input
        type="email"
        name="email"
        placeholder="Enter email"
        value={this.state.email}
        onChange={this.handleInputChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Enter password"
        value={this.state.password}
        onChange={this.handleInputChange}
        required
      />
      <input type="submit" value="Submit" />
    </form>
  );
  */
};
