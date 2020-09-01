import React from 'react';
import { shallow } from 'enzyme';
import Entry from 'components/App/Entry';
import { shallowToJson } from 'enzyme-to-json';

// https://spin.atomicobject.com/2020/04/22/jest-test-express-react/
describe('Application ', () => {
  it('should render correctly', () => {
    const component = shallow(<Entry />);
    expect(shallowToJson(component)).toMatchSnapshot();
  });
});
