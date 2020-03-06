import { Component, FormEvent } from 'react';
import React from 'react';
import { Form, Button } from 'react-bootstrap';

type IInputOptions = {
  label?: string;
  inputType?: string;
  placeholder?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

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
    const { inputFields } = this.props;
    inputFields.forEach((value, key) => (fakeState[key] = ''));
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
    const fieldsList: React.ReactNode[] = [];
    const { inputFields, submitMessage } = this.props;

    let i = 0;
    inputFields.forEach((value: IInputOptions, key: string) => {
      i++;
      // Labels
      if (value.label) {
        fieldsList.push(
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
        fieldsList.push(
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

    submitMessage
      ? fieldsList.push(<Button type="submit">{submitMessage}</Button>)
      : fieldsList.push(<Button type="submit">Submit</Button>);

    return <Form onSubmit={this.handleSubmit}>{fieldsList}</Form>;
  }
}
