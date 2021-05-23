import mock from '../../products/mocks/default.json'

describe('Products', () => {
  it('Show list of products from default mock', () => {
    cy.visit('/default')

    cy.get('[data-test-id="product"]').should('have.length', mock.length)
  })

  it('Show list of products from empty mock', () => {
    cy.visit('/empty')

    cy.get('[data-test-id="product"]').should('have.length', 0)
    cy.contains('No se encontraron productos')
  })
})
