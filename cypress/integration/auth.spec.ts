// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion


import {LandingPage, RegistrationProps} from "../pages/landing.page";
import { AuthAction } from '../../src/redux/actions/auth.action';
import {UserRole} from "../../src/@common/dto";
import {Tournament} from "../pages/tournament.page";
import { fixCypressSpec } from '../support'
import {AuthState} from "../../src/@common/models";

const { users } = require('../fixtures/auth.fixture.json')
const user:RegistrationProps = users.user;
const admin:RegistrationProps = users.admin;

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
		// Loader should be visible
		landingPage.getLoader().should('be.visible');

		// Header should show username
		landingPage.getHeaderUsername().should('be.visible').and('contain',user.username);

		// Test cookies
		cy.log("cookies : ",		cy.getCookies());
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
				cy.log("authState : ", authState )
				// Authentication props
				expect(authState).to.have.property('isAdmin', isAdmin);
				expect(authState).to.have.property('isAuthenticated', true);
				expect(authState).to.have.property('isLoading', false);

				// User prop
				const userState = authState.user;
				expect(userState).to.have.property('username',user.username);
				expect(userState).to.have.property('name',user.name);
				expect(userState).to.have.property('surname',user.surname);
				expect(userState).to.have.property('email',user.email);
				expect(userState).to.have.property('phone',user.phone);
				expect(userState).to.have.property('role', isAdmin ? UserRole.Admin : UserRole.User);
				// FIXME: compare only dates, without time
				expect(userState).to.have.property('birthday');
		});

		// Tournament form should be visibile after login
		const tournamentPage:Tournament = new Tournament();
		tournamentPage.getForm().should('be.visible');

	}

  describe('Registration process', function () {

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

  describe('Login process', ()=> {
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

  // more examples
  //
  // https://github.com/cypress-io/cypress-example-todomvc
  // https://github.com/cypress-io/cypress-example-kitchensink
  // https://on.cypress.io/writing-your-first-test
});
