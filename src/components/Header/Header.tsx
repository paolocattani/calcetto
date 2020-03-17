import React, { CSSProperties, useState } from 'react';
import backgroundImage from '../assets/header.jpg';
import { Jumbotron, Navbar, Nav, Button } from 'react-bootstrap';
import routes from '../core/Routes';
import AuthWrapper from '../Auth/Wrapper';
import { useSessionContext } from '../core/SessionContext';

const applicationName = 'Calcetto C.S.M';
export const Header: React.FC = _ => {
  const [sessionContext] = useSessionContext();
  const [showModal, setShowModal] = useState(true);

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
                    <Nav.Link href={route.path}>{route.label}</Nav.Link>
                  )
                ) : null
              )}
            </Nav>
            {sessionContext.isAuthenticated && sessionContext.name ? (
              <>
                <Navbar.Text style={nameStyle}>
                  <strong>{sessionContext.name}</strong>
                </Navbar.Text>
                <Button variant="outline-warning">Log out</Button>
              </>
            ) : (
              <Button variant="outline-warning" onClick={() => setShowModal(true)}>
                Log in
              </Button>
            )}
          </Navbar.Collapse>
          <AuthWrapper show={showModal} onHide={() => setShowModal(false)} />
        </Navbar>
      </Jumbotron>
    </header>
  );
};
