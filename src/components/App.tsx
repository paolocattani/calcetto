import React, { useState } from 'react';
import { Switch, Route } from 'react-router';
import { useSessionContext } from '../components/core/SessionContext';
import { ProtectedRoute, ProtectedRouteProps } from '../components/core/ProtectedRoute';
import './style/App.css';
import TLogin from './Auth/Register';
// import { useHistory } from 'react-router-dom';
import routes from '../components/core/Routes';
import { Header } from './Header/Header';
import { Container, Button } from 'react-bootstrap';
import { useAuth0 } from './core/Auth0';
import GenericModal from './core/GenericModal';

const App: React.FC = _ => {
  const [sessionContext, updateSessionContext] = useSessionContext();
  const [showModal, setShowModal] = useState(true);

  const setRedirectPathOnAuthentication = (path: string) => {
    updateSessionContext({ ...sessionContext, redirectPathOnAuthentication: path });
  };

  const defaultProtectedRouteProps: ProtectedRouteProps = {
    isAuthenticated: process.env.NODE_ENV === 'development' /*!!sessionContext.isAuthenticated*/,
    authenticationPath: '/login',
    redirectPathOnAuthentication: sessionContext.redirectPathOnAuthentication || '',
    setRedirectPathOnAuthentication
  };

  const { loading, user } = useAuth0();

  /* FIXME:
  if (loading) {
    return <div>Loading...</div>;
  }

  */
  return (
    <div className="App">
      {/** Header */}
      <Header />

      {user ? (
        <>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          <code>{JSON.stringify(user, null, 2)}</code>
        </>
      ) : null}

      <Container fluid>
        <Button onClick={() => setShowModal(true)}>Login</Button>
        <GenericModal
          title={'Login'}
          component={<TLogin />}
          show={showModal}
          size={'xl'}
          onHide={() => setShowModal(false)}
        />
        <Switch>
          {/*<Route path="/login" component={FLogin} />*/}
          {routes.map(route => (
            <ProtectedRoute {...route} {...defaultProtectedRouteProps} key={route.index} />
          ))}
        </Switch>
      </Container>
    </div>
  );
};

export default App;
