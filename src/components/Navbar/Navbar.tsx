// Style
import './Navbar.css';
// React
import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Button } from 'react-bootstrap';
// import { useSessionContext } from '../core/SessionContext';
import routes from '../core/Routes';
import { useAuth0 } from '../core/Auth0';
// import { useSessionContext } from '../core/SessionContext';

export const FNavbar: React.FC = _ => {
  // const [sessionContext, updateSessionContext] = useSessionContext();
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <Navbar bg="ligth" variant="light" className="navbar-container">
      {/*
          <Navbar.Brand href="#home">
        <img src={logo} alt="Calcetto C.S.M." />
      </Navbar.Brand>
      */}
      {/* sessionContext.isAuthenticated */ true ? (
        <ul className="navbar-list">
          {routes.map(route =>
            route.visible ? (
              route.private && !isAuthenticated ? null : (
                <li key={`li-${route.index}`} className="navbar-list-item">
                  <Link key={`link-${route.index}`} to={route.path}>
                    <Button>{route.label}</Button>
                  </Link>
                </li>
              )
            ) : null
          )}
          <li className="navbar-list-item">
            {!isAuthenticated && <Button onClick={() => loginWithRedirect({})}>Log in</Button>}

            {isAuthenticated && <Button onClick={() => logout()}>Log out</Button>}
          </li>
        </ul>
      ) : null}
    </Navbar>
  );
};
