// Cria um usuário pela API do site
Cypress.Commands.add('criarUsuario', (email) => {
  cy.fixture('usuario').then((u) => {
    cy.request({
      method: 'POST',
      url: '/api/createAccount',
      form: true,
      body: {
        name: u.nome,
        email: email,
        password: u.senha,
        title: 'Mr',
        birth_date: '10',
        birth_month: '5',
        birth_year: '1995',
        firstname: u.primeiroNome,
        lastname: u.ultimoNome,
        company: u.empresa,
        address1: u.endereco,
        address2: '',
        country: u.pais,
        zipcode: u.cep,
        state: u.estado,
        city: u.cidade,
        mobile_number: u.telefone,
      },
    })
  })
})

// Exclui o usuário pela API (limpeza no final do teste)
Cypress.Commands.add('excluirUsuario', (email) => {
  cy.fixture('usuario').then((u) => {
    cy.request({
      method: 'DELETE',
      url: '/api/deleteAccount',
      form: true,
      body: { email: email, password: u.senha },
    })
  })
})