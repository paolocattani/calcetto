import {AbstractPage, headers} from './abstract.page';
import {AuthAction} from "../../src/redux/actions";
import {OmitHistory, SaveTournamentRequest} from "../../src/@common/models";

export class Pairs extends AbstractPage {
	// Override
	visit() {
		return cy.visit('/');
	}

	// Common
	getToolsBar() {
		return cy.get('[data-cy=pair-toolbar]');
	}
	getTable() {
		return cy.get('[data-cy=pair-table]');
	}


}
