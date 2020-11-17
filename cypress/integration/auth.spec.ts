// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion

describe('Authentication Test', () => {
  beforeEach(function() {
    cy.fixture('auth.fixture','utf-8').as('authFixture');
  });

  describe('Registration process', function () {

    it('Should register Admin', function () {
      const admin = this.authFixture.users.admin;
        cy.registerWithUi(admin, true);
    });

    it('Should register User', function () {
        const user = this.authFixture.users.user;
        cy.registerWithUi(user, false);
    });
  });

  describe('Login process', function () {
    it('Should login as Admin', function () {
        const admin = this.authFixture.users.admin;
        cy.loginWithUi(admin);
    });

    it('Should login as User', function () {
        const user = this.authFixture.users.user;
        cy.loginWithUi(user);
    });
  });

  // more examples
  //
  // https://github.com/cypress-io/cypress-example-todomvc
  // https://github.com/cypress-io/cypress-example-kitchensink
  // https://on.cypress.io/writing-your-first-test
});
