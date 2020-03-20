import React from 'react';
import { Form, InputGroup, Col, Button, Row, FormControl, FormCheck } from 'react-bootstrap';

const newTournament: React.FC = () => {
  return (
    <Form>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
      </Form.Group>

      <FormCheck>
        <FormCheck.Input isInvalid type={'radio'} />
        <FormCheck.Label>Allow us to contact you?</FormCheck.Label>
      </FormCheck>
    </Form>
  );
};

export default newTournament;
