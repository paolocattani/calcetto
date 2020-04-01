import { Component, FormEvent } from 'react';
import React from 'react';
import { Form, Button, Col } from 'react-bootstrap';

export type IInputOptions = {
  value?: any;
  disabled?: boolean;
  label?: string;
  inputType?: string;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export type formProps = {
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
    inputFields.forEach((input, key) => (fakeState[key] = input.value ? input.value : ''));
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
    const { state, props } = this;
    const { inputFields, submitMessage } = props;

    let i = 0;
    inputFields.forEach((input: IInputOptions, key: string) => {
      i++;
      // Labels
      if (input.label) {
        fieldsList.push(
          <Col md={4}>
            <Form.Group controlId={`formGroup_${i}`}>
              <Form.Label>{input.label}</Form.Label>
              <Form.Control
                key={`input${i}`}
                name={key}
                type={input.inputType ? input.inputType : 'text'}
                value={state[key]}
                placeholder={input.placeholder ? input.placeholder : undefined}
                onChange={input.onChange ? input.onChange : this.handleChange}
                disabled={input.disabled}
              />
            </Form.Group>
          </Col>
        );
      } else {
        fieldsList.push(
          <Col md={4}>
            <Form.Group controlId={`formGroup_${i}`}>
              <Form.Control
                key={`input${i}`}
                name={key}
                disabled={input.disabled}
                type={input.inputType ? input.inputType : 'text'}
                value={state[key]}
                onChange={input.onChange ? input.onChange : this.handleChange}
              />
            </Form.Group>
          </Col>
        );
      }
      // BreakLine
      //inputFields.push(<br></br>);
    });

    submitMessage
      ? fieldsList.push(<Button type="submit">{submitMessage}</Button>)
      : fieldsList.push(<Button type="submit">Conferma</Button>);

    return <Form onSubmit={this.handleSubmit}>{fieldsList}</Form>;
  }
}
