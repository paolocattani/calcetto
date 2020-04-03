import React, { useState, FormEvent } from 'react';
import { Form, InputGroup, Col, Button, Row, FormControl } from 'react-bootstrap';

// Date picker
import DatePicker from 'react-datepicker';
import { getEmptyTournament } from './helper';
import { TournamentProgress, TournamentProgressType } from './type';
import { useHistory } from 'react-router-dom';

type newTProps = {
  showMessage: (message: string, type: string) => void;
};

const NewTournament: React.FC<newTProps> = ({ showMessage }) => {
  let currentHistory = useHistory();

  const [name, setName] = useState<string>('');
  const [date, setDate] = useState<Date>(new Date());
  const [visible, setVisible] = useState<boolean>(true);

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>): Promise<void> => {
    evt.preventDefault();
    let model = getEmptyTournament(name, TournamentProgress.New);
    model.date = date;
    model.public = visible;
    console.log('newSubmit : ', model);

    const response = await fetch('/api/v1/tournament', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(model)
    });
    const result = await response.json();
    if (response.ok) currentHistory.push(`/tournament/${result.id}`);
    else {
      if (response.status === 401) showMessage('Non sei autorizzato', 'danger');
      else if (result.message) showMessage(result.message, 'danger');
      else showMessage('Errore interno. Riprovare piu tardi...', 'danger');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Row>
        <Col md={7}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              required
              placeholder="Nome Torneo"
              value={name}
              onChange={(event: React.FormEvent<HTMLSelectElement>) => setName(event.currentTarget.value)}
            />
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
          <Form.Group controlId="visible">
            <Form.Label>Visibilità </Form.Label>
            <Form.Control as="select" onChange={() => setVisible(!visible)}>
              <option>Pubblico</option>
              <option>Privato</option>
            </Form.Control>
          </Form.Group>
        </Col>
      </Form.Row>
      <Form.Row>
        <Button type="submit" size="lg" variant="outline-warning" className="float-left default-color-white">
          <span style={{ fontSize: 'larger', fontWeight: 'bolder' }}>Prosegui</span>
        </Button>
      </Form.Row>
    </Form>
  );
};

export default NewTournament;
