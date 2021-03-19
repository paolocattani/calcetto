// test-utils.js
import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { render, RenderOptions, RenderResult } from '@testing-library/react';
import { RootState } from '../@common/models/';
import { storeWithState as defaultStore, persistor } from '../redux/store';
import { LoadingModal } from '../components/core/generic/Commons';
// i18n
import '../i18n/i18n';
import { loadIcons } from '../components/core/icons';

interface CustomRenderOptions extends Omit<RenderOptions, 'queries'> {
	initialState?: RootState;
}

loadIcons();
const customRender = (ui: React.ReactElement, options?: CustomRenderOptions): RenderResult =>
	render(ui, {
		wrapper: ({ children }) => (
			<Provider store={defaultStore(options?.initialState)}>
				<PersistGate loading={<LoadingModal show={true} />} persistor={persistor}>
					<MemoryRouter>
						<Suspense fallback={<LoadingModal />}>{children}</Suspense>
					</MemoryRouter>
				</PersistGate>
			</Provider>
		),
		...options,
	});

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
