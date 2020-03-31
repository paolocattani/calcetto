import * as React from 'react';

import { IDeleteFormValue, IDeleteForm } from '../types';
import { Row, Col, FormControl, Button } from 'react-bootstrap';

const initialValues: IDeleteFormValue = {
  email: '',
  password: ''
};

const Delete: React.FC<IDeleteForm> = ({ onSubmit, email }: IDeleteForm) => <div></div>;
{
  /*
  <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={onSubmit}>
    <Form>
      <Row>
        <Col>
          <label htmlFor="email">Conferma Email</label>
          <Field as={FormControl} id="email" name="email" placeholder="Email" type="email" disabled va value={email} />
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
  */
}

export default Delete;
