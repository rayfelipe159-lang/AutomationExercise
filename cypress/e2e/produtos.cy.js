describe('Produtos e Carrinho', () => {
  beforeEach(() => {
    cy.visit('/products')
  })

  //valida que a lista de produtos carrega
  it('Exibir a lista de produtos', () => {
    cy.url().should('include', '/products')
    cy.contains('All Products').should('be.visible')
    cy.get('.features_items .product-image-wrapper').should('have.length.greaterThan', 0)
  })

  //pesquisa um produto pelo nome
  it('Pesquisar um produto', () => {
    cy.get('#search_product').type('Tshirt')
    cy.get('#submit_search').click()

    cy.contains('Searched Products').should('be.visible')
    cy.get('.features_items .product-image-wrapper').should('have.length.greaterThan', 0)
  })

  //adiciona um produto e confere no carrinho
  it('Adicionar produto ao carrinho', () => {
    cy.get('.features_items .product-image-wrapper').first()
      .find('.add-to-cart').first().click({ force: true })

    cy.contains('Your product has been added to cart.').should('be.visible')
    cy.contains('View Cart').click()

    cy.url().should('include', '/view_cart')
    cy.get('#cart_info_table tbody tr').should('have.length', 1)
  })

  //adiciona um produto e remove do carrinho
  it('Remover produto do carrinho', () => {
    cy.get('.features_items .product-image-wrapper').first()
      .find('.add-to-cart').first().click({ force: true })
    cy.contains('View Cart').click()

    cy.get('.cart_quantity_delete').click()
    cy.contains('Cart is empty!').should('be.visible')
  })
})