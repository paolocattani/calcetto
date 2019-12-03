import { Component, FormEvent } from 'react';
import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { inspect } from 'util';


type formState = any;
type formProps = any;

export default class TournamentForm extends Component<formProps, formState> {

    constructor(props: formProps) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = { nome: getTodayDate() };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    public async handleSubmit(event: FormEvent<HTMLFormElement>) {
        console.log(inspect(this.state));
        event.preventDefault();
        const response = await fetch(`/api/player`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.state),
        });
        console.log(await response.json());
    }

    public handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        this.setState({ [event.currentTarget.name]: event.currentTarget.value } as formState);
    };

    public render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId={`tournamentForm`}>
                    <Form.Label>Nome del torneo</Form.Label>
                    <Form.Control
                        key='nome'
                        name='nome'
                        type='text'
                        value={this.state.nome}
                        placeholder='nome torneo'
                        onChange={this.handleChange}
                    />
                </Form.Group>
                <Button type="submit">Continua</Button>
            </Form >
        )
    }
}

function getTodayDate(): string {
    let today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    return `${yyyy}-${mm}-${dd}`;
}


