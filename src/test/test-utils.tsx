// test-utils.js
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { render, RenderOptions } from '@testing-library/react';
import { RootState } from 'redux/models';
import { store as defaultStore, persistor } from '../redux/store';
import { LoadingModal } from 'components/core/generic/Commons';

interface CustomRenderOtions extends Omit<RenderOptions, 'queries'> {
  initialState?: RootState;
}

const customRender = (ui: React.ReactElement, { initialState, ...options }: CustomRenderOtions) =>
  render(ui, {
    wrapper: ({ children }) => (
      <Provider store={defaultStore}>
        <PersistGate loading={<LoadingModal show={true} message={'....Caricamento'} />} persistor={persistor}>
          <BrowserRouter>{children}</BrowserRouter>
        </PersistGate>
      </Provider>
    ),
    ...options,
  });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
