import React from 'react';
import CreatableSelect from 'react-select/creatable';

import { Form, Button, Card } from 'react-bootstrap';

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];

const cardStyle = {
    width: "50%",
    margin: "auto"
}
export default class Dropdown extends React.Component {
    state = {
        selectedOption: null,
        tournamentList: []
    };

    handleChange = selectedOption => {
        this.setState({ selectedOption }, () => console.log(`Option selected:`, this.state.selectedOption));
    };

    async componentDidMount() {
        // Fetch data from db
        const response = await fetch(`/api/tournament/list`, { method: 'GET', headers: { 'Content-Type': 'application/json' } });
        const result = await response.json();
        let tmp = [];
        result.forEach((e) => tmp.push({
            value: e.name,
            label: e.name
        }));
        this.setState({ tournamentList: tmp });
    }

    async handleSubmit(event) {
        console.log(this.state)
        const model = {
            name: this.state.nome,
            ownerId: 1,
            progress: 'WIP',
            public: true,
        }
        console.log(model);
        event.preventDefault();
    }

    render() {
        const { selectedOption } = this.state;

        return (
            <Card style={cardStyle}>
                <Card.Body>
                    <Card.Title>Scegli un torneo</Card.Title>
                    <Form onSubmit={this.handleSubmit}>
                        <CreatableSelect
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