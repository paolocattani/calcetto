export {};

declare global {
	interface Window {
		Cypress?:any;
		store?:any;
	}

	namespace Cypress {
		interface Chainable {
			toMatchSnapshot:any;
			toMatchImageSnapshot:any;
		}
	}
}
