import { useInput } from '../core/hooks/InputHook';
import { Form, Button, Row, Col } from 'react-bootstrap';
import React, { useState } from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import { SessionAction } from 'redux/actions';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { InputField } from '../core/generic/Input';

export interface LoginProps {}
// https://medium.com/@faizanv/authentication-for-your-react-and-express-application-w-json-web-tokens-923515826e0#6563
const Login: React.FC<LoginProps> = (): JSX.Element => {
  const dispatch = useDispatch();
  const currentHistory = useHistory();

  const [validated, setValidated] = useState<boolean>(false);
  const { value: username, bind: bindUsername } = useInput<string>('');
  const { value: password, bind: bindPassword } = useInput<string>('');

  const handleSubmit = async (evt: React.SyntheticEvent) => {
    evt.preventDefault();
    if (!username || username === '') {
      toast.error('Inserire username o password');
      return;
    }
    if (!password || password === '') {
      toast.error('Inserire la password');
      return;
    }
    setValidated(true);
    dispatch(
      SessionAction.login.request({
        username: username.trim(),
        password: password.trim(),
        history: currentHistory,
      })
    );
  };

  return (
    <Form onSubmit={handleSubmit} noValidate validated={validated}>
      <InputField
        controlId="username"
        label="Username o Email"
        required={true}
        type="text"
        placeholder="username o email"
        {...bindUsername}
      />

      <InputField
        controlId="password"
        label="Password"
        required={true}
        type="password"
        placeholder="Password"
        invalidFeedback="Inserire la password"
        {...bindPassword}
      />
      <Row>
        <Col>
          <Button
            id="loginButton"
            size="lg"
            variant="outline-success"
            className="float-right"
            type="submit"
            disabled={!username || !password}
          >
            Conferma
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default withRouter(Login);
