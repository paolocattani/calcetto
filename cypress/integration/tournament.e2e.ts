import {Tournament} from "../pages/tournament.page";


describe('Tournament Test', () => {

	describe('Login as Admin', () => {
		let tournamentPage = new Tournament();
		before(()=>{
			tournamentPage.forceRegisterAdmin();
			Cypress.Cookies.preserveOnce('session_id')
		})
		it('Should register Admin', ()=> {
			tournamentPage.visit();
			tournamentPage.getForm().should('be.visible');
			tournamentPage.getNewTournamentButton().should('be.visible');
		});

	});

	describe('Login as User', () => {

		let tournamentPage = new Tournament();
		before(()=>{
			tournamentPage.forceRegisterUser();
			Cypress.Cookies.preserveOnce('session_id')
		})
		it('Should register Admin', ()=> {
			tournamentPage.visit();
			tournamentPage.getForm().should('be.visible');
			tournamentPage.getNewTournamentButton().should('be.visible');
		});

	});

});

