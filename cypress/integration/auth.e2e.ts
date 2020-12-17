// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion

import { AUTH_FORM, LandingPage, LOGIN_BUTTON, RegistrationProps, SWAP_BUTTON } from '../pages/landing.page';
import { UserRole } from '../../src/@common/dto';
import { Tournament } from '../pages/tournament.page';
import { fixCypressSpec } from '../support';
import { AuthState } from '../../src/@common/models';
import {BE_DISABLED, BE_VISIBLE, HAVE_LENGTH} from '../pages/abstract.page';

const { users } = require('../fixtures/auth.fixture.json');
const user: RegistrationProps = users.user;
const admin: RegistrationProps = users.admin;

// https://www.cypress.io/blog/2018/11/14/testing-redux-store/
// Dispatch action   cy.window().its('store').invoke('dispatch', AuthAction.login.... )

describe('Authentication Test', () => {
	// Show when cookies change
	before(() => Cypress.Cookies.debug(true));
	beforeEach(() => fixCypressSpec('/cypress/integration/auth.2e2.ts'));

	function afterLogin(landingPage: LandingPage, registrationOptions: RegistrationProps, isAdmin: boolean) {
		// Header should show username
		landingPage.getHeaderUsername().should(BE_VISIBLE).and('contain', registrationOptions.username);

		// Test cookies
		cy.getCookies()
			.should(HAVE_LENGTH, 1)
			.then((cookies) => {
				const session_id = cookies.filter((c) => c.name === 'session_id')[0];
				expect(session_id).to.have.property('name', 'session_id');
				expect(session_id).to.have.property('domain', 'localhost');
				expect(session_id).to.have.property('httpOnly');
				expect(session_id).to.have.property('path');
				expect(session_id).to.have.property('secure', false);
			});

		// Test store
		landingPage.getStoreState('authState').then((authState: AuthState) => {
			// Authentication props
			expect(authState).to.have.property('isAdmin', isAdmin);
			expect(authState).to.have.property('isAuthenticated', true);
			expect(authState).to.have.property('isLoading', false);

			// User prop
			const userState = authState.user;
			landingPage.compareRegistrationProperty(userState, registrationOptions, isAdmin);
			expect(userState).to.have.property('name', registrationOptions.name);
			expect(userState).to.have.property('role', isAdmin ? UserRole.Admin : UserRole.User);
		});

		// Tournament form should be visibile after login
		const tournamentPage: Tournament = new Tournament();
		tournamentPage.getForm().should(BE_VISIBLE);
		// In this case there isn't any tournament so, for admin only, we show the form to create a new tournament
		if(isAdmin){
			tournamentPage.getSelectTournamentButton().should(BE_VISIBLE);
		} else{
			// User should not see button for new tournament
			tournamentPage.getNewTournamentButton().should('not.exist');
		}
	}

	describe('Registration process', function () {
		it('Should show errors on registration', () => {
			const landingPage = new LandingPage();
			landingPage.visit()
				.get(SWAP_BUTTON).should(BE_VISIBLE).click()
				.get(AUTH_FORM).should(BE_VISIBLE)
				.get('#registerButton').should(BE_VISIBLE).click();
			landingPage.getToastList().should(HAVE_LENGTH, 11);
			/* TODO: test list content
				.clock().then((clock) => {
					landingPage.getToastContainer().should(HAVE_LENGTH, 11);

				});
			 	*/
		});

		it('Should register Admin', () => {
			const landingPage = new LandingPage();
			landingPage.forceDeleteUser(admin.email, admin.username, admin.password);
			// https://glebbahmutov.com/blog/keep-passwords-secret-in-e2e-tests/
			landingPage.register(admin, true);
			afterLogin(landingPage, admin, true);
		});

		it('Should register User', () => {
			const landingPage = new LandingPage();
			landingPage.forceDeleteUser(user.email, user.username, user.password);
			landingPage.register(user, false);
			afterLogin(landingPage, user, false);
		});
	});

	describe('Login process', () => {
		it('Should show errors on login with missing data', () => {
			const landingPage = new LandingPage();
			landingPage.visit()
				.get(SWAP_BUTTON).should(BE_VISIBLE)
				.get(AUTH_FORM).should(BE_VISIBLE)
				.get(LOGIN_BUTTON).should(BE_VISIBLE).should(BE_DISABLED)
				// Test Force click
				.invoke('removeAttr', 'disabled')
				.click();
			landingPage.getToastList().should(HAVE_LENGTH, 2);
			/* TODO: test list content
			.clock().then((clock) => {
				landingPage.getToastContainer().should(HAVE_LENGTH, 11);

			});
			 */
		});
		it('Should show error with wrong credentials', () => {
			const landingPage = new LandingPage();
			cy.visit('/')
				.get(SWAP_BUTTON).should(BE_VISIBLE)
				.get(AUTH_FORM).should(BE_VISIBLE)
				.get('#username').should(BE_VISIBLE).type('wronguser')
				.get('#password').should(BE_VISIBLE).type(admin.password)
				.get(LOGIN_BUTTON).should(BE_VISIBLE).click();
			landingPage.getToastList().should(HAVE_LENGTH, 1);

			cy.visit('/')
				.get(SWAP_BUTTON).should(BE_VISIBLE)
				.get(AUTH_FORM).should(BE_VISIBLE)
				.get('#username').should(BE_VISIBLE).type(admin.username)
				.get('#password').should(BE_VISIBLE).type('wrongpassword')
				.get(LOGIN_BUTTON).should(BE_VISIBLE).click();
			landingPage.getToastList().should(HAVE_LENGTH, 1);
		});

		it('Should login as Admin', () => {
			const landingPage = new LandingPage();
			landingPage.login(admin);
			afterLogin(landingPage, admin, true);
			landingPage.forceLogout();
		});

		it('Should login as User', () => {
			const landingPage = new LandingPage();
			landingPage.login(user);
			afterLogin(landingPage, user, false);
			landingPage.forceLogout();
		});
	});

	describe('Logout process', () => {
		it('Should logout', () => {
			const landingPage = new LandingPage();
			landingPage.forceLogout();
			landingPage.login(user);
			landingPage.logout();
			cy.get(SWAP_BUTTON).should(BE_VISIBLE).get(AUTH_FORM).should(BE_VISIBLE);
		});
	});

	// more examples
	//
	// https://github.com/cypress-io/cypress-example-todomvc
	// https://github.com/cypress-io/cypress-example-kitchensink
	// https://on.cypress.io/writing-your-first-test
});
