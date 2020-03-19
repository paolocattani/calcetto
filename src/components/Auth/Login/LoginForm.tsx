import * as React from 'react';
import { Form, Field, ErrorMessage } from 'formik';
import { Row, Col, FormControl, Button } from 'react-bootstrap';

const LoginForm: React.FC = () => (
  <Form>
    <Row>
      <Col>
        <label htmlFor="email">Email</label>
        <Field as={FormControl} id="email" name="email" placeholder="Email" type="email" />
        <ErrorMessage name="email" />
      </Col>
    </Row>

    <Row>
      <Col>
        <label htmlFor="password">Password</label>
        <Field as={FormControl} id="password" name="password" placeholder="Password" type="password" />
        <ErrorMessage name="password" />
      </Col>
    </Row>
    <Row>
      <Col>
        <Button type="submit">Login</Button>
      </Col>
    </Row>
  </Form>
);

export default LoginForm;
