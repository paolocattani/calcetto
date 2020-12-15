import { RootState } from '../../src/@common/models';
import { RegistrationProps } from './landing.page';
import { AuthAction } from '../../src/redux/actions';
const { users } = require('../fixtures/auth.fixture.json');
const user: RegistrationProps = users.user;
const admin: RegistrationProps = users.admin;

export const BE_VISIBLE = 'be.visible';
export const HAVE_LENGTH = 'have.length';
export const headers = { headers: { 'Content-Type': 'application/json' } };

export abstract class AbstractPage {
	abstract visit(username?: string, password?: string): Cypress.Chainable<Cypress.AUTWindow>;

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

	// Login
	forceLogin(username: string, password: string) {
		cy.request({
			method: 'POST',
			url: 'http://localhost:5001/api/v2/auth/test/login',
			...headers,
			body: { username, password, secret: Cypress.env('secret') },
		}).then((resp) => {
			this.dispatchAction(AuthAction.login.success(resp.body));
		});
	}

	forceRegisterUser() {
		this.forceDeleteUser(user.email, user.username, user.password);
		return this.forceRegistration(user);
	}

	forceRegisterAdmin() {
		this.forceDeleteUser(admin.email, admin.username, admin.password);
		return this.forceRegistration(admin);
	}

	forceRegistration(registrationOptions: RegistrationProps) {
		cy.request({
			method: 'POST',
			url: 'http://localhost:5001/api/v2/auth/test/register',
			...headers,
			body: { ...registrationOptions, secret: Cypress.env('secret') },
		}).then((resp) => {
			this.dispatchAction(AuthAction.registration.success(resp.body));
		});
	}
}
