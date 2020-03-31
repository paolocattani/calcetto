import React, { useState, CSSProperties } from 'react';
import { useSessionContext } from 'components/core/SessionContext';
import { useHistory } from 'react-router-dom';
import { IRegisterFormValue, ILoginFormValue } from './types';
import { Button, Container, Alert, Card } from 'react-bootstrap';
import Register from './Register/Register';
import Login from './Login/Login';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition, findIconDefinition } from '@fortawesome/fontawesome-svg-core';
import { ReactFacebookLoginInfo } from 'react-facebook-login';
import { GoogleLoginResponse } from 'react-google-login';

const AuthWrapper: React.FC = (): JSX.Element => {
  // State
  const [register, setRegister] = useState(true); // Mostra form registrazione/login
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
    backgroundColor: '#343A40',
    color: 'white'
  };

  console.log('Rendering LoginWrapper : ');

  return (
    <>
      <Card style={modalStyle}>
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
