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
  const [newTournament, setNewTournament] = useState(false);

  const messageInitialState = { message: '', type: 'success' };
  const [message, setMessage] = useState(messageInitialState);
  let currentHistory = useHistory();

  useEffect(() => fetchTournaments(setTournamentList, setSelectedOption), []);

  const showMessage = (message, type) => {
    setMessage({ message, type });
    setTimeout(() => setMessage(messageInitialState), 5000);
  };
  const handleChange = selectedOption => {
    console.log('handelChange : ', selectedOption);

    setSelectedOption(selectedOption);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    console.log('handleSubmit  : ', selectedOption);
    if (selectedOption) currentHistory.push(`/tournament/${selectedOption.id}`);
    else showMessage('Errore, riprovare piu tardi...', 'danger');
  };

  return (
    <>
      <GenericToast message={message.message} type={message.type} />
      <SessionContext.Consumer>
        {([session]) => (
          <Card style={cardStyle}>
            <Card.Header as="h2">Torneo</Card.Header>
            <Card.Body>
              <Card.Title>Scegli un torneo</Card.Title>
              {isEditable(session) && newTournament ? (
                <NewTournament showMessage={showMessage} />
              ) : (
                <Form onSubmit={handleSubmit}>
                  <Select
                    components={{ IndicatorSeparator }}
                    value={selectedOption}
                    options={tournamentList}
                    placeholder="Cerca un torneo"
                    isSearchable
                    isClearable
                    onChange={handleChange}
                  />

                  <Button
                    type="submit"
                    size="lg"
                    variant="outline-warning"
                    className="float-left default-color-white"
                    disabled={!selectedOption}
                  >
                    <span style={{ fontSize: 'larger', fontWeight: 'bolder' }}>Prosegui</span>
                  </Button>
                </Form>
              )}
            </Card.Body>
            <Card.Footer>
              {isEditable(session) ? (
                newTournament ? (
                  <Button
                    type="button"
                    size="lg"
                    variant="outline-warning"
                    className="float-right default-color-white"
                    onClick={() => setNewTournament(false)}
                  >
                    Seleziona un torneo
                  </Button>
                ) : (
                  <Button
                    type="button"
                    size="lg"
                    variant="outline-warning"
                    className="float-right default-color-white"
                    onClick={() => setNewTournament(true)}
                  >
                    Crea un nuovo torneo
                  </Button>
                )
              ) : null}
            </Card.Footer>
          </Card>
        )}
      </SessionContext.Consumer>
    </>
  );
};

export default FTournament;
