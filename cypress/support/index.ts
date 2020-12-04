// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************


// https://www.npmjs.com/package/cypress-plugin-snapshots
import 'cypress-plugin-snapshots/commands';
import '@cypress/code-coverage/support';
//import './commands'

// https://www.cypress.io/blog/2019/09/05/cypress-code-coverage-for-create-react-app-v3/
// https://github.com/NoriSte/ui-testing-best-practices/blob/master/sections/generic-best-practices/use-your-testing-tool-as-your-primary-development-tool.md
// require('cypress-skip-and-only-ui/support');
// require('cypress-watch-and-reload/support');


export const fixCypressSpec = (filename:string) => () => {
	const path = require('path')
	const relative = filename.substr(1) // removes leading "/"
	// @ts-ignore
	const projectRoot = Cypress.config('projectRoot')
	const absolute = path.join(projectRoot, relative)
	Cypress.spec = {
		absolute,
		name: path.basename(filename),
		relative
	}
}
