// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion

import {logout} from "../support/utils";

describe('Authentication Test', () => {
  beforeEach(function() {
    cy.fixture('auth.fixture','utf-8').as('authFixture');
  });

  describe('Registration process', function () {

    it('Should register Admin', function () {
      const admin = this.authFixture.users.admin;
        cy.registerWithUi(admin, true);
			// cy.url().should('match', /fuel-savings$/)

		});

    it('Should register User', function () {
        const user = this.authFixture.users.user;
        cy.registerWithUi(user, false);
    });
  });

  describe('Login process', async function () {
    it('Should login as Admin', async function () {
        const admin = this.authFixture.users.admin;
				cy.visit('/');
				await fetch('/api/v2/auth/logout');
        cy.loginWithUi(admin);
        await logout();
    });

    it('Should login as User', async function () {
        const user = this.authFixture.users.user;
				cy.visit('/');
				await fetch('/api/v2/auth/logout');
        cy.loginWithUi(user);
				await logout();
    });
  });

  // more examples
  //
  // https://github.com/cypress-io/cypress-example-todomvc
  // https://github.com/cypress-io/cypress-example-kitchensink
  // https://on.cypress.io/writing-your-first-test
});
