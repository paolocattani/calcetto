import React, { useState, FormEvent } from 'react';
import { Form, InputGroup, Col, Button, Row, FormControl } from 'react-bootstrap';

// Date picker
import DatePicker from 'react-datepicker';

const NewTournament = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [visible, setVisible] = useState<FormEvent<any>>();

  const onChangeVisible = (event: any) => {
    console.log(event);
  };

  return (
    <Form>
      <Form.Row>
        <Col md={7}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Nome</Form.Label>
            <Form.Control type="text" placeholder="Nome Torneo" />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group>
            <Form.Label>Data</Form.Label>
            <Form.Control
              as={() => (
                <DatePicker
                  highlightDates={[new Date()]}
                  locale="it"
                  selected={date}
                  dateFormat="dd/MM/yyyy"
                  onChange={newValue => setDate(newValue ? newValue : new Date())}
                />
              )}
            ></Form.Control>
          </Form.Group>
        </Col>

        <Col md={2}>
          <Form.Group controlId="exampleForm.SelectCustom">
            <Form.Label>Visibilità : {visible}</Form.Label>
            <Form.Control as="select" custom onChange={onChangeVisible}>
              <option>Pubblico</option>
              <option>Privato</option>
            </Form.Control>
          </Form.Group>
        </Col>
      </Form.Row>
    </Form>
  );
};

export default NewTournament;
