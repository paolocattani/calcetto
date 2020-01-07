import React, { useState, useEffect } from 'react';
import CreatableSelect from 'react-select/creatable';
import { components } from 'react-select';
import { Form, Button, Card } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { useHistory } from 'react-router';
import { getTodayDate } from './core/utils';

//export default const FTournament: React.FC = () => {
export default function FTournament() {
  // State definition
  const [selectedOption, setSelectedOption] = useState(getTodayDate());
  const [tournamentList, setTournamentList] = useState([]);
  let currentHistory = useHistory();

  useEffect(() => {
    // [Using an IIFE](https://medium.com/javascript-in-plain-english/https-medium-com-javascript-in-plain-english-stop-feeling-iffy-about-using-an-iife-7b0292aba174)
    (async function fetchTournament() {
      const response = await fetch('/api/tournament/list', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      const result = await response.json();
      let found = false;
      let tmp = [];
      result.forEach(e => {
        if (e.name === getTodayDate()) found = true;
        tmp.push({ id: e.id, value: e.name, label: e.name });
      });
      if (!found) tmp.unshift({ id: null, value: getTodayDate(), label: getTodayDate() });
      setTournamentList(tmp);
      setSelectedOption(tmp[0]);
    })();
  }, []);

  const handleChange = selectedOption => setSelectedOption(selectedOption);
  const handleCreate = selectedOption => {
    console.log('handleCreate : ', selectedOption);
    setSelectedOption(selectedOption);
    setTournamentList(prevList => [...prevList, { value: selectedOption, label: selectedOption }]);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const model = {
      name: selectedOption.value,
      ownerId: 1,
      progress: 'WIP',
      public: true
    };
    console.log('handleSubmit : Model -> ', model);
    const response = await fetch('/api/tournament', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(model)
    });
    const res = await response.json();
    console.log('handleSubmit : fetch result -> ', res);
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
            value={selectedOption}
            options={tournamentList}
            placeholder="Scrivi qualcosa"
            isSearchable={true}
            isClearable
            onChange={handleChange}
            onCreateOption={handleCreate}
          />
          <br></br>
          <Button type="submit">Continua</Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

// TODO:
// https://react-select.com/components#components
const IndicatorsContainer = props => {
  return (
    <div style={{ background: 'red' }}>
      {/* eslint-disable-next-line */}
      <components.IndicatorsContainer {...props} />
    </div>
  );
};
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
