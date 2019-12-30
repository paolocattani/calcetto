import React from 'react';
import CreatableSelect from 'react-select/creatable';
import { components } from 'react-select';
import { Form, Button, Card } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

/*
type propsType = {};
type stateType = {
  selectedOption: string;
  tournamentList: Array<{ id: string; value: string; label: string }>;
  redirectTo: string;
};
*/
export default class TournamentSelection extends React.Component {
  //export default class TournamentSelection extends React.Component<propsType, stateType> {
  //constructor(props: propsType) {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: '',
      tournamentList: [],
      redirectTo: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange = (inputValue, actionMeta) => {
    console.group('Input Changed');
    console.log(inputValue);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
  };

  handleChange = selectedOption => {
    this.setState({ selectedOption }, () => console.log('Option selected:', this.state.selectedOption));
  };

  async componentDidMount() {
    // Fetch data from db
    const response = await fetch('/api/tournament/list', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    const result = await response.json();
    //const tmp: Array<{ id: string; value: string; label: string }> = [];
    //result.forEach((e: { id: string; name: string }) =>
    //let tmp = [{ id: null, value: getTodayDate(), label: getTodayDate() }];
    const tmp = [];
    result.forEach(e =>
      tmp.push({
        id: e.id,
        value: e.name,
        label: e.name
      })
    );
    this.setState({
      tournamentList: tmp
      //, selectedOption: getTodayDate()
    });
  }

  async handleSubmit(event) {
    //event.preventDefault();
    console.log("Application's state :", this.state);
    const model = {
      name: this.state.selectedOption,
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
  }

  render() {
    const { selectedOption } = this.state;

    return (
      <Card style={cardStyle}>
        <Card.Body>
          <Card.Title>Scegli un torneo</Card.Title>
          <Form onSubmit={this.handleSubmit}>
            <CreatableSelect
              components={{ IndicatorSeparator, IndicatorsContainer }}
              value={selectedOption}
              onChange={this.handleChange}
              onInputChange={this.handleInputChange}
              options={this.state.tournamentList}
              placeholder="Scrivi qualcosa"
              isSearchable={true}
              isClearable
              onCreateOption
            />
            <br></br>
            <Button type="submit">Continua</Button>
          </Form>
        </Card.Body>
      </Card>
    );
  }
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

function getTodayDate() {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  const yyyy = today.getFullYear();

  return `${yyyy}-${mm}-${dd}`;
}

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
];

const cardStyle = {
  width: '50%',
  margin: 'auto'
};
