import { useInput } from '../core/hooks/InputHook';
import { Form, Button, Col } from 'react-bootstrap';
import React, { SetStateAction } from 'react';
import DatePicker from 'react-datepicker';
import Select, { StylesConfig } from 'react-select';
import './style.css';
import { emailRegExp, passwordRegExp } from '../core/utils';
import { UserDTO } from 'models/user.model';
import { SessionAction } from 'actions';
import { useDispatch } from 'react-redux';
import { withRouter, RouteComponentProps, useHistory } from 'react-router-dom';
import { PlayerRole, UserMessage } from 'models';
import { toast } from 'react-toastify';

interface PropsType extends RouteComponentProps {
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
}

const playerRoles = [
  { value: PlayerRole.NotAPlayer, label: PlayerRole.NotAPlayer },
  { value: PlayerRole.GoalKeeper, label: PlayerRole.GoalKeeper },
  { value: PlayerRole.Striker, label: PlayerRole.Striker },
  { value: PlayerRole.Master, label: PlayerRole.Master },
];

// https://medium.com/@faizanv/authentication-for-your-react-and-express-application-w-json-web-tokens-923515826e0#6563
const Register: React.FC<PropsType> = ({ setErrorMessage }): JSX.Element => {
  const dispatch = useDispatch();
  const currentHistory = useHistory();
  const { value: username, bind: bindUsername, reset: resetUsername } = useInput('');
  const { value: name, bind: bindName, reset: resetName } = useInput('');
  const { value: surname, bind: bindSurname, reset: resetSurname } = useInput('');
  const { value: email, bind: bindEmail, reset: resetEmail } = useInput('');
  const { value: cEmail, bind: bindCEmail, reset: resetCEmail } = useInput('');
  const { value: password, bind: bindPassword, reset: resetPassword } = useInput('');
  const { value: cPassword, bind: bindCPassword, reset: resetCPassword } = useInput('');
  const { value: phone, bind: bindPhone, reset: resetPhone } = useInput('');
  const { value: birthday, setValue: setBirthday, reset: resetBirthday } = useInput('');
  const { value: playerRole, setValue: setPlayerRole, reset: resetPlayerRole } = useInput(playerRoles[0]);

  const reset = () => {
    resetUsername();
    resetName();
    resetSurname();
    resetEmail();
    resetCEmail();
    resetPassword();
    resetCPassword();
    resetPhone();
    resetBirthday();
    resetPlayerRole();
  };

  const isValid = () => {
    if (!username) {
      toast.error('Scegli uno username');
      return false;
    }
    if (!name) {
      toast.error('Inserire il nome');
      return false;
    }
    if (!surname) {
      toast.error('Inserire il cognome');
      return false;
    }
    if (!email) {
      toast.error('Inserire una email');
      return false;
    }
    if (!emailRegExp.test(email)) {
      toast.error('Inserire una email valida');
      return false;
    }

    if (!cEmail) {
      toast.error('Inserire la conferma email');
      return false;
    }
    if (!emailRegExp.test(cEmail)) {
      toast.error('Inserire una email valida');
      return false;
    }
    if (email !== cEmail) {
      toast.error('Le email non corrispondono');
      return false;
    }
    if (!password) {
      toast.error('Inserire una password');
      return false;
    }
    if (!passwordRegExp.test(password)) {
      toast.error('La password non rispetta i criteri');
      return false;
    }
    if (!cPassword) {
      toast.error('Inserire la conferma password');
      return false;
    }
    if (!passwordRegExp.test(cPassword)) {
      toast.error('La password non rispetta i criteri');
      return false;
    }
    if (password !== cPassword) {
      toast.error('Le password non corrispondono');
      return false;
    }

    return true;
  };

  const handleSubmit = async (evt: React.SyntheticEvent) => {
    evt.preventDefault();
    if (!isValid()) return;

    try {
      const response = await fetch('/api/v1/auth/register', {
        method: 'POST',
        body: JSON.stringify({ username, name, surname, email, password, phone, birthday, playerRole }),
        headers: { 'Content-Type': 'application/json' },
      });
      const result: UserDTO = await response.json();
      if (response.ok && result) {
        // Messaggio di benvenuto
        const message: UserMessage = { type: 'success', message: `Benvenuto ${result.username} !` };
        toast.success(message.message);
        dispatch(SessionAction.updateSession({ user: result }));
        dispatch(SessionAction.sessionControl.request({ history: currentHistory }));
      } else {
        switch (response.status) {
          case 401:
            toast.error('Utente o Password errata');
            break;
          case 403:
            toast.error('Utente o Email gia registrati');
            break;
          default:
            break;
        }
      }
    } catch (error) {
      console.error('onSubmitLogin : ', error);
      toast.error('Errore durante il processo di registrazione. Riprovare piu tardi');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {/* Username - Name - Surname */}
      <Form.Row>
        <Col>
          <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control required type="text" placeholder="username" {...bindUsername} />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="name">
            <Form.Label>Nome</Form.Label>
            <Form.Control required type="text" placeholder="Nome" {...bindName} />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="surname">
            <Form.Label>Cognome</Form.Label>
            <Form.Control required type="text" placeholder="Cognome" {...bindSurname} />
          </Form.Group>
        </Col>
      </Form.Row>
      {/* Email - Conferma Email */}
      <Form.Row>
        <Col>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control required type="email" placeholder="Email" {...bindEmail} />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="cemail">
            <Form.Label>Conferma Email</Form.Label>
            <Form.Control required type="email" placeholder="Conferma Email" {...bindCEmail} />
          </Form.Group>
        </Col>
      </Form.Row>
      {/* Password - Conferma Password */}
      <Form.Row>
        <Col>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control required type="password" placeholder="Password" {...bindPassword} />
          </Form.Group>
          <Form.Group controlId="cpassword">
            <Form.Label>Conferma Password</Form.Label>
            <Form.Control required type="password" placeholder="Conferma Password" {...bindCPassword} />
          </Form.Group>
        </Col>
        <Col md={6} style={{ display: 'flex', alignItems: 'center' }}>
          <ul>
            <strong>La password deve rispettare i sequenti criteri :</strong>
            <li key={'pass-1'}>Almeno 1 carattere minuscolo</li>
            <li key={'pass-2'}>Almeno 1 carattere maiuscolo</li>
            <li key={'pass-3'}>Almeno 1 carattere numerico</li>
            <li key={'pass-5'}>Tra 8 e 16 caratteri</li>
          </ul>
        </Col>
      </Form.Row>
      <Form.Row>
        <Col md={3}>
          <Form.Group controlId="phone">
            <Form.Label>Telefono</Form.Label>
            <Form.Control type="text" placeholder="Telefono" {...bindPhone} />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group controlId="birthday">
            <Form.Label>Data di nascita</Form.Label>
            <DatePicker
              className="datepicker"
              dateFormat="dd/MM/yyyy"
              required
              selected={birthday}
              onChange={(val) => setBirthday(val)}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Ruolo</Form.Label>
            <Select
              dateFormat="dd/MM/yyyy"
              value={playerRole}
              onChange={(newValue) => setPlayerRole(newValue)}
              options={playerRoles}
              styles={selectStyles}
            />
            <Form.Text className="text-muted default-color-green">
              Sei un giocatore? Assegna qui il tuo ruolo.
            </Form.Text>
          </Form.Group>
        </Col>
      </Form.Row>

      <Button variant="outline-success" className="float-right" type="submit" size="lg">
        Conferma
      </Button>

      <Button variant="outline-danger" className="float-left" onClick={reset} type="submit">
        Reset
      </Button>
    </Form>
  );
};

export default withRouter(Register);

const selectStyles: StylesConfig = {
  control: (styles) => ({ ...styles, height: '38px' }),
  input: (styles) => ({ ...styles, height: '38px' }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => ({ ...styles, color: 'black' }),
  placeholder: (styles) => ({ ...styles, height: '38px' }),
  singleValue: (styles, { data }: any) => ({ ...styles, height: '38px' }),
  clearIndicator: (styles) => ({ ...styles, height: '38px' }),
  indicatorSeparator: (styles) => ({ ...styles }),
};
