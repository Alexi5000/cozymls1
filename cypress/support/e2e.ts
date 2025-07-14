// ***********************************************************
// This example support/e2e.ts is processed and
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

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

// Add global error handling
Cypress.on('uncaught:exception', (err, runnable) => {
  // Prevent Cypress from failing the test on uncaught exceptions
  // that are not critical to the test flow
  if (err.message.includes('ResizeObserver loop limit exceeded')) {
    return false
  }
  
  if (err.message.includes('Non-Error promise rejection captured')) {
    return false
  }
  
  return true
})

// Add custom viewport sizes
Cypress.Commands.add('setViewportToMobile', () => {
  cy.viewport(375, 667)
})

Cypress.Commands.add('setViewportToTablet', () => {
  cy.viewport(768, 1024)
})

Cypress.Commands.add('setViewportToDesktop', () => {
  cy.viewport(1280, 720)
})

declare global {
  namespace Cypress {
    interface Chainable {
      setViewportToMobile(): Chainable<void>
      setViewportToTablet(): Chainable<void>
      setViewportToDesktop(): Chainable<void>
    }
  }
}
