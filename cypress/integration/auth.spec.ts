// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="cypress" />

describe('Authentication Test', () => {
  beforeEach(() => {
    // usually we recommend setting baseUrl in cypress.json
    // but for simplicity of this example we just use it here
    // https://on.cypress.io/visit
    cy.visit('/');
  });

  describe('Registration process', () => {
    beforeEach(() => {
      // usually we recommend setting baseUrl in cypress.json
      // but for simplicity of this example we just use it here
      // https://on.cypress.io/visit
      cy.visit('/');
      cy.get('#swapButton').click();
    });
    it('Shold register Admin', () => {
      cy.get('#username').type('Admin');
      cy.get('#name').type('[A]Admin');
      cy.get('#surname').type('Admin');
      cy.get('#email').type('admin@gmail.com');
      cy.get('#cemail').type('admin@gmail.com');
      cy.get('#password').type('Admin12345!');
      cy.get('#cpassword').type('Admin12345!');
      cy.get('#phone').type('3472545881');
      cy.get('#phone').first().focus();
      //FIXME: change focus
      //cy.get('#birthday').type('05/01/1902');
      cy.get('#registerButton').click();
      cy.location().should((loc) => {
        expect(loc.pathname).to.eq('/');
      });
    });

    it('Shold register User', () => {
      cy.get('#username').type('User');
      cy.get('#name').type('User');
      cy.get('#surname').type('User');
      cy.get('#email').type('user@gmail.com');
      cy.get('#cemail').type('user@gmail.com');
      cy.get('#password').type('User12345!');
      cy.get('#cpassword').type('User12345!');
      cy.get('#phone').type('3472545001');
      //FIXME: change focus
      //cy.get('#birthday').type('05/01/1903');
      cy.get('#registerButton').click();
      cy.location().should((loc) => {
        expect(loc.pathname).to.eq('/');
      });
    });
  });

  describe('Login process', () => {
    it('Shold login ad Admin', () => {
      cy.get('#username').type('Admin');
      cy.get('#password').type('Admin12345!');
      cy.get('#loginButton').click();
      cy.location().should((loc) => {
        expect(loc.pathname).to.eq('/');
      });
    });

    it('Shold login ad User', () => {
      cy.get('#username').type('User');
      cy.get('#password').type('User12345!');
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
