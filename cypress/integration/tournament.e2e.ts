import { Tournament } from '../pages/tournament.page';
import {BE_VISIBLE} from "../pages/abstract.page";
import {fixCypressSpec} from "../support";
import {LOGIN_BUTTON} from "../pages/landing.page";

describe('Tournament Test', () => {
	beforeEach(fixCypressSpec(__filename));

	describe('Login as Admin', () => {
		let tournamentPage = new Tournament();
		before(() => {
			tournamentPage.visit();
			tournamentPage.forceRegisterAdmin();
		});
		beforeEach(()=>{
			Cypress.Cookies.preserveOnce('session_id');
			tournamentPage.visit()
		});

		it('Should see tournament form', () => {
			tournamentPage.getForm().should(BE_VISIBLE);
			tournamentPage.getSelectTournamentButton().should(BE_VISIBLE);
		});

		function newTournament(name:string,date:string,visibility:string){
			tournamentPage.getForm().should(BE_VISIBLE);
			// There isn't any tournament so I'm on new tournament form
			tournamentPage.getNewSubmit().should(BE_VISIBLE).should('be.disabled')
			tournamentPage.getSelectTournamentButton().should(BE_VISIBLE);
			tournamentPage.getNewName().type(name);
			// tournamentPage.getNewDate().type(date);
			tournamentPage.getNewVisibility().select(visibility);
			tournamentPage.getNewSubmit().should(BE_VISIBLE).should('not.be.disabled').click();
			cy.location().should((loc) => {
				expect(loc.pathname).to.eq('/tournament');
			});
		}
		it('Should be able to create a new public tournament', () => {
			newTournament("newT1","16/12/2020","Pubblico");
		});

		it('Should be able to create a new private tournament', () => {
			newTournament("newT2","17/12/2020","Privato");
		});


	});

});

