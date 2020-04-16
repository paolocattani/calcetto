import { useInput } from '../core/hooks/InputHook';
import { Form, Button, Row, Col } from 'react-bootstrap';
import React, { SetStateAction } from 'react';
import { useSessionContext } from '../core/routing/SessionContext';
import { useHistory } from 'react-router-dom';

type PropsType = {
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
};

// https://medium.com/@faizanv/authentication-for-your-react-and-express-application-w-json-web-tokens-923515826e0#6563
const Login: React.FC<PropsType> = ({ setErrorMessage }): JSX.Element => {
  const currentHistory = useHistory();
  const [sessionContext, updateSessionContext] = useSessionContext();

  const { value: username, bind: bindUsername /*reset: resetUsername*/ } = useInput('');
  const { value: password, bind: bindPassword /*reset: resetPassword*/ } = useInput('');

  const showError = (message: SetStateAction<string>) => {
    setErrorMessage(message);
    setTimeout(() => setErrorMessage(''), 3000);
  };

  const handleSubmit = async (evt: React.SyntheticEvent) => {
    evt.preventDefault();
    if (!username || username === '') {
      showError('Inserire username o password');
      return;
    }
    if (!password || password === '') {
      showError('Inserire la password');
      return;
    }
    try {
      const response = await fetch('/api/v1/auth/authenticate', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' }
      });
      const result = await response.json();
      if (response.ok && result) {
        updateSessionContext({
          ...sessionContext,
          ...result,
          isAuthenticated: true,
          isEditable: result.role === 'Admin'
        });
        currentHistory.push('/');
      } else {
        if (response.status === 401) showError('Utente o Password errata');
      }
    } catch (error) {
      console.log('onSubmitLogin : ', error);
      showError('Errore durante il processo di registrazione. Riprovare piu tardi');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="username">
        <Form.Label>Username o Email</Form.Label>
        <Form.Control required type="text" placeholder="username o email" {...bindUsername} />
      </Form.Group>

      <Form.Group controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control required type="password" placeholder="Password" {...bindPassword} />
      </Form.Group>
      <Row>
        <Col>
          <Button size="lg" variant="outline-success" className="float-right" type="submit">
            Conferma
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default Login;
