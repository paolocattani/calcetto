// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion


import {LandingPage, RegistrationProps} from "../pages/landing.page";

const {users:{admin,user}} = require('../fixtures/auth.fixture.json')

describe('Authentication Test', () => {
	before(() => {
		Cypress.Cookies.debug(true);
	});

	beforeEach(function() {
		//Cypress.Cookies.preserveOnce('session_id')
  });

  describe('Registration process', function () {

		it('Should register Admin', ()=> {
			const landingPage = new LandingPage();
			landingPage.forceDeleteUser(admin.email,admin.username,admin.password);
			// https://glebbahmutov.com/blog/keep-passwords-secret-in-e2e-tests/
			landingPage.register(admin,true);
			landingPage.getHeaderUsername().should('be.visible').and('contain',admin.username);
			cy.getCookies()
				.should('have.length', 1)
				.then((cookies) => {
					expect(cookies[0]).to.have.property('name', 'session_id');
					expect(cookies[0]).to.have.property('domain','localhost');
					expect(cookies[0]).to.have.property('httpOnly');
					expect(cookies[0]).to.have.property('path');
					expect(cookies[0]).to.have.property('secure',false);
				})
		});

    it('Should register User', ()=> {
			const landingPage = new LandingPage();
			landingPage.forceDeleteUser(user.email,user.username,user.password);
			landingPage.register(user,false);
			landingPage.getHeaderUsername().should('be.visible').and('contain',user.username);
    });
  });

  describe('Login process', ()=> {
    it('Should login as Admin', ()=> {
				const landingPage = new LandingPage();
				landingPage.login(admin);
				landingPage.getHeaderUsername().should('be.visible').and('contain',admin.username);
				landingPage.forceLogout();
    });

    it('Should login as User', ()=> {
				const landingPage = new LandingPage();
				landingPage.login(user);
				landingPage.getHeaderUsername().should('be.visible').and('contain',user.username);
				landingPage.forceLogout();
    });
  });

  // more examples
  //
  // https://github.com/cypress-io/cypress-example-todomvc
  // https://github.com/cypress-io/cypress-example-kitchensink
  // https://on.cypress.io/writing-your-first-test
});
