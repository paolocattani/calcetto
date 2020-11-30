
// Types definitions
/*
declare global {
	namespace Cypress {
		type LoginProps = { username: string, password: string }

		interface Chainable {
			loginWithUi: typeof loginWithUi
		}
	}
}
*/
/*
// Functions
export function loginWithUi({username, password}: Cypress.LoginProps) {
	return cy.visit('/')
		.get('#username').should('be.visible').type(username)
		.get('#password').should('be.visible').type(password)
		.get('#loginButton').click();
}

// Add to cypress
// https://docs.cypress.io/api/cypress-api/custom-commands.html#Best-Practices
Cypress.Commands.add('loginWithUi', loginWithUi);
*/
