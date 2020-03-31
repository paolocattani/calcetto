import React, { useState } from 'react';
import { useSessionContext } from 'components/core/SessionContext';
import { useHistory } from 'react-router-dom';
import { IDeleteFormValue } from '../types';
import { Modal, Container, Alert } from 'react-bootstrap';
import { emailRegExp } from '../../core/utils';
import Delete from './form';

type authType = {
  show: boolean;
  onHide: () => void;
};

const AuthWrapper = ({ show, onHide }: authType): JSX.Element => {
  // State
  const [errorMessage, setErrorMessage] = useState('');

  const [sessionContext, updateSessionContext] = useSessionContext();
  const currentHistory = useHistory();

  const onSubmitDelete = async (values: IDeleteFormValue, { setSubmitting }: any) => {
    setSubmitting(true);
    try {
      if (!isValid(values)) return;
      const response = await fetch('/api/v1/auth/', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: sessionContext.email, password: values.password })
      });
      const result = await response.json();
      console.log('onSubmitLogin : ', response, result);
      if (response.ok && result) {
        updateSessionContext({ ...sessionContext, name: '', surname: '', email: '', role: '', isAuthenticated: false });
        onHide();
        currentHistory.push('/');
      } else {
        if (response.status === 401) setErrorMessage('Utente o Password errata');
        else setErrorMessage('Errore durante il processo di registrazione. Riprovare piu tardi');
        setTimeout(() => setErrorMessage(''), 3000);
      }
    } catch (error) {
      console.log('onSubmitLogin : ', error);
      setErrorMessage('Errore durante il processo di registrazione. Riprovare piu tardi');
      setTimeout(() => setErrorMessage(''), 3000);
    }
    setSubmitting(false);
  };

  const isValid = (formValues: IDeleteFormValue): boolean => {
    setErrorMessage('');
    console.log('isVaild : ', formValues);
    if (formValues.email !== sessionContext.email) {
      setErrorMessage('Ci hai provato... Ma ti ho scoperto. Quindi ti elimino.');
      return true;
    }
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

  return (
    <Modal show={show} onHide={onHide} size={'lg'} centered>
      <Modal.Header closeButton>
        <Modal.Title>Elimina Utente</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container fluid>
          {errorMessage ? (
            <Alert key={'auth-alert'} variant={'danger'}>
              {errorMessage}
            </Alert>
          ) : null}
          {sessionContext.email ? (
            <Delete email={sessionContext.email} onSubmit={onSubmitDelete} />
          ) : (
            'Eliminazione non possibile'
          )}{' '}
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default AuthWrapper;
