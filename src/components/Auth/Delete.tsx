import React from 'react';
import { useHistory } from 'react-router-dom';
import { Modal, Container, Form, Col, Row, Button } from 'react-bootstrap';
import { useInput } from '../core/hooks/InputHook';
import { TrashIcon } from '../core/icons';
import { SessionSelector } from 'redux/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { SessionAction } from 'redux/actions';
import { toast } from 'react-toastify';
interface DeleteProps {
  show: boolean;
  onHide: () => void;
}

// Componente per cancellazione utente
const Delete: React.FC<DeleteProps> = ({ show, onHide }) => {
  const dispatch = useDispatch();
  const currentHistory = useHistory();
  // Dati utente
  const user = useSelector(SessionSelector.getUser)!;
  // Hook gestione campo password
  const { value: password, bind: bindPassword } = useInput<string>('');

  const handleSubmit = async (
    evt: React.SyntheticEvent<Element, Event>,
    email: string | null | undefined,
    username: string | null | undefined
  ) => {
    evt.preventDefault();
    if (email && username && password) {
      dispatch(SessionAction.delete.request({ email, username, password, history: currentHistory }));
    } else {
      toast.error('Inserire la password');
    }
  };

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
          <Form onSubmit={(e: React.SyntheticEvent<Element, Event>) => handleSubmit(e, user.email, user.username)}>
            <Form.Group as={Row} controlId="emailDelete">
              <Form.Label column sm="2">
                Email
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  style={{ fontSize: 'larger', fontWeight: 'bolder' }}
                  className="default-color-white"
                  plaintext
                  readOnly
                  defaultValue={user.email}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="usernameDelete">
              <Form.Label column sm="2">
                Username
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  style={{ fontSize: 'larger', fontWeight: 'bolder' }}
                  className="default-color-white"
                  plaintext
                  readOnly
                  defaultValue={user.username}
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
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default Delete;
