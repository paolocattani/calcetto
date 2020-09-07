import React from 'react';
import Login from '../../components/Auth/Login';
import { render, RenderResult, fireEvent, screen } from '../test-utils';
import userEvent from '@testing-library/user-event';
import loginResponse from '../_mocks_/Auth/login_response.json';

describe('<Login />.render', () => {
  let component: RenderResult;
  beforeEach(() => {
    component = render(<Login />);
  });

  it('should render correctly should match snapshot', () => {
    expect(component).toMatchSnapshot();
  });
  it('should contains all elements', () => {
    expect(screen.getByLabelText(/username/i)).not.toBe(null);
    expect(screen.getByLabelText(/password/i)).not.toBe(null);
    expect(screen.getByRole('button', { name: 'Conferma' })).not.toBe(null);
  });
  it('input elements should have "required" attritbute', () => {
    expect(screen.getByLabelText(/username/i)).toBeRequired();
    expect(screen.getByLabelText(/password/i)).toBeRequired();
  });
});

//https://kentcdodds.com/blog/avoid-nesting-when-youre-testing?fbclid=IwAR2snxztWxnzUQGzIG42DrmqedSrzmmdfYgBWva7_Vzb3bgj6QR8UazP5_4
// https://www.robinwieruch.de/react-testing-library
// https://kentcdodds.com/blog/common-mistakes-with-react-testing-library

// GREAT : https://jkettmann.com/beginners-guide-to-testing-react/
describe('<Login /> tests ', () => {
  let usernameField: HTMLElement;
  let passwordField: HTMLElement;
  let loginButton: HTMLElement;
  let changeUsernameInput: (value: string) => boolean;
  let changePasswordInput: (value: string) => boolean;
  let clickLogin: () => boolean;
  const user = { username: 'michelle', password: 'smith' };

  beforeEach(() => {
    render(<Login />);
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
      expect(usernameField.getAttribute('value')).toEqual(user.username);
      expect(passwordField.getAttribute('value')).toEqual(user.password);
      expect(loginButton).not.toBeDisabled();
    });

    it('should type value', () => {
      userEvent.clear(usernameField);
      userEvent.clear(passwordField);
      userEvent.type(usernameField, user.username);
      userEvent.type(passwordField, user.password);
      expect(usernameField.getAttribute('value')).toEqual(user.username);
      expect(passwordField.getAttribute('value')).toEqual(user.password);
    });

    describe('when the submit button is clicked', () => {
      beforeEach(() => {
        fetchMock.resetMocks();
      });
      it('should call onSubmit with the username and password', () => {
        userEvent.click(loginButton);
        fetchMock.once(JSON.stringify(loginResponse));

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith('/api/v1/auth/authenticate', {
          method: 'POST',
          body: JSON.stringify({ username: user.username, password: user.password }),
          headers: { 'Content-Type': 'application/json' },
        });
      });
    });
  });
});
