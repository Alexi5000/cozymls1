/// <reference types="cypress" />

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Navigation commands
Cypress.Commands.add('navigateTo', (path: string) => {
  cy.visit(path)
  cy.url().should('include', path)
})

// Authentication commands (mock for now)
Cypress.Commands.add('login', (username: string = 'testuser', password: string = 'password') => {
  cy.window().then((win) => {
    win.localStorage.setItem('auth_token', 'mock_token')
    win.localStorage.setItem('user', JSON.stringify({ 
      id: '1', 
      name: 'Test User', 
      email: 'test@example.com' 
    }))
  })
})

Cypress.Commands.add('logout', () => {
  cy.window().then((win) => {
    win.localStorage.removeItem('auth_token')
    win.localStorage.removeItem('user')
  })
})

// Property-related commands
Cypress.Commands.add('createProperty', (propertyData: any) => {
  const defaultProperty = {
    title: 'Test Property',
    price: 250000,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1500,
    address: '123 Test St, Test City, TS 12345',
    type: 'residential',
    status: 'active',
    ...propertyData
  }
  
  cy.window().then((win) => {
    const existingProperties = JSON.parse(win.localStorage.getItem('properties') || '[]')
    existingProperties.push({ ...defaultProperty, id: Date.now().toString() })
    win.localStorage.setItem('properties', JSON.stringify(existingProperties))
  })
})

// Form helpers
Cypress.Commands.add('fillForm', (formData: Record<string, string>) => {
  Object.entries(formData).forEach(([field, value]) => {
    cy.get(`[data-testid="${field}"], [name="${field}"], #${field}`)
      .should('be.visible')
      .clear()
      .type(value)
  })
})

// Wait for loading states
Cypress.Commands.add('waitForLoadingToFinish', () => {
  cy.get('[data-testid="loading-spinner"]', { timeout: 10000 }).should('not.exist')
})

// Modal/Dialog helpers
Cypress.Commands.add('openModal', (triggerSelector: string) => {
  cy.get(triggerSelector).click()
  cy.get('[role="dialog"]').should('be.visible')
})

Cypress.Commands.add('closeModal', () => {
  cy.get('[role="dialog"]').should('be.visible')
  cy.get('[role="dialog"] button[aria-label="Close"], [role="dialog"] [data-testid="close-button"]').click()
  cy.get('[role="dialog"]').should('not.exist')
})

// API mocking helpers
Cypress.Commands.add('mockApiCall', (method: string, url: string, response: any) => {
  cy.intercept(method, url, response).as('apiCall')
})

// Accessibility testing
Cypress.Commands.add('checkA11y', () => {
  cy.injectAxe()
  cy.checkA11y()
})

declare global {
  namespace Cypress {
    interface Chainable {
      navigateTo(path: string): Chainable<void>
      login(username?: string, password?: string): Chainable<void>
      logout(): Chainable<void>
      createProperty(propertyData?: any): Chainable<void>
      fillForm(formData: Record<string, string>): Chainable<void>
      waitForLoadingToFinish(): Chainable<void>
      openModal(triggerSelector: string): Chainable<void>
      closeModal(): Chainable<void>
      mockApiCall(method: string, url: string, response: any): Chainable<void>
      checkA11y(): Chainable<void>
    }
  }
}
