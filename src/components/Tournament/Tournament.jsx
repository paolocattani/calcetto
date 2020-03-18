import React, { useState, useEffect } from 'react';
import CreatableSelect from 'react-select/creatable';
import { Form, Button, Card } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { getTodayDate } from '../core/utils';
import { fetchTournaments, getEmptyTournament, customFilter } from './helper';
import { TournamentProgress } from './type';
import { useSessionContext } from '../core/SessionContext';

const FTournament = () => {
  // State definition
  const [selectedOption, setSelectedOption] = useState(getTodayDate());
  const [tournamentList, setTournamentList] = useState([]);
  let currentHistory = useHistory();
  // Context
  const [sessionContext] = useSessionContext();
  const editable = sessionContext.isAuthenticated && sessionContext.role === 'Admin';

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
    const res = await response.json();
    currentHistory.push(`/tournament/${res.id}`);
  };

  return (
    <Card style={cardStyle}>
      <Card.Header as="h2">Torneo</Card.Header>
      <Card.Body>
        <Card.Title>Scegli un torneo</Card.Title>
        <Form onSubmit={handleSubmit}>
          {
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
              isSearchable={true}
              isClearable
              onChange={handleChange}
              onCreateOption={handleCreate}
            />
          }
          <br></br>
          <Button type="submit" size="lg" variant="outline-warning" disabled={!selectedOption}>
            Continua
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

// TODO:
// https://react-select.com/components#components

// Indicator Separator
const indicatorSeparatorStyle = {
  alignSelf: 'stretch',
  backgroundColor: 'green',
  marginBottom: 8,
  marginTop: 8,
  marginRigth: 10,
  width: 1
};

const IndicatorSeparator = ({ innerProps }) => <span style={indicatorSeparatorStyle} {...innerProps} />;

const cardStyle = {
  width: '50%',
  margin: 'auto',
  backgroundColor: 'inherit',
  borderColor: '#ffc107',
  borderWidth: '3px'
};

const formatNewLabel = inputString => (
  <strong>
    {inputString}
    <small style={{ color: '#ccc' }}>@ New</small>
  </strong>
);

const formatOptionLabel = ({ name, progress, innerProps }) => (
  <strong>
    {name}
    <small style={{ color: '#ccc' }}>@{progress}</small>
  </strong>
);
export default FTournament;
