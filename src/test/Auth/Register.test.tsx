import React from 'react';
import configureStore from 'redux-mock-store';

import { initialState } from '../commons';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import Register from 'components/Auth/Register';

const mockStore = configureStore([]);
describe('<Login />', () => {
  /* let store;
  let component;

  beforeEach(() => {
    store = mockStore(initialState);
    component = (render(
      <Provider store={store}>
        <MemoryRouter>
          <Register />
        </MemoryRouter>
      </Provider>
    ) as unknown) as ShallowWrapper<{}, {}, React.Component<{}, {}, any>>;
  });

  it('Should render with initial store state', () => {
    expect(shallowToJson(component)).toMatchSnapshot();
  });

  it('should render all fields', () => {
    [
      'username',
      'name',
      'surname',
      'email',
      'cemail',
      'password',
      'cpassword',
      'phone',
      'birthday',
      'playerRole',
    ].forEach((f) => {
      expect(component.find(`#${f}`).length).toEqual(1);
    });
  });
  */
});
