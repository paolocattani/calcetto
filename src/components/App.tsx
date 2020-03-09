import React from 'react';
import { Switch, Route } from 'react-router';
import { useSessionContext } from '../components/core/SessionContext';
import { ProtectedRoute, ProtectedRouteProps } from '../components/core/ProtectedRoute';
import './style/App.css';
import { Login } from './Login/Login';
// import { useHistory } from 'react-router-dom';
import routes from '../components/core/Routes';
import { FNavbar } from './Navbar/Navbar';
import { Container } from 'react-bootstrap';
import headerImage from './assets/header-background.jpeg';
const applicationName = 'Calcetto C.S.M';

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

  return (
    <div className="App">
      {/** Header */}
      <header className="app-header">
        <p>{applicationName}</p>
        <FNavbar />
      </header>

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
