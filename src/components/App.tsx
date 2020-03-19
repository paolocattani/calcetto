import React from 'react';
import { Switch } from 'react-router';
import { ProtectedRoute } from '../components/core/ProtectedRoute';
import './style/App.css';
import routes from '../components/core/Routes';
import { Header } from './Header/Header';
import { Container } from 'react-bootstrap';
import UserSelect from './Auth/select';
// FontAwesome 5
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

library.add(fas, far);

const App: React.FC = _ => (
  <div className="App">
    <Header />

    <Container fluid>
      {/*<UserSelect />*/}
      <Switch>
        {/*<Route path="/login" component={FLogin} />*/}
        {routes.map(route => (
          <ProtectedRoute {...route} key={route.index} />
        ))}
      </Switch>
    </Container>
  </div>
);

export default App;
