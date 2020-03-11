import React, { CSSProperties } from 'react';
import { FNavbar } from './Navbar';
import { useAuth0 } from 'components/core/Auth0';
import backgroundImage from '../assets/header.jpg';
import { Jumbotron } from 'react-bootstrap';

const applicationName = 'Calcetto C.S.M';
export const Header: React.FC = _ => {
  const { loading, user } = useAuth0();

  const jumnboStyle: CSSProperties = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    padding: '60px 0px 10px 0px'
  };

  return (
    <header>
      <Jumbotron style={jumnboStyle}>
        <h1>
          <strong style={{ color: 'white' }}>{applicationName}</strong>
        </h1>

        {user ? (
          <>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <code>{JSON.stringify(user, null, 2)}</code>
          </>
        ) : null}
        <FNavbar />
      </Jumbotron>
    </header>
  );
};
