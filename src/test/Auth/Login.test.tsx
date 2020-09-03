import React from 'react';
import Login from '../../components/Auth/Login';
import { render } from '../test-utils';

describe('<Login />', () => {
  it('should render correctly and match snapshot', () => {
    const component = render(<Login />);
    expect(component).toMatchSnapshot();
  });

  /*
  it('should render all fields', () => {
    usernameField = component.find('#username');
    expect(usernameField.length).toEqual(1);

    passwordField = component.find('#password');
    expect(passwordField.length).toEqual(1);
  });

  it('should trim inputs', () => {
    usernameField.simulate('change', {
      currentTarget: {
        name: 'username',
        value: 'withspaces@email.it     ',
      },
      target: {
        name: 'username',
        value: 'withspaces@email.it     ',
      },
    });
    console.log('username : ', usernameField);
    expect(usernameField.prop('value')).toEqual('withspaces@email.it');

    passwordField.simulate('change', { target: { name: 'password', value: 'strongpassword     ' } });
    expect(passwordField.prop('value')).toEqual('strongpassword');
  });
  */
});
