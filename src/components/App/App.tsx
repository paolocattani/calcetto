import React, { Suspense, useEffect } from 'react';
// Components
import { Header } from '../Header/Header';
import { LoadingModal } from '../core/generic/Commons';
// Routing
import { Switch, useHistory } from 'react-router';
import routes from '../core/routing/Routes';
import { ProtectedRoute } from '../core/routing/ProtectedRoute';
// Style
import './App.css';
import { Container } from 'react-bootstrap';
// FontAwesome 5
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { useDispatch } from 'react-redux';
import { SessionAction } from 'actions';
// Toasts
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './toast.css';

library.add(fas, far);

const App: React.FC = (_) => {
  const dispatch = useDispatch();
  const currentHistory = useHistory();

  // Check if user is already logged
  useEffect(() => {
    dispatch(SessionAction.checkAuthentication.request({ history: currentHistory }));
  }, [currentHistory, dispatch]);

  return (
    <div className="App">
      <Header />
      <Container fluid style={{ marginBottom: '20vh' }}>
        {/*<LogSessionContext /> */}
        {/*<RedirectionControl />*/}
        <ToastContainer autoClose={2000} />

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
