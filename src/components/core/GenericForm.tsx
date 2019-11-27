import { Component, Props, FormEvent } from 'react';
import React from 'react';
import { any } from 'bluebird';


type formProps = {
    // TODO: Convert to map ( name , label )
    inputFieldsNames: string[],
    onSubmit: (event: FormEvent<HTMLFormElement>) => void
}

type formState = any;

export default class GenericForm extends Component<formProps, formState> {

    constructor(props: formProps) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        // Dinamically create state with input fields name so later i can handleChange
        let fakeState: any = {};
        this.props.inputFieldsNames.forEach((elementName, index) => {
            fakeState[elementName] = '';
        });
        this.state = fakeState;
    }

    public handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        this.setState({ [event.currentTarget.name]: event.currentTarget.value } as formState);
    };

    public render() {

        // Render input fields
        const inputFields: React.ReactNode[] = [];
        this.props.inputFieldsNames.forEach(
            (elementName, index) => {
                // Labels
                // Input fields
                inputFields.push(
                    <input
                        key={elementName.concat(index.toString())}
                        name={elementName}
                        type="text"
                        value={this.state[elementName]}
                        onChange={this.handleChange}
                    >
                    </input>
                )
                // BreakLine
                inputFields.push(<br></br>);
            }
        );
        return <form onSubmit={this.props.onSubmit}>{inputFields}</form>
    }
}