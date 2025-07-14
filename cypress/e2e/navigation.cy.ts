describe('Navigation', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should load the dashboard by default', () => {
    cy.url().should('eq', Cypress.config().baseUrl + '/')
    cy.get('[data-testid="dashboard-page"], h1').should('be.visible')
  })

  it('should navigate to all main pages', () => {
    const pages = [
      { path: '/properties', title: 'Properties' },
      { path: '/contacts', title: 'Contacts' },
      { path: '/deals', title: 'Deals' },
      { path: '/agents', title: 'Agents' },
      { path: '/activities', title: 'Activities' },
      { path: '/reports', title: 'Reports' },
      { path: '/settings', title: 'Settings' }
    ]

    pages.forEach(page => {
      cy.navigateTo(page.path)
      cy.get('h1, [data-testid*="page"]').should('be.visible')
      cy.wait(500) // Small delay for smooth navigation
    })
  })

  it('should handle 404 for invalid routes', () => {
    cy.visit('/invalid-route', { failOnStatusCode: false })
    cy.get('[data-testid="not-found-page"], h1').should('be.visible')
  })

  it('should have working navigation menu', () => {
    // Test sidebar navigation if it exists
    cy.get('[data-testid="sidebar"], nav').then($nav => {
      if ($nav.length > 0) {
        cy.get('[data-testid="sidebar"] a, nav a').should('have.length.at.least', 5)
        
        // Test clicking on navigation links
        cy.get('[data-testid="sidebar"] a[href="/properties"], nav a[href="/properties"]')
          .should('be.visible')
          .click()
        cy.url().should('include', '/properties')
      }
    })
  })

  it('should be responsive on mobile', () => {
    cy.setViewportToMobile()
    cy.visit('/')
    
    // Check mobile navigation
    cy.get('[data-testid="mobile-menu"], [data-testid="hamburger-menu"]').then($menu => {
      if ($menu.length > 0) {
        cy.get('[data-testid="mobile-menu"], [data-testid="hamburger-menu"]').click()
        cy.get('[data-testid="mobile-nav"]').should('be.visible')
      }
    })
  })

  it('should maintain navigation state on page refresh', () => {
    cy.navigateTo('/properties')
    cy.reload()
    cy.url().should('include', '/properties')
    cy.get('[data-testid="properties-page"], h1').should('be.visible')
  })

  it('should handle browser back/forward navigation', () => {
    cy.navigateTo('/properties')
    cy.navigateTo('/contacts')
    
    cy.go('back')
    cy.url().should('include', '/properties')
    
    cy.go('forward')
    cy.url().should('include', '/contacts')
  })
})
