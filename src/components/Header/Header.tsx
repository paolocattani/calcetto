import React, { CSSProperties, useState } from 'react';
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
    if (response.ok) updateSessionContext({ isAuthenticated: false });
    // TODO: gestire messaggi utente
  };

  const yellow = '##ffc107';
  const jumboStyle: CSSProperties = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    padding: '60px 0px 10px 0px',
    minHeight: '28vh'
  };

  const titleStyle: CSSProperties = {
    color: 'white'
  };

  const nameStyle: CSSProperties = {
    color: yellow,
    fontSize: '4vh',
    padding: '0vw 2vw'
  };

  return (
    <header>
      <Jumbotron style={jumboStyle}>
        <h1 style={{ margin: '5vh' }}>
          <strong style={titleStyle}>{applicationName}</strong>
        </h1>
        {sessionContext.isAuthenticated ? (
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
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
                    <strong style={{ color: '#64bd9c' }}>{sessionContext.name}</strong>
                  </Navbar.Text>
                  <>
                    <Button variant="outline-warning" onClick={logout}>
                      Log out
                    </Button>
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
