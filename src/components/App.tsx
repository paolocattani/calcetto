import React, { Suspense } from 'react';
// Components
import { Header } from './Header/Header';
import { LoadingModal /* LogSessionContext */ } from './core/Commons';
// Routing
import { Switch, useHistory } from 'react-router';
import routes from '../components/core/Routes';
import { ProtectedRoute } from '../components/core/ProtectedRoute';
// Style
import './style/App.css';
import { Container } from 'react-bootstrap';
// FontAwesome 5
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

library.add(fas, far);

const App: React.FC = _ => {
  return (
    <div className="App">
      <Header />
      <Container fluid>
        {/*<LogSessionContext /> */}
        {/*<RedirectionControl />*/}
        <Suspense fallback={<LoadingModal show={true} message={'....Caricamento'} />}>
          <Switch>
            {routes.map(route => (
              <ProtectedRoute {...route} key={route.index} />
            ))}
          </Switch>
        </Suspense>
      </Container>
    </div>
  );
};

export default App;
