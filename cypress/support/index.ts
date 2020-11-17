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

import './commands'

// https://github.com/NoriSte/ui-testing-best-practices/blob/master/sections/generic-best-practices/use-your-testing-tool-as-your-primary-development-tool.md
require('cypress-skip-and-only-ui/support');
require('cypress-watch-and-reload/support');


