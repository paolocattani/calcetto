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
import TournamentSelection from './TournamentSelection';
import * as Todo from './DELETE/Todo';
import { Login } from './Login';
const applicationName = 'webapp'; //`calcetto C.S.M`;

// Mappatura route
const routes = [
  { path: '/', label: 'Home', exact: true, component: TournamentSelection, visible: true, index: 0 },
  // TODO: creare pagina per route not found
  { path: '*', label: 'Not Found', exact: false, component: Todo.NoMatch, visible: false, index: 100 }
];

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

  return (
    <div className="App">
      {/** Header */}
      <header className="App-header">
        <p>{applicationName}</p>
      </header>
      <br></br>
      <Switch>
        <Route path="/login" component={Login} />
        {/* Carica dinamicamente le route a partire dall'oggetto routes ( vedi sopra ) */
        routes.map(route => (
          <ProtectedRoute
            {...defaultProtectedRouteProps}
            key={route.index}
            path={route.path}
            exact={route.exact}
            component={route.component}
          />
        ))}
      </Switch>
    </div>
  );
};

export default App;
