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
    dispatch(SessionAction.login.request({ username, password, history: currentHistory }));
    /*

        FIXME: create a better action flow
        - Set is loading
        - Try to authenticate
          - If error -> show message
        - Fetch Tournament List
        - Navigate to home
        - set is loading false

    try {
      const response = await fetch('/api/v1/auth/authenticate', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
      const result: UserDTO = await response.json();
      if (response.ok && result) {
        // Messaggio di benvenuto
        toast.success(`Bentornato ${result.username} !`);
        dispatch(SessionAction.login.request({ username, password, history: currentHistory }));
        dispatch(TournamentAction.fetchTournaments.request({}));
        dispatch(
          SessionAction.sessionControl.request({
            history: currentHistory,
          })
        );
        currentHistory.push('/');
      } else {
        if (response.status === 401) toast.error('Utente o Password errata');
        else toast.error('Errore server. Riprovare piu tardi');
      }
    } catch (error) {
      // console.log('onSubmitLogin : ', error);
      toast.error('Errore durante il processo di registrazione. Riprovare piu tardi');
    }
      */
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
