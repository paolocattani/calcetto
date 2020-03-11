import React from 'react';
import { Switch, Route } from 'react-router';
import { useSessionContext } from '../components/core/SessionContext';
import { ProtectedRoute, ProtectedRouteProps } from '../components/core/ProtectedRoute';
import './style/App.css';
import { Login } from './Login/Login';
// import { useHistory } from 'react-router-dom';
import routes from '../components/core/Routes';
import { Header } from './Header/Header';
import { Container } from 'react-bootstrap';
import { useAuth0 } from './core/Auth0';

const App: React.FC = _ => {
  const [sessionContext, updateSessionContext] = useSessionContext();

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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      {/** Header */}
      <Header />

      <br></br>
      <Container fluid>
        <Switch>
          <Route path="/login" component={Login} />
          {/* Carica dinamicamente le route a partire dall'oggetto routes ( vedi sopra ) */
          routes.map(route => (
            <ProtectedRoute {...route} {...defaultProtectedRouteProps} key={route.index} />
          ))}
        </Switch>
      </Container>
    </div>
  );
};

export default App;
