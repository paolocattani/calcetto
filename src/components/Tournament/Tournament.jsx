import React, { useState, useEffect } from 'react';
// React-Select
import Select from 'react-select';
// Bootstrap
import { Form, Button, Card, Col } from 'react-bootstrap';
import { useHistory } from 'react-router';
// Core
import { getTodayDate } from '../core/utils';
import { SessionContext, isEditable } from '../core/routing/SessionContext';
import { GenericToast } from '../core/generic/Commons';
// Helper
import { fetchTournaments, cardStyle, IndicatorSeparator } from './helper';
import { formatDate, translateTournamentProgress } from '../core/utils';
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
              <Col>
                {isEditable(session) && newTournament ? (
                  <NewTournament showMessage={showMessage} />
                ) : (
                  <Form onSubmit={handleSubmit}>
                    <label htmlFor="tournamentSelect">Selezione Torneo</label>
                    <Select
                      id="tournamentSelect"
                      components={{ IndicatorSeparator }}
                      styles={customStyles}
                      value={selectedOption}
                      options={tournamentList}
                      placeholder="Cerca un torneo"
                      isSearchable
                      getOptionLabel={getOptionLabel}
                      isClearable
                      onChange={selectedOption => setSelectedOption(selectedOption)}
                    />
                    <Button
                      type="submit"
                      size="md"
                      variant="outline-warning"
                      className="float-left default-color-white"
                      disabled={!selectedOption}
                    >
                      <span style={{ fontSize: 'larger', fontWeight: 'bolder' }}>Prosegui</span>
                    </Button>
                  </Form>
                )}
              </Col>
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

const getOptionLabel = ({ name, date, progress }) =>
  name + ' - ' + formatDate(date) + '@' + translateTournamentProgress(progress);

const customStyles = {
  // menuList: (provided, state) => ({ ...provided, border: '1px solid #ffc107' }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: 'white',
    color: 'black',
    '&:hover': {
      backgroundColor: '#64bd9c',
      color: 'white'
    }
  }),
  control: provided => ({ ...provided, height: '3vmin', marginBottom: '40px' }),
  singleValue: (provided, state) => ({ ...provided }),
  valueContainer: provided => ({ ...provided, height: '100%', fontSize: 'larger' })
};
