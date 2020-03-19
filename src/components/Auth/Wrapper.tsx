import React, { useState } from 'react';
import { useSessionContext } from 'components/core/SessionContext';
import { useHistory } from 'react-router-dom';
import { IRegisterFormValue, ILoginFormValue } from './types';
import { FormikHelpers } from 'formik';
import { Modal, Button, Container, Alert } from 'react-bootstrap';
import Register from './Register/Register';
import Login from './Login/Login';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition, findIconDefinition } from '@fortawesome/fontawesome-svg-core';
import { emailRegExp, passwordRegExp, phoneRegExp } from '../core/utils';
import { ReactFacebookLoginInfo } from 'react-facebook-login';
import { GoogleLoginResponse } from 'react-google-login';

type authType = {
  show: boolean;
  onHide: () => void;
};

// https://medium.com/@faizanv/authentication-for-your-react-and-express-application-w-json-web-tokens-923515826e0#6563

const AuthWrapper = ({ show, onHide }: authType): JSX.Element => {
  // State
  const [register, setRegister] = useState(false); // Mostra form registrazione/login
  const [errorMessage, setErrorMessage] = useState('');

  const [sessionContext, updateSessionContext] = useSessionContext();
  const currentHistory = useHistory();

  const RigthArrowDefinition: IconDefinition = findIconDefinition({
    prefix: 'far',
    iconName: 'arrow-alt-circle-right'
  });

  const onSubmitLogin = async (values: ILoginFormValue, { setSubmitting }: FormikHelpers<ILoginFormValue>) => {
    setSubmitting(true);
    try {
      if (!isValidLogin(values)) return;
      const response = await fetch('/api/v1/auth/authenticate', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: { 'Content-Type': 'application/json' }
      });
      const result = await response.json();
      console.log('onSubmitLogin : ', response, result);
      if (response.ok && result) {
        updateSessionContext({
          ...sessionContext,
          name: result.name,
          surname: result.surname,
          email: result.email,
          role: result.role,
          isAuthenticated: true
        });
        onHide();
        currentHistory.push('/');
      } else {
        if (response.status === 401) setErrorMessage('Utente o Password errata');

        setTimeout(() => setErrorMessage(''), 3000);
      }
    } catch (error) {
      console.log('onSubmitLogin : ', error);
      setErrorMessage('Errore durante il processo di registrazione. Riprovare piu tardi');
      setTimeout(() => setErrorMessage(''), 3000);
    }
    setSubmitting(false);
  };

  const isValidLogin = (formValues: ILoginFormValue): boolean => {
    setErrorMessage('');
    if (!formValues.email || !emailRegExp.test(formValues.email)) {
      setErrorMessage('Email non valida');
      setTimeout(() => setErrorMessage(''), 3000);
      return false;
    }
    if (!formValues.password) {
      setErrorMessage('Inserisci la password');
      setTimeout(() => setErrorMessage(''), 3000);
      return false;
    }

    return true;
  };

  const isValidRegister = (formValues: IRegisterFormValue): boolean => {
    setErrorMessage('');
    // Nome
    if (!formValues.name) {
      setErrorMessage('Inserisci il nome');
      setTimeout(() => setErrorMessage(''), 3000);
      return false;
    }
    // Telefono
    if (!formValues.surname) {
      setErrorMessage('Inserisci il cognome');
      setTimeout(() => setErrorMessage(''), 3000);
      return false;
    }

    // Test password
    if (
      !formValues.password ||
      !formValues.passwordConfirm ||
      !passwordRegExp.test(formValues.password) ||
      !passwordRegExp.test(formValues.passwordConfirm)
    ) {
      setErrorMessage('La password non rispetta i criteri');
      setTimeout(() => setErrorMessage(''), 3000);
      return false;
    }

    if (formValues.password !== formValues.passwordConfirm) {
      setErrorMessage('Le password non corrispondono');
      setTimeout(() => setErrorMessage(''), 3000);
      return false;
    }

    // Test email
    if (
      !formValues.email ||
      !formValues.emailConfirm ||
      !emailRegExp.test(formValues.email) ||
      !emailRegExp.test(formValues.emailConfirm)
    ) {
      setErrorMessage('Inserisci una email valida');
      setTimeout(() => setErrorMessage(''), 3000);
      return false;
    }

    if (formValues.email !== formValues.emailConfirm) {
      setErrorMessage('Le email non corrispondono');
      setTimeout(() => setErrorMessage(''), 3000);
      return false;
    }

    // Telefono

    if (!(formValues.phone && !phoneRegExp.test(formValues.phone))) {
      setErrorMessage('Il numero di telefono inserito non è valido');
      setTimeout(() => setErrorMessage(''), 3000);
      return false;
    }

    return true;
  };

  const onSubmitRegister = async (values: IRegisterFormValue, { setSubmitting }: FormikHelpers<IRegisterFormValue>) => {
    setSubmitting(true);
    try {
      if (!isValidRegister(values)) return;
      const response = await fetch('/api/v1/auth/register', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: { 'Content-Type': 'application/json' }
      });
      const result = await response.json();
      if (response.ok && result) {
        updateSessionContext({ ...result, isAuthenticated: true });
        onHide();
        currentHistory.push('/');
      } else {
        if (result.message) setErrorMessage(result.message);
        else setErrorMessage('Errore durante il processo di registrazione. Riprovare piu tardi');
        setTimeout(() => setErrorMessage(''), 3000);
      }
    } catch (error) {
      setErrorMessage('Errore durante il processo di registrazione. Riprovare piu tardi');
      setTimeout(() => setErrorMessage(''), 3000);
    }
    setSubmitting(false);
  };

  const responseFacebook = (response: ReactFacebookLoginInfo) => {
    console.log(response);
  };

  const responseGoogle = (response: GoogleLoginResponse) => {
    console.log(response);
  };

  const title = register ? 'Registrati' : 'Login';
  const body = register ? (
    <Register onSubmit={onSubmitRegister} />
  ) : (
    <Login onSubmit={onSubmitLogin} responseFacebook={responseFacebook} responseGoogle={responseGoogle} />
  );
  const buttonString = register ? 'Login' : 'Registrati';
  const Icon = <FontAwesomeIcon icon={RigthArrowDefinition} />;
  return (
    <Modal show={show} onHide={onHide} size={'lg'} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container fluid>
          {errorMessage ? (
            <Alert key={'auth-alert'} variant={'danger'}>
              {errorMessage}
            </Alert>
          ) : null}
          {body}
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => setRegister(!register)}>
          <div>
            {Icon} <strong>{buttonString}</strong>
          </div>
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AuthWrapper;
