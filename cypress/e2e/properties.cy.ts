describe('Properties Management', () => {
  beforeEach(() => {
    cy.visit('/properties')
    cy.waitForLoadingToFinish()
  })

  it('should display properties page', () => {
    cy.get('[data-testid="properties-page"], h1').should('be.visible')
    cy.get('[data-testid="properties-header"]').should('be.visible')
  })

  it('should display properties grid', () => {
    cy.get('[data-testid="properties-grid"]').should('be.visible')
    cy.get('[data-testid*="property-card"]').should('have.length.at.least', 1)
  })

  it('should open and close add property dialog', () => {
    // Open add property dialog
    cy.get('[data-testid="add-property-btn"], button').contains('Add').click()
    cy.get('[role="dialog"]').should('be.visible')
    
    // Close dialog
    cy.get('[role="dialog"] button[aria-label="Close"], [data-testid="close-button"]').click()
    cy.get('[role="dialog"]').should('not.exist')
  })

  it('should add a new property', () => {
    // Open add property dialog
    cy.get('[data-testid="add-property-btn"], button').contains('Add').click()
    cy.get('[role="dialog"]').should('be.visible')
    
    // Fill form
    const propertyData = {
      title: 'Test Property',
      price: '350000',
      bedrooms: '3',
      bathrooms: '2',
      sqft: '1800',
      address: '123 Test Street, Test City, TS 12345'
    }
    
    cy.fillForm(propertyData)
    
    // Submit form
    cy.get('[role="dialog"] button[type="submit"], [data-testid="save-button"]').click()
    
    // Verify property was added
    cy.get('[role="dialog"]').should('not.exist')
    cy.contains('Test Property').should('be.visible')
  })

  it('should filter properties', () => {
    // Test property type filter
    cy.get('[data-testid="property-type-filter"], select').then($filter => {
      if ($filter.length > 0) {
        cy.get('[data-testid="property-type-filter"], select').select('residential')
        cy.wait(1000)
        cy.get('[data-testid="properties-grid"]').should('be.visible')
      }
    })
    
    // Test price filter
    cy.get('[data-testid="price-filter"], input[type="range"]').then($filter => {
      if ($filter.length > 0) {
        cy.get('[data-testid="price-filter"], input[type="range"]').eq(0).invoke('val', 200000).trigger('input')
        cy.wait(1000)
        cy.get('[data-testid="properties-grid"]').should('be.visible')
      }
    })
  })

  it('should search properties', () => {
    cy.get('[data-testid="search-input"], input[placeholder*="Search"]').then($search => {
      if ($search.length > 0) {
        cy.get('[data-testid="search-input"], input[placeholder*="Search"]').type('home')
        cy.wait(1000)
        cy.get('[data-testid="properties-grid"]').should('be.visible')
      }
    })
  })

  it('should view property details', () => {
    cy.get('[data-testid*="property-card"]').first().click()
    
    // Should show property details (either modal or page)
    cy.get('[data-testid="property-details"], [role="dialog"]').should('be.visible')
    
    // Property details should contain key information
    cy.get('[data-testid="property-details"], [role="dialog"]').within(() => {
      cy.get('h1, h2, h3').should('be.visible')
      cy.contains(/\$[\d,]+/).should('be.visible') // Price
      cy.contains(/\d+.*bed/).should('be.visible') // Bedrooms
      cy.contains(/\d+.*bath/).should('be.visible') // Bathrooms
    })
  })

  it('should edit property', () => {
    cy.get('[data-testid*="property-card"]').first().within(() => {
      cy.get('[data-testid="edit-button"], button').contains('Edit').click()
    })
    
    cy.get('[role="dialog"]').should('be.visible')
    
    // Update property title
    cy.get('[data-testid="title"], input[name="title"]').clear().type('Updated Property Title')
    
    // Save changes
    cy.get('[role="dialog"] button[type="submit"], [data-testid="save-button"]').click()
    
    // Verify update
    cy.get('[role="dialog"]').should('not.exist')
    cy.contains('Updated Property Title').should('be.visible')
  })

  it('should delete property', () => {
    cy.get('[data-testid*="property-card"]').first().within(() => {
      cy.get('[data-testid="delete-button"], button').contains('Delete').click()
    })
    
    // Confirm deletion
    cy.get('[role="dialog"]').should('be.visible')
    cy.get('[role="dialog"] button').contains('Delete', { matchCase: false }).click()
    
    // Verify deletion
    cy.get('[role="dialog"]').should('not.exist')
  })

  it('should sort properties', () => {
    cy.get('[data-testid="sort-select"], select').then($sort => {
      if ($sort.length > 0) {
        cy.get('[data-testid="sort-select"], select').select('price-high-low')
        cy.wait(1000)
        cy.get('[data-testid="properties-grid"]').should('be.visible')
      }
    })
  })

  it('should handle pagination', () => {
    cy.get('[data-testid="pagination"]').then($pagination => {
      if ($pagination.length > 0) {
        cy.get('[data-testid="pagination"] button').contains('2').click()
        cy.wait(1000)
        cy.get('[data-testid="properties-grid"]').should('be.visible')
      }
    })
  })

  it('should be responsive on mobile', () => {
    cy.setViewportToMobile()
    cy.visit('/properties')
    
    // Check mobile layout
    cy.get('[data-testid="properties-page"]').should('be.visible')
    cy.get('[data-testid="mobile-property-card"]').should('have.length.at.least', 1)
    
    // Test mobile filters
    cy.get('[data-testid="mobile-filter-button"], button').contains('Filter').then($btn => {
      if ($btn.length > 0) {
        cy.get('[data-testid="mobile-filter-button"], button').contains('Filter').click()
        cy.get('[data-testid="mobile-filters"]').should('be.visible')
      }
    })
  })

  it('should handle property images', () => {
    cy.get('[data-testid*="property-card"]').first().within(() => {
      cy.get('img').should('be.visible')
      cy.get('img').should('have.attr', 'src').and('not.be.empty')
    })
  })

  it('should display property status', () => {
    cy.get('[data-testid*="property-card"]').first().within(() => {
      cy.get('[data-testid="property-status"], .status').should('be.visible')
    })
  })

  it('should show agent information', () => {
    cy.get('[data-testid*="property-card"]').first().within(() => {
      cy.get('[data-testid="agent-info"]').should('be.visible')
    })
  })
})
