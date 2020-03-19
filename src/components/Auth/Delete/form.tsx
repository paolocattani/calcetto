import * as React from 'react';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { IDeleteFormValue, IDeleteForm } from '../types';
import { Row, Col, FormControl, Button } from 'react-bootstrap';

const initialValues: IDeleteFormValue = {
  email: '',
  password: ''
};

const validationSchema = yup.object().shape({ password: yup.string(), email: yup.string() });

const Delete: React.FC<IDeleteForm> = ({ onSubmit, email }: IDeleteForm) => (
  <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={onSubmit}>
    <Form>
      <Row>
        <Col>
          <label htmlFor="email">Conferma Email</label>
          <Field as={FormControl} id="email" name="email" placeholder="Email" type="email" disabled value={email} />
        </Col>
      </Row>

      <Row>
        <Col>
          <label htmlFor="password">Conferma Password</label>
          <Field as={FormControl} id="password" name="password" placeholder="Password" type="password" />
        </Col>
      </Row>
      <Row>
        <Col>
          <Button type="submit" variant="danger">
            Cancella Utente
          </Button>
        </Col>
      </Row>
    </Form>
  </Formik>
);

export default Delete;
