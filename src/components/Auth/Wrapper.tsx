import React, { useState, CSSProperties, lazy } from 'react';
import { Button, Container, Card, Col } from 'react-bootstrap';
import { ToggleOn, ToggleOff } from '../core/icons';
import { useTranslation } from 'react-i18next';

const Login = lazy(() => import('./Login'));
const Register = lazy(() => import('./Register'));

const AuthWrapper: React.FC = (): JSX.Element => {
	const { t } = useTranslation(['auth']);
	// State
	const [showRegistrationForm, setShowRegistrationForm] = useState(false); // Mostra form registrazione/login
	const [title, body, icon, text] = showRegistrationForm
		? [t('auth:register'), <Register />, <ToggleOn />, t('auth:login')]
		: [t('auth:login'), <Login />, <ToggleOff />, t('auth:register')];

	const modalStyle: CSSProperties = {
		textAlign: 'left',
		color: 'white',
	};

	return (
		<Col md={{ span: '6', offset: '3' }} sm="12">
			<Card data-cy="auth-form" style={modalStyle} className="default-background">
				<Card.Header as="h2">{title}</Card.Header>
				<Card.Body>
					<Container>{body}</Container>
				</Card.Body>
				<Card.Footer>
					<Button
						id="swapButton"
						size="lg"
						variant="outline-warning"
						onClick={() => setShowRegistrationForm(!showRegistrationForm)}
					>
						{icon}
						<strong> {text}</strong>
					</Button>
				</Card.Footer>
			</Card>
		</Col>
	);
};

export default AuthWrapper;
