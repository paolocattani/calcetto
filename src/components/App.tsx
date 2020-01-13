// https://www.carlrippon.com/building-super-simple-react-form-component-typescript-basics/
// https://medium.com/@jrwebdev/react-hooks-in-typescript-88fce7001d0d

// https://github.com/palantir/blueprint/issues/3372

/**
 *
 * https://stackoverflow.com/questions/47747754/how-to-rewrite-the-protected-router-using-typescript-and-react-router-4-and-5
 * https://stackoverflow.com/questions/59422159/redirecting-a-user-to-the-page-they-requested-after-successful-authentication-wi/59423442#59423442
 *
 *
 */
import React from 'react';
import { Switch, Route } from 'react-router';
import { useSessionContext } from '../components/core/SessionContext';
import { ProtectedRoute, ProtectedRouteProps } from '../components/core/PrivateRoute';
import './style/App.css';
import { Login } from './Login';
// import { useHistory } from 'react-router-dom';
import routes from '../components/core/Routes';
import { Link } from 'react-router-dom';

const applicationName = 'webapp'; //`calcetto C.S.M`;

const App: React.FC = () => {
  const [sessionContext, updateSessionContext] = useSessionContext();

  const setRedirectPathOnAuthentication = (path: string) => {
    updateSessionContext({ ...sessionContext, redirectPathOnAuthentication: path });
  };

  const defaultProtectedRouteProps: ProtectedRouteProps = {
    isAuthenticated: !!sessionContext.isAuthenticated,
    authenticationPath: '/login',
    redirectPathOnAuthentication: sessionContext.redirectPathOnAuthentication || '',
    setRedirectPathOnAuthentication
  };

  // let currentHistory = useHistory();
  // eslint-disable-next-line react/destructuring-assignment
  return (
    <div className="App">
      {/** Header */}
      <header className="App-header">
        <p>{applicationName}</p>
        {/* eslint-disable-next-line react/destructuring-assignment */}

        {routes.map(route =>
          route.visible ? (
            <li key={`li-${route.index}`}>
              <Link key={`link-${route.index}`} to={route.path}>
                {route.label}
              </Link>
            </li>
          ) : null
        )}
      </header>

      <br></br>
      <Switch>
        <Route path="/login" component={Login} />
        {/* Carica dinamicamente le route a partire dall'oggetto routes ( vedi sopra ) */
        routes.map(route => (
          <ProtectedRoute {...route} {...defaultProtectedRouteProps} key={route.index} />
        ))}
      </Switch>
    </div>
  );
};

export default App;
