// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion

import {LandingPage, RegistrationProps} from "../pages/landing.page";

describe('Authentication Test', () => {
	before(() => {
		Cypress.Cookies.debug(true);
	});

	beforeEach(function() {
    cy.fixture('auth.fixture','utf-8').as('authFixture');
		//Cypress.Cookies.preserveOnce('session_id')
  });

  describe('Registration process', function () {

		it('Should register Admin', function () {
			const admin = this.authFixture.users.admin as RegistrationProps;
			const landingPage = new LandingPage();
			landingPage.forceDeleteUser(admin.email,admin.username,admin.password);
			// https://glebbahmutov.com/blog/keep-passwords-secret-in-e2e-tests/
			landingPage.register(admin,true);
			landingPage.getHeaderUsername().should('be.visible').and('contain',admin.username);
			cy.getCookies()
				.should('have.length', 1)
				.then((cookies) => {
					expect(cookies[0]).to.have.property('name', 'session_id')
					//expect(cookies[0]).to.have.property('value', '123ABC')
					//expect(cookies[0]).to.have.property('domain')
					expect(cookies[0]).to.have.property('httpOnly')
					expect(cookies[0]).to.have.property('path')
					expect(cookies[0]).to.have.property('secure')
				})
		});

    it('Should register User', function () {
			const user = this.authFixture.users.user as RegistrationProps;
			const landingPage = new LandingPage();
			landingPage.forceDeleteUser(user.email,user.username,user.password);
			landingPage.register(user,false);
			landingPage.getHeaderUsername().should('be.visible').and('contain',user.username);
    });
  });

  describe('Login process', function () {
    it('Should login as Admin', function () {
        const admin = this.authFixture.users.admin as RegistrationProps;
				const landingPage = new LandingPage();
				landingPage.login(admin);
				landingPage.getHeaderUsername().should('be.visible').and('contain',admin.username);
				landingPage.forceLogout();
    });

    it('Should login as User', function () {
        const user = this.authFixture.users.user as RegistrationProps;
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
