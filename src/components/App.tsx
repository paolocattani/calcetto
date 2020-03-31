import React, { Suspense } from 'react';
// Components
import { Header } from './Header/Header';
import { LoadingModal } from './core/Commons';
// Routing
import { Switch } from 'react-router';
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

const App: React.FC = _ => (
  <div className="App">
    <Header />
    <Container fluid>
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

export default App;
