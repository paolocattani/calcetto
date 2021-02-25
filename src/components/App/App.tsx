import React, { Suspense, useEffect } from 'react';
// Components
import Header from '../Header/Header';
import { LoadingModal } from '../core/generic/Commons';
// Routing
import { Switch, useHistory } from 'react-router';
import routes from '../core/routing/Routes';
import { ProtectedRoute } from '../core/routing/ProtectedRoute';
import ErrorBoundary from '../core/errorBoundary';
// Style
import './App.css';
import { Container } from 'react-bootstrap';
import { useSelector } from '../core/types';
import { useDispatch } from 'react-redux';
import { AuthAction } from '../../redux/actions';
import { loadIcons } from '../core/icons';
// Toasts
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './toast.css';
import AppBadge from './badge';
import { AuthSelector } from '../../redux/selectors';
// i18n
import '../../i18n/i18n';
// Cookies
import CookieConsent from 'react-cookie-consent';
import { useTranslation } from 'react-i18next';

loadIcons();
const App: React.FC = () => {
	const dispatch = useDispatch();
	const currentHistory = useHistory();
	const { t } = useTranslation(['auth']);
	const isLoading = useSelector(AuthSelector.isLoading);

	// Check if user is already logged
	useEffect(() => {
		dispatch(AuthAction.checkAuthentication.request({ history: currentHistory }));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentHistory]);

	return (
		<div className="App">
			<ErrorBoundary>
				{/* Loading translations */}
				<Header />
				<Container fluid>
					{/*<RedirectionControl />*/}
					<ToastContainer autoClose={3000} data-cy="toast-container" />
					{isLoading ? (
						// Loading store
						<LoadingModal />
					) : (
						// Loading lazy components
						<Switch>
							{routes.map((route) => (
								<ProtectedRoute {...route} key={route.index} />
							))}
						</Switch>
					)}
					<AppBadge />
					<CookieConsent
						location="bottom"
						buttonText={t('auth:cookies.accept')}
						cookieName="accept_cookies"
						style={{ background: '#2B373B' }}
						buttonStyle={{ color: '#4e503b', fontSize: '13px' }}
						expires={150}
						overlay
					>
						{t('auth:cookies.info')}
					</CookieConsent>
				</Container>
			</ErrorBoundary>
		</div>
	);
};

export default App;
