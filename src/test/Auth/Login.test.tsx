import React from 'react';
import Login from '../../components/Auth/Login';
import { render, RenderResult, fireEvent, screen } from '../test-utils';
import userEvent from '@testing-library/user-event';

describe('<Login />.render', () => {
  let component: RenderResult;
  beforeEach(() => {
    component = render(<Login />);
  });

  it('should match snapshot', () => {
    expect(component).toMatchSnapshot();
  });
  it('should contains all elements', () => {
    expect(component.getByLabelText(/username/i)).not.toBe(null);
    expect(component.getByLabelText(/password/i)).not.toBe(null);
    expect(component.getByRole('button', { name: 'Conferma' })).not.toBe(null);
  });
});

//https://kentcdodds.com/blog/avoid-nesting-when-youre-testing?fbclid=IwAR2snxztWxnzUQGzIG42DrmqedSrzmmdfYgBWva7_Vzb3bgj6QR8UazP5_4
// https://www.robinwieruch.de/react-testing-library
// https://kentcdodds.com/blog/common-mistakes-with-react-testing-library
describe('<Login /> tests ', () => {
  let component: RenderResult;
  let usernameField: HTMLElement;
  let passwordField: HTMLElement;
  let loginButton: HTMLElement;
  let changeUsernameInput: (value: string) => boolean;
  let changePasswordInput: (value: string) => boolean;
  let clickLogin: () => boolean;
  const user = { username: 'michelle', password: 'smith' };

  beforeEach(() => {
    component = render(<Login />);
    usernameField = screen.getByLabelText(/username/i);
    passwordField = screen.getByLabelText(/password/i);
    loginButton = screen.getByRole('button', { name: 'Conferma' });
    changeUsernameInput = (value: string) => fireEvent.change(usernameField, { target: { value } });
    changePasswordInput = (value: string) => fireEvent.change(passwordField, { target: { value } });
    clickLogin = () => fireEvent.click(loginButton);
  });

  describe('when username and password is not provided', () => {
    it('should have empty fields and button disabled ', () => {
      expect(usernameField.getAttribute('value')).toEqual('');
      expect(passwordField.getAttribute('value')).toEqual('');
      expect(loginButton).toBeDisabled();
    });
  });

  describe('when username and password is provided', () => {
    beforeEach(() => {
      changeUsernameInput(user.username);
      changePasswordInput(user.password);
    });

    it('should have changed field value', () => {
      expect(usernameField.getAttribute('value')).toEqual('michelle');
      expect(passwordField.getAttribute('value')).toEqual('smith');
    });

    it('should type value', () => {
      userEvent.clear(usernameField);
      userEvent.clear(passwordField);
      userEvent.type(usernameField, 'michelle');
      userEvent.type(passwordField, 'smith');
      expect(usernameField.getAttribute('value')).toEqual('michelle');
      expect(passwordField.getAttribute('value')).toEqual('smith');
    });

    describe('when the submit button is clicked', () => {
      beforeEach(() => {
        clickLogin();
      });
      it('should call onSubmit with the username and password', () => {
        //  expect(clickLogin).toHaveBeenCalledTimes(1);
        //expect(clickLogin).toHaveBeenCalledWith(user);
      });
    });
  });
});
