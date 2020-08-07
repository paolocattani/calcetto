import React, { useState, CSSProperties, lazy } from 'react';
import { Button, Container, Alert, Card, Col } from 'react-bootstrap';
import { ToggleOn, ToggleOff } from '../core/iconsx';

const Login = lazy(() => import('./Login'));
const Register = lazy(() => import('./Register'));

const AuthWrapper: React.FC = (): JSX.Element => {
  // State
  const [register, setRegister] = useState(false); // Mostra form registrazione/login
  const [errorMessage, setErrorMessage] = useState('');

  const [title, body, buttonString] = register
    ? [
        'Registrati',
        <Register setErrorMessage={setErrorMessage} />,
        <>
          <ToggleOn /> <strong>Login</strong>
        </>,
      ]
    : [
        'Login',
        <Login setErrorMessage={setErrorMessage} />,
        <>
          <ToggleOff /> <strong>Registrati</strong>
        </>,
      ];

  const modalStyle: CSSProperties = {
    textAlign: 'left',
    color: 'white',
  };

  return (
    <Col md={{ span: '6', offset: '3' }} sm="12">
      <Card style={modalStyle} className="default-background">
        <Card.Header as="h2">{title}</Card.Header>
        <Card.Body>
          <Container>
            {errorMessage ? (
              <Alert key={'auth-alert'} variant={'danger'}>
                {errorMessage}
              </Alert>
            ) : null}
            {body}
          </Container>
        </Card.Body>
        <Card.Footer>
          <Button size="lg" variant="outline-warning" onClick={() => setRegister(!register)}>
            {buttonString}
          </Button>
        </Card.Footer>
      </Card>
    </Col>
  );
};

export default AuthWrapper;
