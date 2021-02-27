import React from 'react';
import Login from '../Login';
import { render, RenderResult, fireEvent, screen } from '../../../test/test-utils';
import userEvent from '@testing-library/user-event';
import loginResponse from './_mocks_/login_response.json';
import { HTTPStatusCode } from 'src/@common/models/HttpStatusCode';
import fetchMock from 'jest-fetch-mock';

describe('<Login />.render', () => {
	let component: RenderResult;
	beforeEach(async () => {
		component = render(<Login />);
	});

	it('should render correctly should match snapshot', () => {
		expect(component).toMatchSnapshot();
	});
	it('should contains all elements', async () => {
		await screen.findByRole('button', { name: /confirm/ });
		expect(screen.getByLabelText(/username/i)).not.toBeNull();
		expect(screen.getByLabelText(/password/i)).not.toBeNull();
		expect(screen.getByRole('button', { name: 'confirm' })).not.toBeNull();
	});
	it('input elements should have "required" attritbute', async () => {
		await screen.findByRole('button', { name: /confirm/i });
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
	const user = { username: 'michelle', password: 'smith' };

	beforeEach(async () => {
		render(<Login />);
		usernameField = screen.getByLabelText(/username/i);
		passwordField = screen.getByLabelText(/password/i);
		loginButton = await screen.findByRole('button', { name: /confirm/i });
		changeUsernameInput = (value: string) => fireEvent.change(usernameField, { target: { value } });
		changePasswordInput = (value: string) => fireEvent.change(passwordField, { target: { value } });
	});

	describe('when username and password is not provided', () => {
		it('should have empty fields and button disabled ', async () => {
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

		/* FIXME:
    describe('when the submit button is clicked', () => {
      beforeEach(() => {
        fetchMock.resetMocks();
      });
      it('should call onSubmit with the username and password', () => {
        userEvent.click(loginButton);
        fetchMock.once('http://localhost:5001/api/v2/auth/login', { status: HTTPStatusCode.OK });

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith('/api/v2/auth/login', {
          method: 'POST',
          body: JSON.stringify({ username: user.username, password: user.password }),
          headers: { 'Content-Type': 'application/json' },
        });
      });
    });
    */
	});
});
