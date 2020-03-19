import React, { CSSProperties, useState } from 'react';
import backgroundImage from '../assets/header.jpg';
import { Jumbotron, Navbar, Nav, Button, NavDropdown } from 'react-bootstrap';
import routes from '../core/Routes';
import AuthWrapper from '../Auth/Wrapper';
import DeleteModal from '../Auth/Delete/modal';
import { useSessionContext } from '../core/SessionContext';

const applicationName = 'Calcetto C.S.M';
export const Header: React.FC = _ => {
  const [sessionContext, updateSessionContext] = useSessionContext();
  const [showModalAuth, setShowModalAuth] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);

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
    padding: '60px 0px 10px 0px'
  };

  const nameStyle = { color: yellow, padding: '1vw' };

  return (
    <header>
      <Jumbotron style={jumnboStyle}>
        <h1>
          <strong style={{ color: 'white' }}>{applicationName}</strong>
        </h1>
        <Navbar sticky="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand href="/">Home</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              {routes.map(route =>
                route.visible ? (
                  route.private && !sessionContext.isAuthenticated ? null : (
                    <Nav.Link key={route.index} href={route.path}>
                      {route.label}
                    </Nav.Link>
                  )
                ) : null
              )}
            </Nav>
            {sessionContext.isAuthenticated && sessionContext.name ? (
              <>
                <Navbar.Text style={nameStyle}>
                  <strong>{sessionContext.name}</strong>
                </Navbar.Text>
                <>
                  <Button variant="outline-warning" onClick={logout}>
                    Log out
                  </Button>

                  <Button variant="outline-danger" onClick={() => setShowModalDelete(true)}>
                    Elimina Utente
                  </Button>
                </>
              </>
            ) : (
              <Button variant="outline-warning" onClick={() => setShowModalAuth(true)}>
                Log in
              </Button>
            )}
          </Navbar.Collapse>
          <AuthWrapper show={showModalAuth} onHide={() => setShowModalAuth(false)} />
          <DeleteModal show={showModalDelete} onHide={() => setShowModalDelete(false)} />
        </Navbar>
      </Jumbotron>
    </header>
  );
};
