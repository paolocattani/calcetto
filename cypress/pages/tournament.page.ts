import {AbstractPage} from "./abstract.page";

class Tournament extends AbstractPage{


	getForm(){
		return cy.get('[data-cy=tournament-form]');
	}

	visit(): Cypress.Chainable<Cypress.AUTWindow> {
		return cy.visit('/');
	}
}