// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion


import {LandingPage, RegistrationProps} from "../pages/landing.page";
import { AuthAction } from '../../src/redux/actions/auth.action';

const {users:{admin,user}} = require('../fixtures/auth.fixture.json')

describe('Authentication Test', () => {
	before(() => {
		Cypress.Cookies.debug(true);
	});

	beforeEach(function() {
		//Cypress.Cookies.preserveOnce('session_id')
  });

	function afterLogin (landingPage:LandingPage,user:{username:string}){
		landingPage.getHeaderUsername().should('be.visible').and('contain',user.username);
		cy.getCookies()
			.should('have.length', 1)
			.then((cookies) => {
				const session_id = cookies[0];
				expect(session_id).to.have.property('name', 'session_id');
				expect(session_id).to.have.property('domain','localhost');
				expect(session_id).to.have.property('httpOnly');
				expect(session_id).to.have.property('path');
				expect(session_id).to.have.property('secure',false);
			});

		// https://www.cypress.io/blog/2018/11/14/testing-redux-store/
		// Dispatch action   cy.window().its('store').invoke('dispatch', AuthAction.login.... )
		cy.window().its('store').invoke('getState').toMatchSnapshot();


	}

  describe('Registration process', function () {

		it('Should register Admin', ()=> {
			const landingPage = new LandingPage();
			landingPage.forceDeleteUser(admin.email,admin.username,admin.password);
			// https://glebbahmutov.com/blog/keep-passwords-secret-in-e2e-tests/
			landingPage.register(admin,true);
			afterLogin(landingPage,admin);
		});

    it('Should register User', ()=> {
			const landingPage = new LandingPage();
			landingPage.forceDeleteUser(user.email,user.username,user.password);
			landingPage.register(user,false);
			afterLogin(landingPage,user);
    });
  });

  describe('Login process', ()=> {
    it('Should login as Admin', ()=> {
				const landingPage = new LandingPage();
				landingPage.login(admin);
				afterLogin(landingPage,admin);
				landingPage.forceLogout();
		});

    it('Should login as User', ()=> {
				const landingPage = new LandingPage();
				landingPage.login(user);
				afterLogin(landingPage,user);
				landingPage.forceLogout();
    });
  });

  // more examples
  //
  // https://github.com/cypress-io/cypress-example-todomvc
  // https://github.com/cypress-io/cypress-example-kitchensink
  // https://on.cypress.io/writing-your-first-test
});
