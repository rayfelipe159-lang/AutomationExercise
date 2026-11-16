describe('Fale conosco', () => {
  beforeEach(() => {
    cy.visit('/contact_us')
  })

  //preenche o formulário e envia
  it('Enviar formulário de contato', () => {
    cy.contains('Get In Touch').should('be.visible')

    cy.get('[data-qa="name"]').type('Rayan Ramos')
    cy.get('[data-qa="email"]').type('rayan@teste.com')
    cy.get('[data-qa="subject"]').type('Teste de automação')
    cy.get('[data-qa="message"]').type('Mensagem enviada por um teste automatizado com Cypress.')
    cy.get('[data-qa="submit-button"]').click()

    //o Cypress aceita o alert de confirmação automaticamente
    cy.get('.status.alert-success')
      .should('be.visible')
      .and('contain', 'Success! Your details have been submitted successfully.')
  })
})