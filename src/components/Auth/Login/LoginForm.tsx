import * as React from 'react';
import { Form, Field, ErrorMessage } from 'formik';
import { Row, Col, FormControl, Button } from 'react-bootstrap';
/* TODO:
  import FacebookLogin from 'react-facebook-login';
  import GoogleLogin, { GoogleLoginResponse } from 'react-google-login';
*/
import { ILoginForm } from '../types';

const LoginForm: React.FC<ILoginForm> = ({ responseFacebook, responseGoogle }) => (
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
        <Button variant={'warning'} type="submit">
          Login
        </Button>
      </Col>
      {/*
      https://developers.facebook.com/docs/graph-api/reference/user/
      https://medium.com/recraftrelic/login-with-facebook-and-google-in-reactjs-990d818d5dab

      <Col>

        <FacebookLogin
          appId="231770158218948"
          fields="name, email,picture,birthday,first_name,last_name,middle_name,gender,hometown"
          callback={responseFacebook}
        />
      </Col>
      <Col>
        <GoogleLogin
          clientId="" //CLIENTID NOT CREATED YET
          buttonText="LOGIN WITH GOOGLE"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
        />
      </Col>
      */}
    </Row>
  </Form>
);

export default LoginForm;
