import React from 'react';
import { Form, InputGroup, Col, Button, Row } from 'react-bootstrap';

const newTournament: React.FC = () => {
  return (
    <Form>
      <Row>
        <Col>
          <Form.Control type="text" placeholder="Nome Torneo" />
        </Col>
        <Col>
          <Form.Check type="switch" label="Publico" />
        </Col>
      </Row>
      <Row>
        <Button variant="primary" type="submit">
          Crea
        </Button>
      </Row>
    </Form>
  );
};

export default newTournament;
