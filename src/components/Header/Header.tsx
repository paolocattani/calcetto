import React, { CSSProperties } from 'react';
import backgroundImage from '../assets/header.jpg';
import { Jumbotron, Navbar, Nav, Button } from 'react-bootstrap';
import routes from '../core/Routes';
import { useSessionContext } from '../core/SessionContext';
import { Link } from 'react-router-dom';

const applicationName = 'Calcetto C.S.M';
export const Header: React.FC = _ => {
  const [sessionContext, updateSessionContext] = useSessionContext();

  const logout = async () => {
    const response = await fetch('/api/v1/auth/logout');
    if (response.ok)
      updateSessionContext({
        ...sessionContext,
        name: '',
        surname: '',
        email: '',
        role: '',
        isAuthenticated: false
      });
  };

  const yellow = '##ffc107';
  const jumnboStyle: CSSProperties = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    padding: '60px 0px 10px 0px',
    minHeight: '28vh'
  };

  const nameStyle = { color: yellow, padding: '1vw' };

  return (
    <header>
      <Jumbotron style={jumnboStyle}>
        <h1>
          <strong style={{ color: 'white' }}>{applicationName}</strong>
        </h1>
        {sessionContext.isAuthenticated ? (
          <Navbar sticky="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand as={Link} to="/">
              Home
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
                {routes.map(route =>
                  route.visible ? (
                    route.private && !sessionContext.isAuthenticated ? null : (
                      <Nav.Link as={Link} key={route.index} to={route.path}>
                        {route.label}
                      </Nav.Link>
                    )
                  ) : null
                )}
              </Nav>
              {sessionContext.name ? (
                <>
                  <Navbar.Text style={nameStyle}>
                    <strong>{sessionContext.name}</strong>
                  </Navbar.Text>
                  <>
                    <Button variant="outline-warning" onClick={logout}>
                      Log out
                    </Button>
                    {/* FIXME:
                  <Button variant="outline-danger" onClick={() => setShowModalDelete(true)}>
                    Elimina Utente
                  </Button>
                  */}
                  </>
                </>
              ) : null}
            </Navbar.Collapse>
          </Navbar>
        ) : null}
      </Jumbotron>
    </header>
  );
};
