import React from 'react';
import Tournament from './wrapper.component';
import { render, RenderResult, fireEvent, screen } from '../../test/test-utils';
import userEvent from '@testing-library/user-event';
import { performAdminLogin, performUserLogin } from 'src/test/commons';
// import loginResponse from './_mocks_/login_response.json';

describe('<Tournament />.render', () => {
	// Admin
	describe('<Tournament />.render when user is type Admin', () => {
		let component: RenderResult;
		beforeEach(() => {
			const initialState = performAdminLogin();
			component = render(<Tournament />, { initialState });
		});
		it('should render correctly should match snapshot', () => {
			expect(component).toMatchSnapshot('Admin_tournament.tsx.snap');
		});
		it('should contains all elements', async () => {
			await screen.findByRole('button', { name: /continue/ });
			expect(screen.getByLabelText(/select/i)).not.toBeNull();
			// expect(screen.getByLabelText(/select/i).getAttribute('value')).toEqual('hFarm2 - 2020/09/05 @ progress.new');
			expect(screen.getByRole('button', { name: 'continue' })).not.toBeNull();
			expect(screen.queryByRole('button', { name: 'new' })).not.toBeNull();
		});
	});

	// User
	describe('<Tournament />.render when user is type User', () => {
		let component: RenderResult;
		beforeEach(() => {
			const initialState = performUserLogin();
			component = render(<Tournament />, { initialState });
		});
		it('should render correctly should match snapshot', () => {
			expect(component).toMatchSnapshot('User_tournament.tsx.snap');
		});
		it('should contains all elements', async () => {
			await screen.findByRole('button', { name: /continue/ });
			expect(screen.getByLabelText(/select/i)).not.toBeNull();
			// expect(screen.getByLabelText(/select/i).getAttribute('value')).toEqual('hFarm2 - 2020/09/05 @ progress.new');
			expect(screen.getByRole('button', { name: 'continue' })).not.toBeNull();
			expect(screen.queryByRole('button', { name: 'new' })).toBeNull();
		});
	});
});
