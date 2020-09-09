import { useInput } from '../core/hooks/InputHook';
import { Form, Button, Row, Col } from 'react-bootstrap';
import React, { useState } from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import { SessionAction } from 'redux/actions';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { InputField } from '../core/generic/Input';
import { useTranslation } from 'react-i18next';

export interface LoginProps {}
// https://medium.com/@faizanv/authentication-for-your-react-and-express-application-w-json-web-tokens-923515826e0#6563
const Login: React.FC<LoginProps> = (): JSX.Element => {
  const dispatch = useDispatch();
  const { t } = useTranslation(['common', 'auth']);
  const currentHistory = useHistory();

  const [validated, setValidated] = useState<boolean>(false);
  const { value: username, bind: bindUsername } = useInput<string>('');
  const { value: password, bind: bindPassword } = useInput<string>('');

  const handleSubmit = async (evt: React.SyntheticEvent) => {
    evt.preventDefault();
    if (!username || username === '') {
      toast.error(t('error.username'));
      return;
    }
    if (!password || password === '') {
      toast.error(t('error.password'));
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

  // i18n.changeLanguage('it');
  return (
    <Form onSubmit={handleSubmit} noValidate validated={validated}>
      <InputField
        controlId="username"
        label={t('usernameEmail')}
        required={true}
        type="text"
        placeholder={t('usernameEmail')}
        {...bindUsername}
      />

      <InputField
        controlId="password"
        label={t('password')}
        required={true}
        type="password"
        placeholder={t('password')}
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
            {t('confim')}
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default withRouter(Login);
