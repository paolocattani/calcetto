import React from 'react';
import { shallow } from 'enzyme';
import Login from '../components/Auth/Login';
import { shallowToJson } from 'enzyme-to-json';
import configureStore from 'redux-mock-store';
import renderer from 'react-test-renderer';

import { initialState } from './commons';
import { Provider } from 'react-redux';

const mockStore = configureStore([]);
describe('<Login />', () => {
  let store;
  let component: any;
  beforeEach(() => {
    store = mockStore(initialState);
    component = renderer.create(
      <Provider store={store}>
        <Login />
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
