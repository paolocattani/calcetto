import React, { useState, useEffect } from 'react';
import CreatableSelect from 'react-select/creatable';
import { components } from 'react-select';
import { Form, Button, Card, Tooltip } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { getTodayDate } from '../core/utils';
import { fetchTournaments } from './helper';
import { TournamentProgress } from './type';

//export default const FTournament: React.FC = () => {
const FTournament = () => {
  // State definition
  const [selectedOption, setSelectedOption] = useState(getTodayDate());
  const [tournamentList, setTournamentList] = useState([]);
  let currentHistory = useHistory();

  useEffect(() => fetchTournaments(setTournamentList, setSelectedOption), []);

  const handleChange = selectedOption => setSelectedOption(selectedOption);
  const handleCreate = selectedOption => {
    setSelectedOption({ value: selectedOption, label: selectedOption });
    setTournamentList(prevList => [...prevList, { value: selectedOption, label: selectedOption }]);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const model = {
      name: selectedOption.value,
      ownerId: 1,
      progress: TournamentProgress.New,
      public: true
    };
    const response = await fetch('/api/tournament', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(model)
    });
    const res = await response.json();
    if (res.message) console.log(res.message);
    currentHistory.push(`/tournament/${res.id}`);
  };

  return (
    <Card style={cardStyle}>
      <Card.Body>
        <Card.Title>Scegli un torneo</Card.Title>
        <Form onSubmit={handleSubmit}>
          <CreatableSelect
            components={{ IndicatorSeparator, IndicatorsContainer }}
            //formatOptionLabel={formatOptionLabel}
            value={selectedOption}
            options={tournamentList}
            placeholder="Crea/Cerca un torneo"
            isSearchable={true}
            isClearable
            onChange={handleChange}
            onCreateOption={handleCreate}
          />
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
const IndicatorsContainer = props => {
  return (
    <div>
      <components.IndicatorsContainer {...props} />
    </div>
  );
};

// Indicator Separator
const indicatorSeparatorStyle = {
  alignSelf: 'stretch',
  backgroundColor: 'green',
  marginBottom: 8,
  marginTop: 8,
  marginRigth: 10,
  width: 1
};

const IndicatorSeparator = ({ innerProps }) => {
  return <span style={indicatorSeparatorStyle} {...innerProps} />;
};

const cardStyle = {
  width: '50%',
  margin: 'auto'
};

const formatOptionLabel = props => {
  console.log('format : ', props);

  return (
    <strong>
      {props.name}
      <small style={{ color: '#ccc' }}>@{props.progress}</small>
    </strong>
  );
};

export default FTournament;
