import React from 'react';
import Entry from 'components/App/Entry';
import { render } from '@testing-library/react';

// https://spin.atomicobject.com/2020/04/22/jest-test-express-react/
describe('<Entry />', () => {
  it('should render correctly and match snapshot', () => {
    const component = render(<Entry />);
    expect(component).toMatchSnapshot();
  });
});

// https://www.pluralsight.com/guides/how-to-test-react-components-in-typescript
// https://github.com/puppeteer/puppeteer
