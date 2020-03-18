// Style
import './Navbar.css';
// React
import React, { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Button, Image, Dropdown } from 'react-bootstrap';
import routes from '../core/Routes';
import { useSessionContext, initialSession } from '../core/SessionContext';

const imageStyle: CSSProperties = {
  width: '3vmax',
  height: 'auto'
};
export const FNavbar: React.FC = _ => {
  const [sessionContext, updateSessionContext] = useSessionContext();
  const { isAuthenticated, name } = sessionContext;
  return (
    <Navbar bg="ligth" variant="light" className="navbar-container">
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
          {!isAuthenticated && <Button onClick={() => updateSessionContext(initialSession)}>Log in</Button>}
        </li>
        {isAuthenticated && name ? (
          <Dropdown>
            <Dropdown.Toggle id="dropdown-basic">
              <strong>{name.substring(1, 1).toUpperCase()}</strong>
              {/*<Image style={imageStyle} src={user.picture} />*/}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Button onClick={() => updateSessionContext(initialSession)}>Log out</Button>
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ) : null}
      </ul>
    </Navbar>
  );
};
