import React from 'react';
import { Form, Field, ErrorMessage, FieldProps } from 'formik';
import { Form as BootstrapForm, Row, Col, FormControl, Button, FormGroup } from 'react-bootstrap';
import Select from 'react-select';
import DatePicker from 'react-datepicker';

const playerRoles = [
  { value: 'Portiere', label: 'Portiere' },
  { value: 'Attaccante', label: 'Attaccante' },
  { value: 'Master', label: 'Master' }
];

const RegisterForm: React.FC = _ => (
  <Form>
    <Row>
      <Col>
        <label htmlFor="username">Username</label>
        <Field as={FormControl} id="username" name="username" placeholder="Username" type="text" />
        <ErrorMessage name="username" />
      </Col>
      <Col>
        <label htmlFor="name">Nome</label>
        <Field as={FormControl} id="name" name="name" placeholder="Nome" type="text" />
        <ErrorMessage name="name" />
      </Col>
      <Col>
        <label htmlFor="surname">Cognome</label>
        <Field as={FormControl} id="surname" name="surname" placeholder="Cognome" type="text" />
        <ErrorMessage name="surname" />
      </Col>
    </Row>
    <Row>
      <Col>
        <label htmlFor="email">Email</label>
        <Field as={FormControl} id="email" name="email" placeholder="Email" type="email" />
        <ErrorMessage name="email" />
      </Col>
      <Col>
        <label htmlFor="emailConfirm">Conferma Email</label>
        <Field as={FormControl} id="emailConfirm" name="emailConfirm" placeholder="Conferma Email" type="email" />
        <ErrorMessage name="emailConfirm" />
      </Col>
    </Row>
    <Row>
      <Col md={6}>
        <label htmlFor="password">Password</label>
        <Field as={FormControl} id="password" name="password" placeholder="Password" type="password" />
        <ErrorMessage name="password" />
        <label htmlFor="passwordConfirm">Conferma Password</label>

        <Field
          as={FormControl}
          id="passwordConfirm"
          name="passwordConfirm"
          placeholder="Conferma Password"
          type="password"
        />
        <ErrorMessage name="passwordConfirm" />
      </Col>
      <Col
        md={6}
        style={{
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <Row>
          <ul>
            <strong>La password deve rispettara i sequenti criteri :</strong>
            <li key={'pass-1'}>Almeno 1 carattere minuscolo</li>
            <li key={'pass-2'}>Almeno 1 carattere maiuscolo</li>
            <li key={'pass-3'}>Almeno 1 carattere numerico</li>
            <li key={'pass-5'}>Tra 8 e 16 caratteri</li>
          </ul>
        </Row>
      </Col>
    </Row>

    <Row>
      <Col md={4}>
        <label htmlFor="phone">Telefono</label>
        <Field as={FormControl} id="phone" name="phone" placeholder="Telefono" type="text" />
        <ErrorMessage name="phone" />
      </Col>
      <Col md={3}>
        <Field id="birthday" name="birthday" component={DatePickerField} label="Anno di Nascita" />
      </Col>
      <Col md={5}>
        <Field
          id="playerRole"
          name="playerRole"
          component={CustomSelectComponent}
          options={playerRoles}
          label="Roulo"
        />
      </Col>
    </Row>
    {/*
          <label htmlFor="birthday">Data di nascita</label>
          <Field id="birthday" name="birthday" placeholder="Data di nascita" type="text" />
          <ErrorMessage name="birthday" />
            */}

    <Row></Row>
    <Row>
      <Col>
        <Button variant={'warning'} type="submit">
          Conferma
        </Button>
      </Col>
    </Row>
  </Form>
);

export default RegisterForm;

const CustomSelectComponent = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}: FieldProps & { label: string; options: Array<{ value: string; label: string }> }) => {
  const { options, label } = props;

  return (
    <FormGroup>
      <label htmlFor={field.name}>{label}</label>
      <Select
        {...field}
        {...props}
        options={options}
        value={(options ? options.find(option => option.value === field.value) : '') as any}
        onChange={option => setFieldValue(field.name, (option as any).value)}
      />
    </FormGroup>
  );
};

const DatePickerField = ({
  field,
  form: { touched, errors, setFieldValue },
  ...props
}: FieldProps & { label: string }) => {
  const { label } = props;

  return (
    <FormGroup>
      <label htmlFor={field.name}>{label}</label>
      <DatePicker selected={field.value} onChange={val => setFieldValue(field.name, val)} />
    </FormGroup>
  );
};
