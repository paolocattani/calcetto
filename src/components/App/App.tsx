import React, { Suspense, useEffect, useState } from 'react';
// Components
import { Header } from '../Header/Header';
import { LoadingModal /* LogSessionContext */ } from '../core/generic/Commons';
// Routing
import { Switch } from 'react-router';
import routes from '../core/routing/Routes';
import { ProtectedRoute } from '../core/routing/ProtectedRoute';
// Style
import './App.css';
import { Container, Alert } from 'react-bootstrap';
// FontAwesome 5
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { SessionAction } from 'actions';
import { SessionSelector } from '../../selectors/session.selector';

library.add(fas, far);

const App: React.FC = (_) => {
  const dispatch = useDispatch();
  const message = useSelector(SessionSelector.getMessage);
  const show = useSelector(SessionSelector.showMessage);

  // Check if user is already logged
  useEffect(() => {
    dispatch(SessionAction.checkAuthentication.request({}));
  }, [dispatch]);

  return (
    <div className="App">
      <Header />
      <Container fluid style={{ marginBottom: '20vh' }}>
        {/*<LogSessionContext /> */}
        {/*<RedirectionControl />*/}
        {
          /* Show user message */
          message ? (
            <Alert
              variant={message.type}
              key={'welcome-message'}
              show={show}
              onClose={() => dispatch(SessionAction.hideMessage({}))}
              dismissible
            >
              <Alert.Heading>{message.message}</Alert.Heading>
            </Alert>
          ) : null
        }
        <Suspense fallback={<LoadingModal show={true} message={'....Caricamento'} />}>
          <Switch>
            {routes.map((route) => (
              <ProtectedRoute {...route} key={route.index} />
            ))}
          </Switch>
        </Suspense>
      </Container>
    </div>
  );
};

export default App;
