import React, { useState, SetStateAction } from 'react';
import { useSessionContext } from 'components/core/routing/SessionContext';
import { useHistory } from 'react-router-dom';
import { Modal, Container, Alert, Form, Col, Row, Button } from 'react-bootstrap';
import { useInput } from '../core/hooks/InputHook';
import { SessionContext } from '../core/routing/SessionContext';
import { TrashIcon } from '../core/icons';
type authType = {
  show: boolean;
  onHide: () => void;
};

const Delete = ({ show, onHide }: authType): JSX.Element => {
  const [, updateSessionContext] = useSessionContext();
  const [errorMessage, setErrorMessage] = useState('');
  const { value: password, bind: bindPassword } = useInput('');

  const currentHistory = useHistory();

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
        updateSessionContext({ isAuthenticated: false });
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

  /*
  const modalStyle: CSSProperties = {
    textAlign: 'left',
    width: '40vw',
    height: 'auto',
    margin: 'auto',
    backgroundColor: '#343A40',
    color: 'white'
  };
*/
  const error = errorMessage ? (
    <Alert key={'auth-alert'} variant={'danger'}>
      {errorMessage}{' '}
    </Alert>
  ) : null;

  const body = (
    <SessionContext.Consumer>
      {([{ email, username }]) =>
        !email || !username ? (
          <>
            <strong>Eliminazione non possibile</strong>{' '}
          </>
        ) : (
          <Form onSubmit={(e: React.SyntheticEvent<Element, Event>) => handleSubmit(e, email, username)}>
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
                  defaultValue={email}
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
                  defaultValue={username}
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
        )
      }
    </SessionContext.Consumer>
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
