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
import { useDispatch, useSelector } from 'react-redux';
import { AuthAction } from '../../redux/actions';
import { loadIcons } from '../core/icons';
// Toasts
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './toast.css';
import AppBadge from './badge';
import { AuthSelector } from '../../redux/selectors';
// i18n
import '../../i18n/i18n';

loadIcons();
const App: React.FC = (_) => {
  const dispatch = useDispatch();
  const currentHistory = useHistory();
  const isLoading = useSelector(AuthSelector.isLoading);

  // Check if user is already logged
  useEffect(() => {
    dispatch(AuthAction.checkAuthentication.request({ history: currentHistory }));
  }, [currentHistory, dispatch]);

  return (
    <div className="App">
      <ErrorBoundary>
        {/* Loading translations */}
        <Suspense fallback={<LoadingModal />}>
          <Header />
        </Suspense>
        <Container fluid style={{ marginBottom: '20vh' }}>
          {/*<RedirectionControl />*/}
          <ToastContainer autoClose={3000} data-cy="toast-container"/>
          {isLoading ? (
            // Loading store
            <LoadingModal />
          ) : (
            // Loading lazy components
            <Suspense fallback={<LoadingModal />}>
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
