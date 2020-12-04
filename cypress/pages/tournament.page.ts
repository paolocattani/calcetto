import {AbstractPage} from "./abstract.page";

export class Tournament extends AbstractPage{

	getForm(){
		return cy.get('[data-cy=tournament-form]');
	}

	getNewTournamentButton(){
		return cy.get('[data-cy=new-tournament]')
	}

	visit(username?:string,password?:string) {
		super.forceLogin(username!, password!);
		return cy.visit('/');
	}

}
