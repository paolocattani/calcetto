import {AbstractPage} from "./abstract.page";
import {imageSnapshotConfig} from "../support/common";

// https://glebbahmutov.com/blog/open-source-visual-testing-of-components/
export type LoginProps = { username: string, password: string }
export type RegistrationProps = {
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

export class LandingPage extends AbstractPage{

	visit(){
		return cy.visit('/');
	}

	// Methods
	forceLogout(){
		return cy.request({
			failOnStatusCode: false,
			url:'http://localhost:5001/api/v2/auth/logout'
		});
	}

	forceDeleteUser(email:string,username:string,password:string) {
		return cy.request({
			method: 'DELETE',
			url: 'http://localhost:5001/api/v2/auth/test/delete',
			failOnStatusCode: false,
			headers: {'Content-Type': 'application/json'},
			body: {email, username, password, secret: Cypress.env('secret')}
		});
	}

	logout(){
		return cy
			.get('[data-cy=header-dropdown]').should('be.visible').click()
			.get('[data-cy=header-user-logout]').should('be.visible').click();

	}

	login({username, password}: LoginProps):void {
		// https://docs.cypress.io/api/commands/intercept.html
		cy.visit('/')
			.intercept("POST", "/api/v2/auth/login").as("authentication")
			.get('#swapButton').should('be.visible')
			.get('[data-cy=auth-form]').should('be.visible')
			.toMatchImageSnapshot( imageSnapshotConfig('Login'));
		cy.get('#username').should('be.visible').type(username)
			.get('#password').should('be.visible').type(password)
			.get('#loginButton').should('be.visible').click();

		cy.wait('@authentication').then((interception) => {
			const body = interception.request.body;
			expect(body).to.have.property('username',username);
			expect(body).to.have.property('password', password);
		});
	}

	register(user:RegistrationProps,isAdmin: boolean):void {
		cy.visit('/')
			.intercept("POST", "/api/v2/auth/register").as("authentication")
			.get('#swapButton').should('be.visible').click()
			.get('[data-cy=auth-form]').should('be.visible')
			.toMatchImageSnapshot( imageSnapshotConfig(isAdmin ? 'registration_Admin':'registration_User'));
		cy
			.get('#username').should('be.visible').type(user.username)
			.get('#name').should('be.visible').type(isAdmin ? `[A]${user.name}` : user.name)
			.get('#surname').should('be.visible').type(user.surname)
			.get('#email').should('be.visible').type(user.email)
			.get('#cemail').should('be.visible').type(user.confirmEmail)
			.get('#password').should('be.visible').type(user.password)
			.get('#cpassword').should('be.visible').type(user.confirmPassword)
			//FIXME: cypress bug
			//cy.get('#birthday').should('be.visible').type('05/01/1902');
			.get('#phone').should('be.visible').type(user.phone)
			.get('#registerButton').should('be.visible').click();

			// Loader should be visible
			super.getLoader().should('be.visible');
			cy.wait('@authentication').then((interception) => {
				const body = interception.request.body;
				this.compareRegistrationProperty(body,user,isAdmin);
				expect(body).to.have.property('name',isAdmin ? `[A]${user.name}` : user.name);
				expect(body).to.have.property('cEmail',user.email);
				expect(body).to.have.property('password',user.password);
				expect(body).to.have.property('cPassword',user.password);
				// FIXME:
				expect(body).to.have.property('playerRole', "Non sono un giocatore");
			});
	}

	// Compare common registration properties
	compareRegistrationProperty(body:any, user:RegistrationProps,isAdmin:boolean){
		expect(body).to.have.property('username',user.username);
		expect(body).to.have.property('surname',user.surname);
		expect(body).to.have.property('email',user.email);
		expect(body).to.have.property('phone',user.phone);
		// FIXME: compare only dates, without time
		expect(body).to.have.property('birthday');
	}

	// Fields
	getHeaderUsername(){
		return cy.get('[data-cy=header-username]');
	}
	getUsername(){
		return cy.get('#username');
	}
	getName(){
		return cy.get('#name');
	}
	getSurname(){
		return cy.get('#surname');
	}
	getEmail(){
		return cy.get('#email');
	}
	getConfirmEmail(){
		return cy.get('#cemail');
	}
	getPassword(){
		return cy.get('#password');
	}
	getConfirmPassword(){
		return cy.get('#cpassword');
	}
	getPhone(){
		return cy.get('#phone');
	}

	// Button
	getSwapButton(){
		return cy.get('#swapButton');
	}
	getLoginButton(){
		return cy.get('#swapButton');
	}
	getRegistrationButton(){
		return cy.get('#registerButton');
	}

}
