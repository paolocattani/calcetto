import {AuthenticationResponse, RootState} from '../../src/@common/models';
import { RegistrationProps } from './landing.page';
import { AuthAction } from '../../src/redux/actions';
import {UserDTO} from "../../src/@common/dto";
const { users } = require('../fixtures/auth.fixture.json');
const user: RegistrationProps = users.user;
const admin: RegistrationProps = users.admin;

export const BE_VISIBLE = 'be.visible';
export const BE_DISABLED = 'be.disabled';
export const HAVE_LENGTH = 'have.length';
export const headers = { headers: { 'Content-Type': 'application/json' } };

export abstract class AbstractPage {
	user?:UserDTO;

	abstract visit(username?: string, password?: string): Cypress.Chainable<Cypress.AUTWindow>;

	getUser(){
		return this.user;
	}

	getLoader() {
		return cy.get('[data-cy=loader]');
	}

	getToastList() {
		return cy.get('.Toastify__toast-container.Toastify__toast-container--top-right').children();
	}

	getStoreState(reducer: keyof RootState) {
		return cy.window().its('store').invoke('getState').its(reducer);
	}

	dispatchAction(action: any): void {
		cy.window().its('store').invoke('dispatch', action);
	}

	forceDeleteUser(email: string, username: string, password: string) {
		return cy.request({
			method: 'DELETE',
			url: 'http://localhost:5001/api/v2/auth/test/delete',
			failOnStatusCode: false,
			...headers,
			body: { email, username, password, secret: Cypress.env('secret') },
		});
	}

	forceLogout() {
		return cy.request({
			failOnStatusCode: false,
			url: 'http://localhost:5001/api/v2/auth/logout',
		});
	}

	// Login
	forceLogin(username: string, password: string) {
		cy.request({
			method: 'POST',
			url: 'http://localhost:5001/api/v2/auth/test/login',
			...headers,
			body: { username, password, secret: Cypress.env('secret') },
		}).then((resp) => {
			const response = resp.body as AuthenticationResponse;
			this.user = response.user;
			this.dispatchAction(AuthAction.login.success(response));
		});
	}

	forceRegisterUser() {
		this.forceDeleteUser(user.email, user.username, user.password);
		return this.forceRegistration(user);
	}

	forceRegisterAdmin() {
		this.forceDeleteUser(admin.email, admin.username, admin.password);
		this.forceRegistration({...admin,name:`[A]${admin.name}`});
	}

	forceRegistration(registrationOptions: RegistrationProps) {
		cy.request({
			method: 'POST',
			url: 'http://localhost:5001/api/v2/auth/test/register',
			...headers,
			body: { ...registrationOptions, secret: Cypress.env('secret') },
		}).then((resp) => {
			const response = resp.body as AuthenticationResponse;
			this.user = response.user;
			this.dispatchAction(AuthAction.registration.success(response));
		});
	}
}
