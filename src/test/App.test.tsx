import React from 'react';
import { shallow } from 'enzyme';
import Entry from 'components/App/Entry';
test('renders the component', () => {
  const component = shallow(<Entry />);
  expect(component).toMatchSnapshot();
});
