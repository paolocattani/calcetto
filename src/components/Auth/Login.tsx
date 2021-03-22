import { useInput } from '../core/hooks/InputHook';
import { Form, Button, Row, Col } from 'react-bootstrap';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthAction } from '../../redux/actions';
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

	const isValid = () => {
		const errors: Array<string> = [];
		if (!username) {
			errors.push('auth:error.username');
		}
		if (!password) {
			errors.push('auth:error.password.password');
		}
		if (errors.length !== 0) {
			errors.forEach((e) => toast.error(t(e)));
			return false;
		}
		return true;
	};

	const handleSubmit = async (evt: React.SyntheticEvent) => {
		evt.preventDefault();
		if (!isValid()) {
			return;
		}
		setValidated(true);
		dispatch(
			AuthAction.login.request({
				username: username.trim(),
				password: password.trim(),
				history: currentHistory,
			})
		);
	};

	// i18n.changeLanguage('it');
	return (
		<Form id="loginFormId" onSubmit={handleSubmit} noValidate validated={validated}>
			<InputField
				controlId="username"
				label={t('auth:usernameEmail')}
				type="text"
				autoComplete="current-password"
				placeholder={t('auth:usernameEmail')}
				required
				{...bindUsername}
			/>

			<InputField
				controlId="password"
				label={t('auth:password.password')}
				type="password"
				placeholder={t('auth:password.password')}
				required
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
						{t('common:confirm')}
					</Button>
				</Col>
			</Row>
		</Form>
	);
};

export default Login;
