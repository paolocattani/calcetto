import React, { StrictMode } from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../../redux/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { LoadingModal } from 'components/core/generic/Commons';

const Entry: React.FC = () => (
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={<LoadingModal show={true} message={'....Caricamento'} />} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>
);

export default Entry;
