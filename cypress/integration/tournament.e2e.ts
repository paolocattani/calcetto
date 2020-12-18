import { Tournament } from '../pages/tournament.page';
import {BE_DISABLED, BE_VISIBLE, HAVE_LENGTH} from "../pages/abstract.page";
import {fixCypressSpec} from "../support";
import {LOGIN_BUTTON} from "../pages/landing.page";
import {Pairs} from "../pages/pair.page";

describe('Tournament Test', () => {
	beforeEach(fixCypressSpec(__filename));

	describe('Login as Admin', () => {
		let tournamentPage = new Tournament();
		// Register an admin
		before(() => {
			tournamentPage.visit(); // Have to visit the page to init redux store.
			tournamentPage.forceRegisterAdmin();
			tournamentPage.forceDeleteTournament();
		});
		beforeEach(()=>{
			tournamentPage.visit()
			Cypress.Cookies.preserveOnce('session_id');
		});

		//
		it('Should see tournament form', () => {
			tournamentPage.getForm().should(BE_VISIBLE);
			tournamentPage.getNewTournamentButton().should(BE_VISIBLE);
		});

		function newTournament(name:string,date:string,visibility:string){
			tournamentPage.getForm().should(BE_VISIBLE);
			tournamentPage.getSelectSubmit().should(BE_VISIBLE).should(BE_DISABLED)
			tournamentPage.getNewTournamentButton().should(BE_VISIBLE).click();
			tournamentPage.getNewName().type(name);
			// tournamentPage.getNewDate().type(date);
			tournamentPage.getNewVisibility().select(visibility);
			tournamentPage.getNewSubmit().should(BE_VISIBLE).should(`not.${BE_DISABLED}`).click();
		}
		it('Should be able to create a new public tournament', () => {
			newTournament("newT1","16/12/2020","Pubblico");
			cy.location('pathname').should('eq', '/tournament');
			const pairPage = new Pairs();
			pairPage.getToolsBar().should(BE_VISIBLE);
			pairPage.getTable().should(BE_VISIBLE);
		});

		it('Should not be able to create the same public tournament', () => {
			newTournament("newT1","16/12/2020","Pubblico");
			tournamentPage.getToastList().should(HAVE_LENGTH, 1);
			tournamentPage.getForm().should(BE_VISIBLE);
		});

		it('Should be able to create a new private tournament', () => {
			newTournament("newT2","17/12/2020","Privato");
			cy.location('pathname').should('eq', '/tournament');
			const pairPage = new Pairs();
			pairPage.getToolsBar().should(BE_VISIBLE);
			pairPage.getTable().should(BE_VISIBLE);
		});

		it('Should not be able to create the same private tournament', () => {
			newTournament("newT2","17/12/2020","Pubblico");
			tournamentPage.getToastList().should(HAVE_LENGTH, 1);
			tournamentPage.getForm().should(BE_VISIBLE);
		});

		it('Should be able to select a public tournament', () => {
			tournamentPage.getNewTournamentButton().should(BE_VISIBLE);
			tournamentPage.getSelect()
				.find(`input`)
				.first()
				.click({ force: true })
		});

	});

});

