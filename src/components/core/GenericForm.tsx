import { Component, FormEvent } from 'react';
import React from 'react';
import { IInputOptions } from '../types/InputOptions';
import { Form, Button } from 'react-bootstrap';

type formProps = {
  inputFields: Map<string, IInputOptions>;
  submitMessage?: string;
  onSubmit: (event: FormEvent<HTMLFormElement>, state: any) => void;
};

type formState = any;

export default class GenericForm extends Component<formProps, formState> {
  constructor(props: formProps) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    // Dinamically create state with input fields name so later i can handleChange
    const fakeState: any = {};
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
    this.setState({
      [event.currentTarget.name]: event.currentTarget.value
    } as formState);
  };

  public render() {
    // Render input fields
    const inputFields: React.ReactNode[] = [];
    let i = 0;
    this.props.inputFields.forEach((value: IInputOptions, key: string) => {
      i++;
      // Labels
      if (value.label) {
        inputFields.push(
          <Form.Group controlId={`formGroup_${i}`}>
            <Form.Label>{value.label}</Form.Label>
            <Form.Control
              key={`input${i}`}
              name={key}
              type={value.inputType ? value.inputType : 'text'}
              value={this.state[key]}
              placeholder={value.placeholder ? value.placeholder : undefined}
              onChange={value.onChange ? value.onChange : this.handleChange}
            />
          </Form.Group>
        );
      } else {
        inputFields.push(
          <Form.Group>
            <Form.Control
              key={`input${i}`}
              name={key}
              type={value.inputType ? value.inputType : 'text'}
              value={this.state[key]}
              onChange={value.onChange ? value.onChange : this.handleChange}
            />
          </Form.Group>
        );
      }
      // BreakLine
      //inputFields.push(<br></br>);
    });

    this.props.submitMessage
      ? inputFields.push(<Button type="submit">{this.props.submitMessage}</Button>)
      : inputFields.push(<Button type="submit">Submit</Button>);

    return <Form onSubmit={this.handleSubmit}>{inputFields}</Form>;
  }
}
