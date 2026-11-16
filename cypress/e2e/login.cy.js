describe('Login', () => {
  const email = `login${Date.now()}@teste.com`

  //cria o usuário antes de todos os testes
  before(() => {
    cy.criarUsuario(email)
  })

  //apaga o usuário depois de todos os testes
  after(() => {
    cy.excluirUsuario(email)
  })

  beforeEach(() => {
    cy.visit('/login')
  })

  it('Fazer login com dados válidos', () => {
    cy.fixture('usuario').then((u) => {
      cy.get('[data-qa="login-email"]').type(email)
      cy.get('[data-qa="login-password"]').type(u.senha)
      cy.get('[data-qa="login-button"]').click()

      cy.contains(`Logged in as ${u.nome}`).should('be.visible')
    })
  })

  it('Fazer login com senha incorreta', () => {
    cy.get('[data-qa="login-email"]').type(email)
    cy.get('[data-qa="login-password"]').type('senhaErrada123')
    cy.get('[data-qa="login-button"]').click()

    cy.contains('Your email or password is incorrect!').should('be.visible')
  })

  it('Fazer logout', () => {
    cy.fixture('usuario').then((u) => {
      cy.get('[data-qa="login-email"]').type(email)
      cy.get('[data-qa="login-password"]').type(u.senha)
      cy.get('[data-qa="login-button"]').click()

      cy.get('a[href="/logout"]').click()
      cy.url().should('include', '/login')
    })
  })
})