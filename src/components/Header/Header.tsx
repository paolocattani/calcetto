import React, { CSSProperties } from 'react';
import { FNavbar } from './Navbar';
import { useAuth0 } from 'components/core/Auth0';
import backgroundImage from '../assets/header.jpg';
import { Jumbotron, Navbar, NavDropdown, Nav, Button } from 'react-bootstrap';
import routes from '../core/Routes';

const applicationName = 'Calcetto C.S.M';
export const Header: React.FC = _ => {
  const { loading, user, isAuthenticated, logout, loginWithRedirect } = useAuth0();

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
              {routes.map(route => {
                console.log(route);
                return route.visible ? (
                  route.private && !isAuthenticated ? null : (
                    <Nav.Link href={route.path}>{route.label}</Nav.Link>
                  )
                ) : null;
              })}
            </Nav>
            {isAuthenticated && user ? (
              <>
                <Navbar.Text style={nameStyle}>
                  <strong>{user.name}</strong>
                </Navbar.Text>
                <Button variant="outline-warning" onClick={() => logout({})}>
                  Log out
                </Button>
              </>
            ) : (
              <Button variant="outline-warning" onClick={() => loginWithRedirect({})}>
                Log in
              </Button>
            )}
          </Navbar.Collapse>
        </Navbar>
      </Jumbotron>
    </header>
  );
};
