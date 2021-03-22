import { useInput } from '../core/hooks/InputHook';
import { Form, Button, Col } from 'react-bootstrap';
import React from 'react';
import DatePicker from 'react-datepicker';
import Select, { StylesConfig, ValueType } from 'react-select';
import './style.css';
import { emailRegExp, passwordRegExp } from '../../@common/utils/math.utils';
import { AuthAction } from '../../redux/actions';
import { useDispatch } from 'react-redux';
import { withRouter, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { InputField } from '../core/generic/Input';
import { useTranslation } from 'react-i18next';
import { PlayerRoleType } from '../../@common/models';
import { PlayerRole } from '../../@common/dto';
import { LABEL_AUTH_PASSWORD } from '../../@common/constants/label';

interface RegisterProps {}

// https://medium.com/@faizanv/authentication-for-your-react-and-express-application-w-json-web-tokens-923515826e0#6563
const Register: React.FC<RegisterProps> = (): JSX.Element => {
	const dispatch = useDispatch();
	const currentHistory = useHistory();
	const { t } = useTranslation(['common', 'auth', 'player']);

	const playerRoles: ReadonlyArray<PlayerRoleType> = [
		{ value: PlayerRole.NotAPlayer, label: t('player:role.none') },
		{ value: PlayerRole.GoalKeeper, label: t('player:role.goalKeeper') },
		{ value: PlayerRole.Striker, label: t('player:role.striker') },
		{ value: PlayerRole.Master, label: t('player:role.master') },
	];

	const { value: username, bind: bindUsername, reset: resetUsername } = useInput<string>('');
	const { value: name, bind: bindName, reset: resetName } = useInput<string>('');
	const { value: surname, bind: bindSurname, reset: resetSurname } = useInput<string>('');
	const { value: email, bind: bindEmail, reset: resetEmail } = useInput<string>('');
	const { value: cEmail, bind: bindCEmail, reset: resetCEmail } = useInput<string>('');
	const { value: password, bind: bindPassword, reset: resetPassword } = useInput<string>('');
	const { value: cPassword, bind: bindCPassword, reset: resetCPassword } = useInput<string>('');
	const { value: phone, bind: bindPhone, reset: resetPhone } = useInput<string>('');
	const { value: birthday, setValue: setBirthday, reset: resetBirthday } = useInput<Date | null>(new Date());
	const { value: playerRole, setValue: setPlayerRole, reset: resetPlayerRole } = useInput<PlayerRoleType>(
		playerRoles[0]
	);

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
		const errors: Array<string> = [];
		if (!username) {
			errors.push('auth:error.username');
		}
		if (!name) {
			errors.push('auth:error.name');
		}
		if (!surname) {
			errors.push('auth:error.surname');
		}
		if (!email) {
			errors.push('auth:error.email.address');
		}
		if (!emailRegExp.test(email)) {
			errors.push('auth:error.email.validation');
		}
		if (!cEmail) {
			errors.push('auth:error.email.confirm');
		}
		if (!emailRegExp.test(cEmail)) {
			errors.push('auth:error.email.validation');
		}
		if (email !== cEmail) {
			errors.push('auth:error.email.match');
		}
		if (!password) {
			errors.push('auth:error.password.password');
		}
		if (!passwordRegExp.test(password)) {
			errors.push('auth:error.password.validation');
		}
		if (!cPassword) {
			errors.push('auth:error.password.confirm');
		}
		if (!passwordRegExp.test(cPassword)) {
			errors.push('auth:error.password.validation');
		}
		if (password !== cPassword) {
			errors.push('auth:error.password.match');
		}

		if (errors.length !== 0) {
			errors.forEach((e) => toast.error(t(e)));
			return false;
		}
		return true;
	};

	const handleSubmit = async (evt: React.SyntheticEvent) => {
		evt.preventDefault();
		if (!isValid()) return;

		dispatch(
			AuthAction.registration.request({
				username: username.trim(),
				name: name.trim(),
				surname: surname.trim(),
				email: email.trim(),
				confirmEmail: cEmail.trim(),
				password: password.trim(),
				confirmPassword: cPassword.trim(),
				phone: phone.trim(),
				birthday: birthday,
				playerRole: playerRole.value,
				history: currentHistory,
			})
		);
	};

	const onSelectPlayerRole = (newRole: ValueType<PlayerRoleType, false>) => {
		if (newRole) {
			setPlayerRole(newRole as PlayerRoleType);
		}
	};

	return (
		<Form onSubmit={handleSubmit}>
			{/* Username - Name - Surname */}
			<Form.Row>
				<Col>
					<InputField
						controlId="username"
						required
						label={t('auth:username')}
						placeholder={t('auth:username')}
						{...bindUsername}
					/>
				</Col>
				<Col>
					<InputField controlId="name" required label={t('auth:name')} placeholder={t('auth:name')} {...bindName} />
				</Col>
				<Col>
					<InputField
						controlId="surname"
						required
						label={t('auth:surname')}
						placeholder={t('auth:surname')}
						{...bindSurname}
					/>
				</Col>
			</Form.Row>
			{/* Email - Conferma Email */}
			<Form.Row>
				<Col>
					<InputField
						controlId="email"
						label={t('auth:email.email')}
						required
						type="email"
						placeholder={t('auth:email.email')}
						{...bindEmail}
					/>
				</Col>
				<Col>
					<InputField
						controlId="cemail"
						required
						label={t('auth:email.confirm')}
						type="email"
						placeholder={t('auth:email.confirm')}
						{...bindCEmail}
					/>
				</Col>
			</Form.Row>
			{/* Password - Conferma Password */}
			<Form.Row>
				<Col>
					<InputField
						controlId="password"
						required
						label={t(LABEL_AUTH_PASSWORD)}
						type="password"
						placeholder={t(LABEL_AUTH_PASSWORD)}
						{...bindPassword}
					/>
					<InputField
						controlId="cpassword"
						required
						label={t('auth:password.confirm')}
						type="password"
						placeholder={t(LABEL_AUTH_PASSWORD)}
						{...bindCPassword}
					/>
				</Col>
				<Col md={6} style={{ display: 'flex', alignItems: 'center' }}>
					<ul>
						<strong>{t('auth:password.criteria.title')} :</strong>
						<li key={'pass-1'}>{t('auth:password.criteria.c1')}</li>
						<li key={'pass-2'}>{t('auth:password.criteria.c2')}</li>
						<li key={'pass-3'}>{t('auth:password.criteria.c3')}</li>
						<li key={'pass-4'}>{t('auth:password.criteria.c4')}</li>
					</ul>
				</Col>
			</Form.Row>
			<Form.Row>
				<Col md={3}>
					<InputField controlId="phone" label={t('auth:mobile')} placeholder={t('auth:mobile')} {...bindPhone} />
				</Col>
				<Col md={3}>
					<Form.Group controlId="birthday">
						<Form.Label onClick={(e: any) => e.preventDefault()}>{t('auth:birthday')}</Form.Label>
						<DatePicker
							id="birthday"
							selected={birthday}
							locale="it-IT"
							className="datepicker"
							dateFormat="dd/MM/yyyy"
							withPortal
							required
							showYearDropdown
							scrollableYearDropdown
							yearDropdownItemNumber={100}
							selectsRange={false}
							onChange={(newValue: Date) => setBirthday(newValue)}
						/>
					</Form.Group>
				</Col>
				<Col md={6}>
					<Form.Group>
						<Form.Label>{t('player:role.role')}</Form.Label>
						<Select
							id="playerRole"
							textFieldProps={{
								label: 'Ruolo',
							}}
							value={playerRole}
							onChange={(newValue) => onSelectPlayerRole(newValue)}
							options={playerRoles}
							styles={selectStyles}
						/>
						<Form.Text className="text-muted default-color-green">{t('auth:player')}</Form.Text>
					</Form.Group>
				</Col>
			</Form.Row>

			<Button id="registerButton" variant="outline-success" className="float-right" type="submit" size="lg">
				{t('common:confirm')}
			</Button>

			<Button id="resetButton" variant="outline-danger" className="float-left" onClick={reset} type="submit">
				{t('common:reset')}
			</Button>
		</Form>
	);
};

export default withRouter(Register);

const selectStyles: StylesConfig<PlayerRoleType, false> = {
	control: (styles) => ({ ...styles, height: '38px' }),
	input: (styles) => ({ ...styles, height: '38px' }),
	option: (styles /*, { data, isDisabled, isFocused, isSelected }*/) => ({ ...styles, color: 'black' }),
	placeholder: (styles) => ({ ...styles, height: '38px' }),
	singleValue: (styles /*, { data }: any*/) => ({ ...styles, height: '38px' }),
	clearIndicator: (styles) => ({ ...styles, height: '38px' }),
	indicatorSeparator: (styles) => ({ ...styles }),
};
