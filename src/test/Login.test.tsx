import React from 'react';
import { shallow } from 'enzyme';
import Login from '../components/Auth/Login';
import { shallowToJson } from 'enzyme-to-json';

test('<Login />', () => {
  const component = shallow(<Login />);
  expect(shallowToJson(component)).toMatchSnapshot();
});
