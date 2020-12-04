// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion


import {LandingPage, RegistrationProps} from "../pages/landing.page";
import { AuthAction } from '../../src/redux/actions/auth.action';
import {UserRole} from "../../src/@common/dto";
import {Tournament} from "../pages/tournament.page";
import { fixCypressSpec } from '../support'
import {AuthState} from "../../src/@common/models";
const specTitle = require("cypress-sonarqube-reporter/specTitle");
const { users } = require('../fixtures/auth.fixture.json')
const user:RegistrationProps = users.user;
const admin:RegistrationProps = users.admin;
const empty:RegistrationProps = users.empty;

// https://www.cypress.io/blog/2018/11/14/testing-redux-store/
// Dispatch action   cy.window().its('store').invoke('dispatch', AuthAction.login.... )

describe('Authentication Test', () => {
	before(() => {
		Cypress.Cookies.debug(true);
	});

	beforeEach(fixCypressSpec(__filename))
/*
	beforeEach(function() {
		//Cypress.Cookies.preserveOnce('session_id')
  });
*/
	function afterLogin (landingPage:LandingPage,user:RegistrationProps,isAdmin:boolean){
		// Header should show username
		landingPage.getHeaderUsername().should('be.visible').and('contain',user.username);

		// Test cookies
		cy.getCookies()
			// FIXME: .should('have.length', 1)
			.then((cookies) => {
				const session_id = cookies.filter(c => c.name==='session_id' )[0];
				expect(session_id).to.have.property('name', 'session_id');
				expect(session_id).to.have.property('domain','localhost');
				expect(session_id).to.have.property('httpOnly');
				expect(session_id).to.have.property('path');
				expect(session_id).to.have.property('secure',false);
			});

		// Test store
		landingPage.getStoreState('authState').then( (authState:AuthState) => {
				// Authentication props
				expect(authState).to.have.property('isAdmin', isAdmin);
				expect(authState).to.have.property('isAuthenticated', true);
				expect(authState).to.have.property('isLoading', false);

				// User prop
				const userState = authState.user;
				landingPage.compareRegistrationProperty(userState,user,isAdmin);
				expect(userState).to.have.property('name',user.name);
				expect(userState).to.have.property('role', isAdmin ? UserRole.Admin : UserRole.User);
		});

		// Tournament form should be visibile after login
		const tournamentPage:Tournament = new Tournament();
		tournamentPage.getForm().should('be.visible');
		// Admin should see button for new tournament
		const newTournamentButton = tournamentPage.getNewTournamentButton();
		newTournamentButton.should(isAdmin ? 'be.visible' : 'not.exist');

	}

  describe(specTitle('Registration process'), function () {
		it('Should show errors on registration', ()=> {
			const landingPage = new LandingPage();
			landingPage.visit()
				.get('#swapButton').should('be.visible').click()
				.get('[data-cy=auth-form]').should('be.visible')
				.get('#registerButton').should('be.visible').click();
				landingPage.getToastList().should('have.length', 11);
				/* TODO: test list content
				.clock().then((clock) => {
					landingPage.getToastContainer().should('have.length', 11);

				});
			 	*/
		});

		it('Should register Admin', ()=> {
			const landingPage = new LandingPage();
			landingPage.forceDeleteUser(admin.email,admin.username,admin.password);
			// https://glebbahmutov.com/blog/keep-passwords-secret-in-e2e-tests/
			landingPage.register(admin,true);
			afterLogin(landingPage,admin, true);
		});

    it('Should register User', ()=> {
			const landingPage = new LandingPage();
			landingPage.forceDeleteUser(user.email,user.username,user.password);
			landingPage.register(user,false);
			afterLogin(landingPage,user, false);
    });

  });

  describe(specTitle('Login process'), ()=> {

		it('Should show errors on login with missing data', ()=> {
			const landingPage = new LandingPage();
			landingPage.visit()
				.get('#swapButton').should('be.visible')
				.get('[data-cy=auth-form]').should('be.visible')
				.get('#loginButton').should('be.visible').should('be.disabled')
				.invoke('removeAttr', 'disabled')
				.click();
			landingPage.getToastList().should('have.length', 2);
			/* TODO: test list content
			.clock().then((clock) => {
				landingPage.getToastContainer().should('have.length', 11);

			});
			 */
		});
		it('Should show error with wrong credentials', ()=> {
			const landingPage = new LandingPage();
			cy.visit('/')
				.get('#swapButton').should('be.visible')
				.get('[data-cy=auth-form]').should('be.visible')
				.get('#username').should('be.visible').type('wronguser')
				.get('#password').should('be.visible').type(admin.password)
				.get('#loginButton').should('be.visible').click();
			landingPage.getToastList().should('have.length', 1);

			cy.visit('/')
				.get('#swapButton').should('be.visible')
				.get('[data-cy=auth-form]').should('be.visible')
				.get('#username').should('be.visible').type(admin.username)
				.get('#password').should('be.visible').type('wrongpassword')
				.get('#loginButton').should('be.visible').click();
			landingPage.getToastList().should('have.length', 1);

		});

		it('Should login as Admin', ()=> {
				const landingPage = new LandingPage();
				landingPage.login(admin);
				afterLogin(landingPage,admin, true);
				landingPage.forceLogout();
		});

		it('Should login as User', ()=> {
			const landingPage = new LandingPage();
			landingPage.login(user);
			afterLogin(landingPage,user, false);
			landingPage.forceLogout();
		});

	});

	describe(specTitle('Logout process'), ()=> {
		it('Should logout', ()=> {
			const landingPage = new LandingPage();
			landingPage.forceLogout();
			landingPage.login(user);
			landingPage.logout();
			cy.get('#swapButton').should('be.visible')
				.get('[data-cy=auth-form]').should('be.visible');
		});
	});

		// more examples
  //
  // https://github.com/cypress-io/cypress-example-todomvc
  // https://github.com/cypress-io/cypress-example-kitchensink
  // https://on.cypress.io/writing-your-first-test
});
