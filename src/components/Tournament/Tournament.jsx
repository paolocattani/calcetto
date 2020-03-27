import React, { useState, useEffect } from 'react';
// React-Select
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';
// Bootstrap
import { Form, Button, Card, Row, Col } from 'react-bootstrap';
import { useHistory } from 'react-router';
// Core
import { getTodayDate } from '../core/utils';
import { SessionContext, isEditable } from '../core/SessionContext';
import { GenericToast } from '../core/Commons';
// Helper
import { fetchTournaments, getEmptyTournament, cardStyle, IndicatorSeparator } from './helper';
// Types
import { TournamentProgress } from './type';
import NewTournament from './new';

const FTournament = () => {
  // State definition
  const [selectedOption, setSelectedOption] = useState(getTodayDate());
  const [tournamentList, setTournamentList] = useState([]);
  const messageInitialState = { message: '', type: 'success' };
  const [message, setMessage] = useState(messageInitialState);
  let currentHistory = useHistory();

  useEffect(() => fetchTournaments(setTournamentList, setSelectedOption), []);

  const handleChange = selectedOption => setSelectedOption(selectedOption);
  const handleCreate = selectedOption => {
    let newT = getEmptyTournament(selectedOption);
    setSelectedOption(newT);
    setTournamentList(prevList => [...prevList, newT]);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const response = await fetch('/api/v1/tournament', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(getEmptyTournament(selectedOption.name, TournamentProgress.PairsSelection))
    });
    const result = await response.json();
    if (response.ok) currentHistory.push(`/tournament/${result.id}`);
    else {
      if (response.status === 401) setMessage({ message: 'Non sei autorizzato', type: 'danger' });
      else if (result.message) setMessage({ message: result.message, type: 'danger' });
      else setMessage({ message: 'Errore interno. Riprovare piu tardi...', type: 'danger' });

      setTimeout(() => setMessage(messageInitialState), 5000);
    }
  };

  return (
    <Row>
      <Col>
        <GenericToast message={message.message} type={message.type} />

        <Card style={cardStyle}>
          <Card.Header as="h2">Torneo</Card.Header>
          <Card.Body>
            <Card.Title>Scegli un torneo</Card.Title>
            <NewTournament />
            <br />
            <br />
            <br />
            <br />
            <br />

            {/* <NewTournament /> */
            true ? (
              <Form onSubmit={handleSubmit}>
                <SessionContext.Consumer>
                  {([session]) =>
                    isEditable(session) ? (
                      <CreatableSelect
                        // TODO:
                        //filterOption={customFilter}
                        // getOptionValue={option => `${option.label}`}
                        //formatCreateLabel={formatNewLabel}
                        //formatOptionLabel={formatOptionLabel}
                        //getOptionLabel={option => `${option.name} @ ${option.progress}`}
                        //
                        components={{ IndicatorSeparator }}
                        value={selectedOption}
                        options={tournamentList}
                        placeholder="Crea/Cerca un torneo"
                        isSearchable
                        isClearable
                        onChange={handleChange}
                        onCreateOption={handleCreate}
                        createOptionPosition={'first'}
                      />
                    ) : (
                      <Select
                        components={{ IndicatorSeparator }}
                        value={selectedOption}
                        options={tournamentList}
                        placeholder="Cerca un torneo"
                        isSearchable
                        isClearable
                        onChange={handleChange}
                      />
                    )
                  }
                </SessionContext.Consumer>
                <br></br>
                <Button type="submit" size="lg" variant="outline-warning" disabled={!selectedOption}>
                  Continua
                </Button>
              </Form>
            ) : null}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default FTournament;
