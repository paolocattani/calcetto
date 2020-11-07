// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="cypress" />

describe('Authentication Test', () => {
  beforeEach(() => {
    // usually we recommend setting baseUrl in cypress.json
    // but for simplicity of this example we just use it here
    // https://on.cypress.io/visit
    cy.visit('/');
    cy.fixture('auth.fixture').as('authFixture');
  });

  describe('Registration process', function () {
    beforeEach(() => {
      // usually we recommend setting baseUrl in cypress.json
      // but for simplicity of this example we just use it here
      // https://on.cypress.io/visit
      cy.visit('/');
      cy.get('#swapButton').click();
    });
    it('Shold register Admin', function () {
      const admin = this.authFixture.users.admin;
      cy.get('#username').type(admin.username);
      cy.get('#name').type('[A]' + admin.name);
      cy.get('#surname').type(admin.surname);
      cy.get('#email').type(admin.email);
      cy.get('#cemail').type(admin.cemail);
      cy.get('#password').type(admin.password);
      cy.get('#cpassword').type(admin.cpassword);
      cy.get('#phone').type(admin.phone);
      //FIXME: cypress bug
      //cy.get('#birthday').type('05/01/1902');
      cy.get('#registerButton').click();
      cy.location().should((loc) => {
        expect(loc.pathname).to.eq('/');
      });
    });

    it('Shold register User', function () {
      const user = this.authFixture.users.user;
      cy.get('#username').type(user.username);
      cy.get('#name').type(user.name);
      cy.get('#surname').type(user.surname);
      cy.get('#email').type(user.email);
      cy.get('#cemail').type(user.cemail);
      cy.get('#password').type(user.password);
      cy.get('#cpassword').type(user.cpassword);
      cy.get('#phone').type(user.phone);
      //FIXME:
      //cy.get('#birthday').type('05/01/1903');
      cy.get('#registerButton').click();
      cy.location().should((loc) => {
        expect(loc.pathname).to.eq('/');
      });
    });
  });

  describe('Login process', function () {
    it('Shold login ad Admin', function () {
      const admin = this.authFixture.users.admin;
      cy.get('#username').type(admin.username);
      cy.get('#password').type(admin.password);
      cy.get('#loginButton').click();
      cy.location().should((loc) => {
        expect(loc.pathname).to.eq('/');
      });
    });

    it('Shold login ad User', function () {
      const user = this.authFixture.users.user;
      cy.get('#username').type(user.name);
      cy.get('#password').type(user.password);
      cy.get('#loginButton').click();
      cy.location().should((loc) => {
        expect(loc.pathname).to.eq('/');
      });
    });
  });

  // more examples
  //
  // https://github.com/cypress-io/cypress-example-todomvc
  // https://github.com/cypress-io/cypress-example-kitchensink
  // https://on.cypress.io/writing-your-first-test
});
