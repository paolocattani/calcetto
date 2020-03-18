import * as React from 'react';
import { Form, Field, ErrorMessage } from 'formik';
import { Row, Col, FormControl, Button } from 'react-bootstrap';
import PlayerSelect from '../Player/select';

const RegisterForm: React.FC<any> = (playerList: any) => (
  <Form>
    <Row>
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
          <strong>La password deve rispettara i sequenti criteri :</strong>

          <ul>
            <li key={'pass-1'}>Almeno 1 carattere minuscolo</li>
            <li key={'pass-2'}>Almeno 1 carattere maiuscolo</li>
            <li key={'pass-3'}>Almeno 1 carattere numerico</li>
            <li key={'pass-4'}>Almeno 1 carattere speciale</li>
            <li key={'pass-5'}>Tra 8 e 16 caratteri</li>
          </ul>
        </Row>
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
        <label htmlFor="phone">Telefono</label>
        <Field as={FormControl} id="phone" name="phone" placeholder="Telefono" type="text" />
        <ErrorMessage name="phone" />
      </Col>
      <Col md={6}>
        <label htmlFor="player">Giocatore</label>
        <Field as={PlayerSelect} id="player" name="player" placeholder="Seleziona Giocatore" type="text" />
        <ErrorMessage name="player" />
      </Col>
    </Row>
    {/*
          <label htmlFor="birthday">Data di nascita</label>
          <Field id="birthday" name="birthday" placeholder="Data di nascita" type="text" />
          <ErrorMessage name="birthday" />
            */}
    <Row>
      <Col>
        <Button type="submit">Conferma</Button>
      </Col>
    </Row>
  </Form>
);

export default RegisterForm;
