// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion

import {LandingPage, RegistrationProps} from "../pages/lading.page";

describe('Authentication Test', () => {
  beforeEach(function() {
    cy.fixture('auth.fixture','utf-8').as('authFixture');
    cy.log("Loaded fixture...");
  });

  describe('Registration process', function () {

		it('Should register Admin', function () {
			const admin = this.authFixture.users.admin as RegistrationProps;
			const landingPage = new LandingPage();
			// https://glebbahmutov.com/blog/keep-passwords-secret-in-e2e-tests/
			landingPage.registerWithUi(admin,true);
			landingPage.getHeaderUsername().should('be.visible').and('have.value',admin.username);
		});

    it('Should register User', function () {
			const user = this.authFixture.users.user as RegistrationProps;
			const landingPage = new LandingPage();
			landingPage.registerWithUi(user,false);
			landingPage.getHeaderUsername().should('be.visible').and('have.value',user.username);
    });
  });

  describe('Login process', function () {
    it('Should login as Admin', function () {
        const admin = this.authFixture.users.admin as RegistrationProps;
				const landingPage = new LandingPage();
				landingPage.loginWithUi(admin);
				landingPage.getHeaderUsername().should('be.visible').and('have.value',admin.username);
				landingPage.forceLogout();
    });

    it('Should login as User', function () {
        const user = this.authFixture.users.user as RegistrationProps;
				const landingPage = new LandingPage();
				landingPage.loginWithUi(user);
				landingPage.getHeaderUsername().should('be.visible').and('have.value',user.username);
				landingPage.forceLogout();
    });
  });

  // more examples
  //
  // https://github.com/cypress-io/cypress-example-todomvc
  // https://github.com/cypress-io/cypress-example-kitchensink
  // https://on.cypress.io/writing-your-first-test
});
