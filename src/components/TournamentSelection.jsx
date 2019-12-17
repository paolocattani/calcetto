import React from 'react';
import CreatableSelect from 'react-select/creatable';
import { components } from 'react-select';
import { Form, Button, Card } from 'react-bootstrap';
import { Redirect } from "react-router-dom";

export default class TournamentSelection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: null,
            tournamentList: [],
            redirectTo: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = selectedOption => {
        this.setState({ selectedOption }, () => console.log(`Option selected:`, this.state.selectedOption));
    };

    async componentDidMount() {
        // Fetch data from db
        const response = await fetch(`/api/tournament/list`, { method: 'GET', headers: { 'Content-Type': 'application/json' } });
        const result = await response.json();
        let tmp = [];
        result.forEach((e) => tmp.push({
            id: e.id,
            value: e.name,
            label: e.name
        }));
        this.setState({ tournamentList: tmp });
    }

    async handleSubmit(event) {
        //event.preventDefault();
        console.log(`Application's state :`, this.state)
        const model = {
            name: this.state.selectedOption,
            ownerId: 1,
            progress: 'WIP',
            public: true,
        }
        console.log(`handleSubmit : Model -> `, model);
        const response = await fetch(`/api/tournament`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(model),
        });
        const res = await response.json();
        console.log(`handleSubmit : fetch result -> `, res);
        if (res.message)
            console.log(res.message);
    }

    render() {
        const { selectedOption } = this.state;

        if (this.state.redirectTo !== '')
            return <Redirect to="/home" />

        return (
            <Card style={cardStyle}>
                <Card.Body>
                    <Card.Title>Scegli un torneo</Card.Title>
                    <Form onSubmit={this.handleSubmit}>
                        <CreatableSelect
                            components={{ IndicatorSeparator, IndicatorsContainer }}
                            value={selectedOption}
                            onChange={this.handleChange}
                            options={this.state.tournamentList}
                            placeholder='Scrivi qualcosa'
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
    width: 1,
};

const IndicatorSeparator = ({ innerProps }) => {
    return <span style={indicatorSeparatorStyle} {...innerProps} />;
};


function getTodayDate() {
    let today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    return `${yyyy}-${mm}-${dd}`;
}

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];

const cardStyle = {
    width: "50%",
    margin: "auto"
}