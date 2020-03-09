// Style
import './Navbar.css';
// React
import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';
// import { useSessionContext } from '../core/SessionContext';
import routes from '../core/Routes';
// import { useSessionContext } from '../core/SessionContext';

export const FNavbar: React.FC = _ => {
  // const [sessionContext, updateSessionContext] = useSessionContext();

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
              <li key={`li-${route.index}`} className="navbar-list-item">
                <Link key={`link-${route.index}`} to={route.path}>
                  {route.label}
                </Link>
              </li>
            ) : null
          )}
        </ul>
      ) : null}
    </Navbar>
  );
};
