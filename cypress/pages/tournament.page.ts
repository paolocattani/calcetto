import { AbstractPage, headers } from './abstract.page';
import { AuthAction } from '../../src/redux/actions';
import { DeleteTournamentRequest, OmitHistory, SaveTournamentRequest } from '@common/models';

export class Tournament extends AbstractPage {
	// Override
	visit() {
		return cy.visit('/');
	}

	// Common
	getForm() {
		return cy.get('[data-cy=tournament-form]');
	}

	// New Tournament
	getNewName() {
		return cy.get('[data-cy=new-name]');
	}
	getNewDate() {
		return cy.get('[data-cy=new-date]');
	}
	getNewVisibility() {
		return cy.get('[data-cy=new-visibility]');
	}
	getNewSubmit() {
		return cy.get('[data-cy=new-submit]');
	}
	getNewTournamentButton() {
		return cy.get('[data-cy=new-tournament]');
	}

	// Selection
	getSelect() {
		return cy.get('#tournamentSelect');
	}
	getSelectSubmit() {
		return cy.get('[data-cy=select-submit]');
	}
	getSelectTournamentButton() {
		return cy.get('[data-cy=select-tournament]');
	}

	// Force
	forceNewTournament(body: OmitHistory<SaveTournamentRequest>) {
		cy.request({
			...headers,
			method: 'POST',
			url: 'http://localhost:5001/api/v2/tournament/new',
			body,
		}).then((resp) => {
			cy.visit('/');
		});
	}

	forceDeleteTournament() {
		cy.request({
			...headers,
			method: 'DELETE',
			url: 'http://localhost:5001/api/v2/tournament/test/delete',
			body: { secret: Cypress.env('secret') },
		});
	}
}
