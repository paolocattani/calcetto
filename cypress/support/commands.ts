// Types definitions
declare global {
	namespace Cypress {
		type LoginProps = { username: string, password: string }
		type RegistrationProps = {
			username: string;
			name: string;
			surname: string;
			email: string;
			confirmEmail: string;
			password: string;
			confirmPassword: string;
			phone: string;
			birthday: string;
		};

		interface Chainable {
			loginWithUi: typeof loginWithUi
			registerWithUi: typeof registerWithUi
		}
	}
}

// Functions
export function loginWithUi({username, password}: Cypress.LoginProps) {
	return cy.visit('/')
		.get('#username').should('be.visible').type(username)
		.get('#password').should('be.visible').type(password)
		.get('#loginButton').click();
}

export function registerWithUi(
	{username, name, surname, email, confirmEmail, password, confirmPassword, phone, birthday}: Cypress.RegistrationProps,
	isAdmin: boolean
){
	return cy.visit('/')
		.get('#swapButton').click()
		.get('#username').should('be.visible').type(username)
		.get('#name').should('be.visible').type(isAdmin ? `[A]${name}` : name)
		.get('#surname').should('be.visible').type(surname)
		.get('#email').should('be.visible').type(email)
		.get('#cemail').should('be.visible').type(confirmEmail)
		.get('#password').should('be.visible').type(password)
		.get('#cpassword').should('be.visible').type(confirmPassword)
		//FIXME: cypress bug
		//cy.get('#birthday').should('be.visible').type('05/01/1902');
		.get('#phone').should('be.visible').type(phone)
		.get('#registerButton').click();
}


// Add to cypress
// https://docs.cypress.io/api/cypress-api/custom-commands.html#Best-Practices
Cypress.Commands.add('loginWithUi', loginWithUi);
Cypress.Commands.add('registerWithUi', registerWithUi);
