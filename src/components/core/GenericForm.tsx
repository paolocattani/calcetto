import { Component, FormEvent } from 'react';
import React from 'react';
import { IInputOptions } from "./InputOptions";

type formProps = {
    inputFields: Map<string, IInputOptions>,
    submitMessage?: string,
    onSubmit: (event: FormEvent<HTMLFormElement>, state: any) => void
}

type formState = any;

export default class GenericForm extends Component<formProps, formState> {

    constructor(props: formProps) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        // Dinamically create state with input fields name so later i can handleChange
        let fakeState: any = {};
        this.props.inputFields.forEach((value, key) => {
            fakeState[key] = '';
        });
        this.state = fakeState;
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    public async handleSubmit(event: FormEvent<HTMLFormElement>) {
        this.props.onSubmit(event, this.state);
    }

    public handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        this.setState({ [event.currentTarget.name]: event.currentTarget.value } as formState);
    };

    public render() {

        // Render input fields
        const inputFields: React.ReactNode[] = [];
        let i: number = 0;
        this.props.inputFields.forEach((value: IInputOptions, key: string, ) => {
            i++;
            // Labels
            if (value.label) inputFields.push(<label key={`label${i}`} htmlFor={key}>{value.label} : </label>);
            // Input fields
            inputFields.push(
                <input
                    key={`input${i}`}
                    name={key}
                    type={value.inputType ? value.inputType : "text"}
                    value={this.state[key]}
                    onChange={value.onChange ? value.onChange : this.handleChange}
                >
                </input>
            )
            // BreakLine
            inputFields.push(<br></br>);
        }
        );

        (this.props.submitMessage) ?
            inputFields.push(<button type="submit">{this.props.submitMessage}</button>) :
            inputFields.push(<button type="submit">Submit</button>);

        return <form onSubmit={this.handleSubmit}>{inputFields}</form>
    }
}