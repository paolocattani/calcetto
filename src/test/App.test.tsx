import React from 'react';
import { shallow } from 'enzyme';
import Entry from 'components/App/Entry';
import { shallowToJson } from 'enzyme-to-json';

describe('Application ', () => {
  it('should render correctly', () => {
    const component = shallow(<Entry />);
    expect(shallowToJson(component)).toMatchSnapshot();
  });
});
