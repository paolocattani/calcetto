import {RootState} from "../../src/@common/models";

export abstract class AbstractPage {
	abstract visit(): Cypress.Chainable<Cypress.AUTWindow>;

	getLoader(){
		return cy.get('[data-cy=loader]');
	}

	getToastList(){
		return cy
			.get('.Toastify__toast-container.Toastify__toast-container--top-right')
			.children();
	}

	getStoreState(reducer:keyof RootState){
		return cy.window().its('store').invoke('getState').its(reducer);
	}

}
