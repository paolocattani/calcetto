import { AbstractPage, BE_VISIBLE } from './abstract.page';
import { imageSnapshotConfig } from '../support/common';

// https://glebbahmutov.com/blog/open-source-visual-testing-of-components/
export type LoginProps = { username: string; password: string };
export type RegistrationProps = {
	username: string;
	name: string;
	surname: string;
	email: string;
	confirmEmail: string;
	password: string;
	confirmPassword: string;
	phone: string;
	birthday: string;
};

export const AUTH_FORM = '[data-cy=auth-form]';
export const SWAP_BUTTON = '#swapButton';
export const LOGIN_BUTTON = '#loginButton';

export class LandingPage extends AbstractPage {
	visit() {
		return cy.visit('/');
	}

	// Methods
	logout() {
		return cy
			.get('[data-cy=header-dropdown]')
			.should(BE_VISIBLE)
			.click()
			.get('[data-cy=header-user-logout]')
			.should(BE_VISIBLE)
			.click();
	}

	login({ username, password }: LoginProps): void {
		// https://docs.cypress.io/api/commands/intercept.html
		cy.visit('/')
			.intercept('POST', '/api/v2/auth/login')
			.as('authentication')
			.get(SWAP_BUTTON)
			.should(BE_VISIBLE)
			.get(AUTH_FORM)
			.should(BE_VISIBLE)
			.toMatchImageSnapshot(imageSnapshotConfig('Login'));
		cy.get('#username')
			.should(BE_VISIBLE)
			.type(username)
			.get('#password')
			.should(BE_VISIBLE)
			.type(password)
			.get('#loginButton')
			.should(BE_VISIBLE)
			.click();

		cy.wait('@authentication').then((interception) => {
			const body = interception.request.body;
			expect(body).to.have.property('username', username);
			expect(body).to.have.property('password', password);
		});
	}

	register(user: RegistrationProps, isAdmin: boolean): void {
		cy.visit('/')
			.intercept('POST', '/api/v2/auth/register')
			.as('authentication')
			.get(SWAP_BUTTON)
			.should(BE_VISIBLE)
			.click()
			.get(AUTH_FORM)
			.should(BE_VISIBLE)
			.toMatchImageSnapshot(imageSnapshotConfig(isAdmin ? 'registration_Admin' : 'registration_User'));
		cy.get('#username')
			.should(BE_VISIBLE)
			.type(user.username)
			.get('#name')
			.should(BE_VISIBLE)
			.type(isAdmin ? `[A]${user.name}` : user.name)
			.get('#surname')
			.should(BE_VISIBLE)
			.type(user.surname)
			.get('#email')
			.should(BE_VISIBLE)
			.type(user.email)
			.get('#cemail')
			.should(BE_VISIBLE)
			.type(user.confirmEmail)
			.get('#password')
			.should(BE_VISIBLE)
			.type(user.password)
			.get('#cpassword')
			.should(BE_VISIBLE)
			.type(user.confirmPassword)
			//FIXME: cypress bug
			//cy.get('#birthday').should(BE_VISIBLE).type('05/01/1902');
			.get('#phone')
			.should(BE_VISIBLE)
			.type(user.phone)
			.get('#registerButton')
			.should(BE_VISIBLE)
			.click();

		// Loader should be visible
		super.getLoader().should(BE_VISIBLE);
		cy.wait('@authentication').then((interception) => {
			const body = interception.request.body;
			this.compareRegistrationProperty(body, user, isAdmin);
			expect(body).to.have.property('name', isAdmin ? `[A]${user.name}` : user.name);
			expect(body).to.have.property('confirmEmail', user.email);
			expect(body).to.have.property('password', user.password);
			expect(body).to.have.property('confirmPassword', user.password);
			// FIXME:
			expect(body).to.have.property('playerRole', 'Non sono un giocatore');
		});
	}

	// Compare common registration properties
	compareRegistrationProperty(body: any, user: RegistrationProps, isAdmin: boolean) {
		expect(body).to.have.property('username', user.username);
		expect(body).to.have.property('surname', user.surname);
		expect(body).to.have.property('email', user.email);
		expect(body).to.have.property('phone', user.phone);
		// FIXME: compare only dates, without time
		expect(body).to.have.property('birthday');
	}

	// Fields
	getHeaderUsername() {
		return cy.get('[data-cy=header-username]');
	}
	getUsername() {
		return cy.get('#username');
	}
	getName() {
		return cy.get('#name');
	}
	getSurname() {
		return cy.get('#surname');
	}
	getEmail() {
		return cy.get('#email');
	}
	getConfirmEmail() {
		return cy.get('#cemail');
	}
	getPassword() {
		return cy.get('#password');
	}
	getConfirmPassword() {
		return cy.get('#cpassword');
	}
	getPhone() {
		return cy.get('#phone');
	}

	// Button
	getSwapButton() {
		return cy.get(SWAP_BUTTON);
	}
	getLoginButton() {
		return cy.get(SWAP_BUTTON);
	}
	getRegistrationButton() {
		return cy.get('#registerButton');
	}
}
