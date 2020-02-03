import React, { useState } from 'react';
import { Switch, Route } from 'react-router';
import { useSessionContext } from '../components/core/SessionContext';
import { ProtectedRoute, ProtectedRouteProps } from '../components/core/ProtectedRoute';
import './style/App.css';
import { Login } from './Login/Login';
// import { useHistory } from 'react-router-dom';
import routes from '../components/core/Routes';
import { FNavbar } from './Navbar/Navbar';
import { Container } from 'react-bootstrap';
import PlayerModal from './Player/modal';

const applicationName = 'calcetto C.S.M';

const App: React.FC = () => {
  const [sessionContext, updateSessionContext] = useSessionContext();
  const [showModal, setShowModal] = useState(false);

  const setRedirectPathOnAuthentication = (path: string) => {
    updateSessionContext({ ...sessionContext, redirectPathOnAuthentication: path });
  };

  const defaultProtectedRouteProps: ProtectedRouteProps = {
    isAuthenticated: !!sessionContext.isAuthenticated,
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
      {/*<Button onClick={() => setShowModal(true)}> apri modale</Button>*/}
      {showModal ? <PlayerModal show={showModal} onHide={() => setShowModal(false)} /> : null}
      <Container>
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
