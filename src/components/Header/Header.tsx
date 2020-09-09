import React, { CSSProperties } from 'react';
import backgroundImage from '../../assets/header.jpg';
import { Jumbotron, Navbar, Nav, Button, Dropdown, ButtonGroup } from 'react-bootstrap';
import routes from '../core/routing/Routes';
import { Link, useHistory, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SessionSelector } from 'redux/selectors/session.selector';
import { HomeIcon } from 'components/core/icons';
import { SessionAction } from 'redux/actions';
import i18n from 'i18n/i18n';

const applicationName = 'Calcetto C.S.M';

// Header applicazione, include navbar
const Header: React.FC = () => {
  const dispatch = useDispatch();
  const currentHistory = useHistory();
  const changeLanguage = (language: string) => i18n.changeLanguage(language);

  const { user, isAuthenticated } = useSelector(SessionSelector.getSession);

  const logout = () => dispatch(SessionAction.logout.request({ history: currentHistory }));

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

  return (
    <header>
      <Jumbotron style={jumboStyle}>
        <h1 style={{ margin: '5vh' }}>
          <strong style={titleStyle}>{applicationName}</strong>
        </h1>
        {isAuthenticated ? (
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand as={Link} to="/">
              <HomeIcon />
              <span> Home</span>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
                {routes.map((route) =>
                  route.visible ? (
                    route.private && !isAuthenticated ? null : (
                      <Nav.Link as={Link} key={route.index} to={route.path} className="text-white">
                        {route.label}
                      </Nav.Link>
                    )
                  ) : null
                )}
              </Nav>
              {user ? (
                <>
                  <Dropdown alignRight as={ButtonGroup}>
                    <Button style={{ opacity: 1 }} variant="outline-warning" size="lg" disabled>
                      <strong style={{ color: '#64bd9c', fontSize: 'larger' }}>{user.username}</strong>
                    </Button>
                    <Dropdown.Toggle split variant="outline-warning" id="dropdown-custom-2" />
                    <Dropdown.Menu className="default-background default-border-yellow">
                      <Dropdown.Item
                        className="default-color-white default-hover-green"
                        as="button"
                        // FIXME: variant="warning"
                        onClick={logout}
                        eventKey="1"
                      >
                        Log out
                      </Dropdown.Item>
                      <Dropdown.Divider style={{ borderTopColor: '#ffc107' }} />
                      <Dropdown.Item
                        className="default-color-white default-hover-green"
                        as={Link}
                        to={'/user'}
                        eventKey="2"
                      >
                        Gestione Utente
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

export default withRouter(Header);
