import { useInput } from '../core/hooks/InputHook';
import { Form, Button, Row, Col } from 'react-bootstrap';
import React from 'react';
import { useHistory, RouteComponentProps, withRouter } from 'react-router-dom';
import { SessionAction, TournamentAction } from 'redux/actions';
import { useDispatch } from 'react-redux';
import { UserDTO } from 'redux/models/user.model';
import { UserMessage } from 'redux/models';
import { toast } from 'react-toastify';

interface PropsType extends RouteComponentProps {}

// https://medium.com/@faizanv/authentication-for-your-react-and-express-application-w-json-web-tokens-923515826e0#6563
const Login: React.FC<PropsType> = (): JSX.Element => {
  const dispatch = useDispatch();
  const currentHistory = useHistory();

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
    try {
      const response = await fetch('/api/v1/auth/authenticate', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
      const result: UserDTO = await response.json();
      if (response.ok && result) {
        // Messaggio di benvenuto
        const message: UserMessage = { type: 'success', message: `Bentornato ${result.username} !` };
        toast.success(message.message);
        dispatch(SessionAction.updateSession({ user: result, message, showMessage: true }));
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
      console.log('onSubmitLogin : ', error);
      toast.error('Errore durante il processo di registrazione. Riprovare piu tardi');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="username">
        <Form.Label>Username o Email</Form.Label>
        <Form.Control required type="text" placeholder="username o email" {...bindUsername} />
      </Form.Group>

      <Form.Group controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control required type="password" placeholder="Password" {...bindPassword} />
      </Form.Group>
      <Row>
        <Col>
          <Button size="lg" variant="outline-success" className="float-right" type="submit">
            Conferma
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default withRouter(Login);
