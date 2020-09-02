import React from 'react';
import { ShallowWrapper, render, HTMLAttributes, mount } from 'enzyme';
import Login from '../../components/Auth/Login';
import { shallowToJson } from 'enzyme-to-json';
import configureStore from 'redux-mock-store';

import { initialState } from '../commons';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { Store, AnyAction } from 'redux';

const mockStore = configureStore([]);
describe('<Login />', () => {
  let store: Store<any, AnyAction>;
  let component: ShallowWrapper<{}, {}, React.Component<{}, {}, any>>;
  let usernameField: ShallowWrapper<HTMLAttributes, any, React.Component<{}, {}, any>>;
  let passwordField: ShallowWrapper<HTMLAttributes, any, React.Component<{}, {}, any>>;

  beforeEach(() => {
    store = mockStore(initialState);
    component = (mount(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    ) as unknown) as ShallowWrapper;
  });

  it('Should render with initial store state', () => {
    const staticComponent = (render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    ) as unknown) as ShallowWrapper;
    expect(shallowToJson(staticComponent)).toMatchSnapshot();
  });

  it('should render all fields', () => {
    usernameField = component.find('#username');
    expect(usernameField.length).toEqual(1);

    passwordField = component.find('#password');
    expect(passwordField.length).toEqual(1);
  });

  it('should trim inputs', () => {
    usernameField.simulate('change', { target: { value: 'withspaces@email.it     ' } });
    expect(usernameField.prop('value')).toEqual('withspaces@email.it');

    passwordField.simulate('change', { target: { value: 'strongpassword     ' } });
    expect(passwordField.prop('value')).toEqual('strongpassword');
  });
});
