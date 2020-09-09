import React, { Suspense, useEffect } from 'react';
// Components
import Header from '../Header/Header';
import { LoadingModal } from '../core/generic/Commons';
// Routing
import { Switch, useHistory } from 'react-router';
import routes from '../core/routing/Routes';
import { ProtectedRoute } from '../core/routing/ProtectedRoute';
import ErrorBoundary from '../core/errorBoundary';
// Style
import './App.css';
import { Container } from 'react-bootstrap';
// FontAwesome 5
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { SessionAction } from 'redux/actions';
// Toasts
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './toast.css';
import AppBadge from './badge';
import { SessionSelector } from 'redux/selectors';
// i18n
import '../../i18n/i18n';

library.add(fas, far);

const App: React.FC = (_) => {
  const dispatch = useDispatch();
  const currentHistory = useHistory();
  const isLoading = useSelector(SessionSelector.isLoading);

  // Check if user is already logged
  useEffect(() => {
    dispatch(SessionAction.checkAuthentication.request({ history: currentHistory }));
  }, [currentHistory, dispatch]);

  return (
    <div className="App">
      <ErrorBoundary>
        <Header />
        <Container fluid style={{ marginBottom: '20vh' }}>
          {/*<LogSessionContext /> */}
          {/*<RedirectionControl />*/}
          <ToastContainer autoClose={2000} />

          {isLoading ? (
            <LoadingModal show={true} message={'....Caricamento'} />
          ) : (
            <Suspense fallback={<LoadingModal show={true} message={'....Caricamento'} />}>
              <Switch>
                {routes.map((route) => (
                  <ProtectedRoute {...route} key={route.index} />
                ))}
              </Switch>
            </Suspense>
          )}
          <AppBadge />
        </Container>
      </ErrorBoundary>
    </div>
  );
};

export default App;
