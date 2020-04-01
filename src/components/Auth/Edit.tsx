import React, { FormEvent, SetStateAction, useState, CSSProperties } from 'react';
import { Card, Container, Alert, Form, Button, Col } from 'react-bootstrap';
import { useInput } from '../core/generic/InputHook';
import { useSessionContext } from '../core/SessionContext';
import Delete from './Delete';

const EditUser: React.FC<{}> = (): JSX.Element => {
  const [session] = useSessionContext();
  const [showModalDelete, setShowModalDelete] = useState(false);

  const { value: username, bind: bindUsername /*reset: resetUsername*/ } = useInput(session.username);
  const { value: name, bind: bindName /*reset: resetUsername*/ } = useInput(session.name);
  const { value: surname, bind: bindSurname /*reset: resetUsername*/ } = useInput(session.surname);
  const { value: email, bind: bindEmail /*reset: resetUsername*/ } = useInput(session.email);
  const { value: phone, bind: bindPhone /*reset: resetUsername*/ } = useInput(session.phone);
  const { value: birthday, bind: bindBirthday /*reset: resetUsername*/ } = useInput(session.birthday);

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const showError = (message: SetStateAction<string>) => {
    setErrorMessage(message);
    setTimeout(() => setErrorMessage(''), 3000);
  };
  const showSuccess = (message: SetStateAction<string>) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    console.log('onSubmit ');
    try {
      const response = await fetch('/api/v1/auth/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, name, surname, email, phone, birthday })
      });
      await response.json();
      if (response.ok) showSuccess('Aggiornamento effettuato ... ');
      else showError('Errore durante aggiornamento dati');
    } catch (error) {
      showError('Errore durante aggiornamento dati');
    }
  };

  const modalStyle: CSSProperties = {
    textAlign: 'left',
    width: '40vw',
    height: 'auto',
    margin: 'auto',
    color: 'white'
  };

  return (
    <Card style={modalStyle} className="default-background">
      <Form onSubmit={onSubmit}>
        <Card.Header as="h2">Gestione dati utente</Card.Header>
        <Card.Body>
          <Container>
            {errorMessage ? (
              <Alert key={'auth-alert-error'} variant={'danger'}>
                {errorMessage}
              </Alert>
            ) : null}
            {successMessage ? (
              <Alert key={'auth-alert-success'} variant={'success'}>
                {successMessage}
              </Alert>
            ) : null}

            <Form.Row>
              <Col>
                <Form.Group controlId="username">
                  <Form.Label>Username</Form.Label>
                  <Form.Control type="text" placeholder="username" disabled value={username} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="Email" disabled value={email} />
                </Form.Group>
              </Col>
            </Form.Row>
            <Form.Row>
              <Col>
                <Form.Group controlId="name">
                  <Form.Label>Nome</Form.Label>
                  <Form.Control required type="text" placeholder="Nome" {...bindName} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="surname">
                  <Form.Label>Cognome</Form.Label>
                  <Form.Control required type="text" placeholder="Cognome" {...bindSurname} />
                </Form.Group>
              </Col>
            </Form.Row>
            <Form.Row>
              <Col>
                <Form.Group controlId="phone">
                  <Form.Label>Telefono</Form.Label>
                  <Form.Control required type="text" placeholder="Telefono" {...bindPhone} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="birthday">
                  <Form.Label>Data di Nascita</Form.Label>
                  <Form.Control type="date" placeholder="Data di nascita" {...bindBirthday} />
                </Form.Group>
              </Col>
            </Form.Row>
          </Container>
        </Card.Body>
        <Card.Footer>
          <Button size="lg" variant="outline-success" type="submit">
            Salva
          </Button>
          <Button variant="outline-danger" className="float-right" onClick={() => setShowModalDelete(true)}>
            Elimina Utente
          </Button>
        </Card.Footer>
      </Form>
      <Delete show={showModalDelete} onHide={() => setShowModalDelete(false)} />
    </Card>
  );
};

export default EditUser;
