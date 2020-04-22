import React, { useState } from 'react';
import { Form, Col, Button } from 'react-bootstrap';

// Date picker
import DatePicker from 'react-datepicker';
import { getEmptyTournament } from './helper';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { TournamentAction } from 'actions/tournament.action';
import { TournamentSelector } from 'selectors/tournament.selector';
import { toastType } from 'components/core/generic/Commons';

type newTProps = {
  showMessage: (message: string, type: toastType) => void;
};

const NewTournament: React.FC<newTProps> = ({ showMessage }) => {
  let currentHistory = useHistory();
  const dispatch = useDispatch();
  const tournament = useSelector(TournamentSelector.getTournament);
  const [name, setName] = useState<string>('');
  const [date, setDate] = useState<Date>(new Date());
  const [visible, setVisible] = useState<boolean>(true);

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>): Promise<void> => {
    evt.preventDefault();
    if (!name) {
      showMessage('Inserire un nome per il torneo', 'danger');
      return;
    }

    let model = getEmptyTournament(name);
    model.date = date;
    model.public = visible;
    console.log('handleSubmit : ', model);

    dispatch(TournamentAction.saveTournament.request({ model }));
    currentHistory.push(`/tournament/${tournament?.id ?? 1}`);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Row>
        <Col md={6}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              required
              placeholder="Nome Torneo"
              maxLength={30}
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
                  onChange={(newValue) => setDate(newValue ? newValue : new Date())}
                />
              )}
            ></Form.Control>
          </Form.Group>
        </Col>

        <Col md={3}>
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
        <Col>
          <Button type="submit" size="lg" variant="outline-warning" className="float-right default-color-white">
            <span style={{ fontSize: 'larger', fontWeight: 'bolder' }}>Prosegui</span>
          </Button>
        </Col>
      </Form.Row>
    </Form>
  );
};

export default NewTournament;
