describe('Cadastro de usuário', () => {
  const email = `rayan${Date.now()}@teste.com`

  beforeEach(() => {
    cy.visit('/login')
  })

  //preenche o formulário de cadastro e cria a conta
  it('Cadastrar um novo usuário com sucesso', () => {
    cy.fixture('usuario').then((u) => {
      //primeira etapa: nome e e-mail
      cy.get('[data-qa="signup-name"]').type(u.nome)
      cy.get('[data-qa="signup-email"]').type(email)
      cy.get('[data-qa="signup-button"]').click()

      //segunda etapa: dados da conta
      cy.contains('Enter Account Information').should('be.visible')
      cy.get('#id_gender1').check()
      cy.get('[data-qa="password"]').type(u.senha)
      cy.get('[data-qa="days"]').select('10')
      cy.get('[data-qa="months"]').select('May')
      cy.get('[data-qa="years"]').select('1995')
      cy.get('[data-qa="first_name"]').type(u.primeiroNome)
      cy.get('[data-qa="last_name"]').type(u.ultimoNome)
      cy.get('[data-qa="company"]').type(u.empresa)
      cy.get('[data-qa="address"]').type(u.endereco)
      cy.get('[data-qa="country"]').select(u.pais)
      cy.get('[data-qa="state"]').type(u.estado)
      cy.get('[data-qa="city"]').type(u.cidade)
      cy.get('[data-qa="zipcode"]').type(u.cep)
      cy.get('[data-qa="mobile_number"]').type(u.telefone)
      cy.get('[data-qa="create-account"]').click()

      //valida a criação da conta
      cy.get('[data-qa="account-created"]').should('contain', 'Account Created!')
      cy.get('[data-qa="continue-button"]').click()
      cy.contains(`Logged in as ${u.nome}`).should('be.visible')

      //exclui a conta no final
      cy.get('a[href="/delete_account"]').click()
      cy.get('[data-qa="account-deleted"]').should('contain', 'Account Deleted!')
    })
  })

  //tenta cadastrar com um e-mail que já existe
  it('Não permitir cadastro com e-mail já existente', () => {
    const emailExistente = `existente${Date.now()}@teste.com`
    cy.criarUsuario(emailExistente)

    cy.get('[data-qa="signup-name"]').type('Outro Usuario')
    cy.get('[data-qa="signup-email"]').type(emailExistente)
    cy.get('[data-qa="signup-button"]').click()

    cy.contains('Email Address already exist!').should('be.visible')

    cy.excluirUsuario(emailExistente)
  })
})