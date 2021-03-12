import React, { CSSProperties } from 'react';
import backgroundImage from '../../assets/header.jpg';
import { Jumbotron, Navbar, Nav, Button, Dropdown, ButtonGroup } from 'react-bootstrap';
import routes from '../core/routing/Routes';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from '../core/types';
import { useDispatch } from 'react-redux';
import { AuthSelector } from '../../redux/selectors/auth.selector';
import { HomeIcon, LanguageIcon, UserIcon, LogoutIcon } from '../core/icons';
import { AuthAction } from '../../redux/actions';
import i18n, { getOtherLang } from '../../i18n/i18n';
import { useTranslation } from 'react-i18next';
import { TournamentSelector } from 'src/redux/selectors';
import { EventAction } from 'src/redux/actions/event.action';

const applicationName = 'Calcetto C.S.M';

// App header with navbar
const Header: React.FC = () => {
	const dispatch = useDispatch();
	const currentHistory = useHistory();
	const { t } = useTranslation(['common']);

	const { user, isAuthenticated, isAdmin } = useSelector(AuthSelector.getSession);
	const tournament = useSelector(TournamentSelector.getTournament);

	const logout = () => {
		dispatch(AuthAction.logout.request({ history: currentHistory }));
	};

	// const yellow = '#ffc107';
	const jumboStyle: CSSProperties = {
		backgroundImage: `url(${backgroundImage})`,
		backgroundSize: 'cover',
		padding: '60px 0px 10px 0px',
		minHeight: '28vh',
	};

	const titleStyle: CSSProperties = {
		color: 'white',
	};

	const otherLang = getOtherLang();

	const goHome = () => {
		if (tournament) {
			dispatch(EventAction.leaveTournament.request({ tournament }));
		}
	};

	return (
		<header>
			<Jumbotron style={jumboStyle}>
				<h1 style={{ margin: '5vh' }}>
					<strong style={titleStyle}>{applicationName}</strong>
				</h1>
				{isAuthenticated ? (
					<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
						<Navbar.Brand as={Link} to="/" onClick={goHome}>
							<span>
								<HomeIcon /> {t('route.home')}
							</span>
						</Navbar.Brand>
						<Navbar.Toggle aria-controls="responsive-navbar-nav" />
						<Navbar.Collapse id="responsive-navbar-nav">
							<Nav className="mr-auto">
								{routes.map((route) =>
									!route.visible || (route.path === '/swagger' && !isAdmin) ? null : (
										<Nav.Link as={Link} key={route.index} to={route.path} className="text-white">
											<span>
												{route.icon ? <route.icon /> : null} {t(route.label)}
											</span>
										</Nav.Link>
									)
								)}
							</Nav>
							{user ? (
								<>
									<Dropdown alignRight as={ButtonGroup}>
										<Button style={{ opacity: 1 }} variant="outline-warning" size="lg" disabled>
											<strong style={{ color: '#64bd9c', fontSize: 'larger' }} data-cy="header-username">
												{user.username} <UserIcon />
											</strong>
										</Button>
										<Dropdown.Toggle split variant="outline-warning" id="dropdown-custom-2" data-cy="header-dropdown" />
										<Dropdown.Menu className="default-background default-border-yellow">
											<Dropdown.Item
												className="default-color-white default-hover-green"
												as={Link}
												to={'/user'}
												eventKey="1"
											>
												<span>{t('route.user')}</span>
											</Dropdown.Item>
											<Dropdown.Item
												className="default-color-white default-hover-green"
												onClick={() => i18n.changeLanguage(otherLang)}
												as="button"
												eventKey="2"
											>
												<span>
													<LanguageIcon /> {t(`common:lang.${otherLang}`)}
												</span>
											</Dropdown.Item>
											<Dropdown.Divider style={{ borderTopColor: '#ffc107' }} />
											<Dropdown.Item
												className="default-color-white default-hover-green"
												as="button"
												onClick={logout}
												eventKey="3"
												data-cy="header-user-logout"
											>
												<span>
													<LogoutIcon /> <strong>{t('logout')} </strong>
												</span>
											</Dropdown.Item>
										</Dropdown.Menu>
									</Dropdown>
								</>
							) : null}
						</Navbar.Collapse>
					</Navbar>
				) : null}
			</Jumbotron>
		</header>
	);
};

export default Header;
