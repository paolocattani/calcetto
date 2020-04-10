import React, { FormEvent, SetStateAction, useState, CSSProperties, lazy } from 'react';
import { Card, Container, Alert, Form, Button, Col, Row } from 'react-bootstrap';
import { useInput } from '../core/hooks/InputHook';
import { useSessionContext } from '../core/routing/SessionContext';
import DatePicker from 'react-datepicker';
import { TrashIcon, SaveIcon } from '../core/Icons';
const Delete = lazy(() => import('./Delete'));

const EditUser: React.FC<{}> = (): JSX.Element => {
  const [session] = useSessionContext();
  const [showModalDelete, setShowModalDelete] = useState(false);

  const { value: name, bind: bindName /*reset: resetUsername*/ } = useInput(session.name);
  const { value: surname, bind: bindSurname /*reset: resetUsername*/ } = useInput(session.surname);
  const { value: phone, bind: bindPhone /*reset: resetUsername*/ } = useInput(session.phone);
  const { value: birthday, setValue: setBirthday /* bind: bindBirthday ,reset: resetUsername*/ } = useInput(
    session.birthday
  );

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
        body: JSON.stringify({ username: session.username, name, surname, email: session.email, phone, birthday })
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
    width: '100%',
    height: 'auto',
    margin: 'auto',
    color: 'white'
  };

  console.log('Rendere Edit : ', birthday);
  return (
    <Col md={{ span: '6', offset: '3' }} sm="12">
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
              <Form.Group as={Row} controlId="username">
                <Form.Label column>Username</Form.Label>
                <Col sm="9">
                  <Form.Control
                    plaintext
                    value={session.username!}
                    readOnly
                    style={{ fontSize: 'larger', fontWeight: 'bolder' }}
                    className="default-color-white "
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="email">
                <Form.Label column>Email</Form.Label>
                <Col sm="9">
                  <Form.Control
                    plaintext
                    value={session.email!}
                    readOnly
                    style={{ fontSize: 'larger', fontWeight: 'bolder' }}
                    className="default-color-white"
                  />
                </Col>
              </Form.Group>
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
                    <Form.Control
                      as={() => (
                        <DatePicker
                          selected={new Date(birthday)}
                          locale="it"
                          dateFormat="dd/MM/yyyy"
                          onChange={newValue => setBirthday(newValue ? newValue : new Date())}
                        />
                      )}
                    ></Form.Control>
                  </Form.Group>
                </Col>
              </Form.Row>
            </Container>
          </Card.Body>
          <Card.Footer style={{ height: '10vh' }}>
            <Button variant="outline-success" type="submit" className="float-right">
              <SaveIcon /> Salva
            </Button>
            <Button variant="outline-danger" className="float-left" onClick={() => setShowModalDelete(true)}>
              <TrashIcon /> Elimina Utente
            </Button>
          </Card.Footer>
        </Form>
        <Delete show={showModalDelete} onHide={() => setShowModalDelete(false)} />
      </Card>
    </Col>
  );
};

export default EditUser;
