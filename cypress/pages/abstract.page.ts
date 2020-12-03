import {RootState} from "../../src/@common/models";

export abstract class AbstractPage {
	abstract visit(): Cypress.Chainable<Cypress.AUTWindow>;

	getLoader(){
		return cy.get('[data-cy=loader]');
	}

	getToastContainer(){
		return cy.get('[data-cy=toast-container]');
	}

	getStoreState(reducer:keyof RootState){
		return cy.window().its('store').invoke('getState').its(reducer);
	}

}
