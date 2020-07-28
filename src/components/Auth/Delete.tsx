import React, { useState, SetStateAction } from 'react';
import { useHistory } from 'react-router-dom';
import { Modal, Container, Alert, Form, Col, Row, Button } from 'react-bootstrap';
import { useInput } from '../core/hooks/InputHook';
import { TrashIcon } from '../core/icons';
import { SessionSelector } from 'selectors/session.selector';
import { useDispatch, useSelector } from 'react-redux';
import { SessionAction } from 'actions';
type authType = {
  show: boolean;
  onHide: () => void;
};

// Componente per cancellazione utente
const Delete = ({ show, onHide }: authType): JSX.Element => {
  const dispatch = useDispatch();
  const currentHistory = useHistory();
  // Dati utente
  const session = useSelector(SessionSelector.getSession);
  const [errorMessage, setErrorMessage] = useState('');
  // Hook gestione campo password
  const { value: password, bind: bindPassword } = useInput<string>('');

  // Util per mostrare messaggi all'utente
  const showError = (message: SetStateAction<string>) => {
    setErrorMessage(message);
    setTimeout(() => setErrorMessage(''), 3000);
  };

  const handleSubmit = async (
    evt: React.SyntheticEvent<Element, Event>,
    email: string | null | undefined,
    username: string | null | undefined
  ) => {
    evt.preventDefault();
    try {
      const response = await fetch('/api/v1/auth/', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, username, password }),
      });
      const result = await response.json();
      if (response.ok && result) {
        dispatch(SessionAction.updateSession({}));
        onHide();
        currentHistory.push('/');
      } else {
        if (response.status === 401) showError('Utente o Password errata');
        else showError('Errore durante il processo di registrazione. Riprovare piu tardi');
      }
    } catch (error) {
      console.log('onSubmitLogin : ', error);
      showError('Errore durante il processo di registrazione. Riprovare piu tardi');
    }
  };

  const error = errorMessage ? (
    <Alert key={'auth-alert'} variant={'danger'}>
      {errorMessage}{' '}
    </Alert>
  ) : null;

  const body = (
    <Form
      onSubmit={(e: React.SyntheticEvent<Element, Event>) =>
        handleSubmit(e, session.user!.email, session.user!.username)
      }
    >
      <Form.Group as={Row} controlId="email">
        <Form.Label column sm="2">
          Email
        </Form.Label>
        <Col sm="10">
          <Form.Control
            style={{ fontSize: 'larger', fontWeight: 'bolder' }}
            className="default-color-white"
            plaintext
            readOnly
            defaultValue={session.user!.email}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} controlId="username">
        <Form.Label column sm="2">
          Username
        </Form.Label>
        <Col sm="10">
          <Form.Control
            style={{ fontSize: 'larger', fontWeight: 'bolder' }}
            className="default-color-white"
            plaintext
            readOnly
            defaultValue={session.user!.username}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} controlId="password">
        <Form.Label column sm="2">
          Password
        </Form.Label>
        <Col sm="10">
          <Form.Control type="password" placeholder="Password" {...bindPassword} />
        </Col>
      </Form.Group>
      <Button size="lg" className="float-left" onClick={onHide} variant="outline-success" type="button">
        Annulla
      </Button>
      <Button size="lg" className="float-right" variant="outline-danger" type="submit">
        <TrashIcon /> Conferma
      </Button>
    </Form>
  );

  return (
    <Modal show={show} onHide={onHide} size={'lg'} centered>
      <Modal.Header
        style={{
          backgroundColor: '#343A40',
          color: 'white',
        }}
        closeButton
      >
        <Modal.Title className="default-color-red">Elimina Utente</Modal.Title>
      </Modal.Header>
      <Modal.Body
        style={{
          backgroundColor: '#343A40',
          color: 'white',
        }}
      >
        <Container fluid>
          {error}
          {body}
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default Delete;
