import {deleteUser} from "../../src/redux/services/auth.service";
import {AbstractPage} from "./abstract.page";

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

	// Methods
	async forceLogout(){
		await fetch('/api/v2/auth/logout');
	}
	forceDeleteUser(email:string,username:string,password:string){
		return fetch('/api/v2/auth/test/delete',{
			method:'DELETE',
			body:JSON.stringify({email,username,password}),
			headers: {
				'Content-Type': 'application/json',
			}
		});
	}

	loginWithUi({username, password}: LoginProps) {
		return cy.visit('/')
			.get('#username').should('be.visible').type(username)
			.get('#password').should('be.visible').type(password)
			.get('#loginButton').click();
	}

	registerWithUi(user:RegistrationProps,isAdmin: boolean){
		return cy.visit('/')
			.get('#swapButton').click()
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
			.get('#registerButton').click();
	}

}
