import React, { StrictMode } from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../../redux/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { LoadingModal } from 'components/core/generic/Commons';

const Application: React.FC = () => (
  <Provider store={store}>
    <PersistGate loading={<LoadingModal show={true} />} persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
const Entry: React.FC = () =>
  process.env.NODE_ENV === 'development' ? (
    <StrictMode>
      <Application />
    </StrictMode>
  ) : (
    <Application />
  );

export default Entry;
