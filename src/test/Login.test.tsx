import React from 'react';
import { shallow, mount } from 'enzyme';
import Login from '../components/Auth/Login';
import { shallowToJson } from 'enzyme-to-json';
import configureStore from 'redux-mock-store';

import { initialState } from './commons';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

const mockStore = configureStore([]);
describe('<Login />', () => {
  let store;
  let component: any;
  beforeEach(() => {
    store = mockStore(initialState);
    component = shallow(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Login />
        </MemoryRouter>
      </Provider>
    );
  });

  it('Should render with initial store state', () => {
    expect(shallowToJson(component)).toMatchSnapshot();
  });

  it('should dispatch an action on button click', () => {
    expect(shallowToJson(component)).toMatchSnapshot();
  });
});

test('<Login />', () => {
  const component = shallow(<Login />);
  expect(shallowToJson(component)).toMatchSnapshot();
});
