import React, { useState, CSSProperties } from 'react';
import { Button, Container, Alert, Card } from 'react-bootstrap';
import Register from './Register';
import Login from './Login';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition, findIconDefinition } from '@fortawesome/fontawesome-svg-core';

const AuthWrapper: React.FC = (): JSX.Element => {
  // State
  const [register, setRegister] = useState(false); // Mostra form registrazione/login
  const [errorMessage, setErrorMessage] = useState('');

  const RigthArrowDefinition: IconDefinition = findIconDefinition({
    prefix: 'far',
    iconName: 'arrow-alt-circle-right'
  });

  const title = register ? 'Registrati' : 'Login';
  const body = register ? <Register setErrorMessage={setErrorMessage} /> : <Login setErrorMessage={setErrorMessage} />;
  const buttonString = register ? 'Login' : 'Registrati';
  const Icon = <FontAwesomeIcon icon={RigthArrowDefinition} />;
  const modalStyle: CSSProperties = {
    textAlign: 'left',
    width: register ? '50vw' : '40vw',
    height: 'auto',
    margin: 'auto',
    color: 'white'
  };

  return (
    <>
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
          <Button variant="outline-warning" onClick={() => setRegister(!register)}>
            <div>
              {Icon} <strong>{buttonString}</strong>
            </div>
          </Button>
        </Card.Footer>
      </Card>
    </>
  );
};

export default AuthWrapper;
