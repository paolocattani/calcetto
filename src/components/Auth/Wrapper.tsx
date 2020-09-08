import React, { useState, CSSProperties, lazy } from 'react';
import { Button, Container, Card, Col } from 'react-bootstrap';
import { ToggleOn, ToggleOff } from '../core/icons';

const Login = lazy(() => import('./Login'));
const Register = lazy(() => import('./Register'));

const AuthWrapper: React.FC = (): JSX.Element => {
  // State
  const [register, setRegister] = useState(false); // Mostra form registrazione/login
  const [title, body, icon, text] = register
    ? [' Registrati', <Register />, <ToggleOn />, 'Login']
    : [' Login', <Login />, <ToggleOff />, 'Registrati'];

  const modalStyle: CSSProperties = {
    textAlign: 'left',
    color: 'white',
  };

  return (
    <Col md={{ span: '6', offset: '3' }} sm="12">
      <Card style={modalStyle} className="default-background">
        <Card.Header as="h2">{title}</Card.Header>
        <Card.Body>
          <Container>{body}</Container>
        </Card.Body>
        <Card.Footer>
          <Button size="lg" variant="outline-warning" onClick={() => setRegister(!register)}>
            {icon}
            <strong> {text}</strong>
          </Button>
        </Card.Footer>
      </Card>
    </Col>
  );
};

export default AuthWrapper;
