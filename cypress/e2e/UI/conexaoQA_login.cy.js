describe('página de login', () => {

    const CAMPO_EMAIL = 'login-email'
    const CAMPO_SENHA = 'login-password'
    const BOTAO_LOGIN = 'login-submit'

    beforeEach(() => {
        cy.visit('/login')
    })

    it('faz o login válido', { tags: ['@login', '@smoke'] }, () => {
        
        cy.intercept('GET', '/api/profile/me')
            .as('apiLogin')

        // preenche o email
        cy.getElement(CAMPO_EMAIL)
            .type(Cypress.env('email'))

        
        // preenche a senha
        cy.getElement(CAMPO_SENHA)
            .type(Cypress.env('password'))

        // clica no login
        cy.getElement(BOTAO_LOGIN)            
            .click()

        // espera a API de login responder    
        cy.wait('@apiLogin')
            .then(({ response }) => {
                expect(response.body.user.name, 'RESPOSTA DA API').to.eq('carol')
            })

        // valida se o usuário está logado
        cy.getElement('dashboard-welcome')
            .should('be.visible')
            .and('contain', ' Bem-vindo ')
       
    })

    it('faz login inválido', { tags: '@smoke' }, () => {

        cy.intercept('POST', '/api/auth')
            .as('apiLogin')

        // preencher o email
        cy.getElement(CAMPO_EMAIL)
            .type(Cypress.env('email'))

        // preencher a senha
        cy.getElement(CAMPO_SENHA)
            .type('14561')

        // clicar no botão login
        cy.getElement(BOTAO_LOGIN)
            .click()

        // esperar a api
        cy.wait('@apiLogin')                 

        // validar a mensagem de retorno (erro)
        cy.getElement('alert')
            .should('have.text', 'Credenciais inválidas')
        
    })

    it('valida a digitação de um email invalido', () => {

        // preencher o email inválido e da Tab no campo
        cy.getElement(CAMPO_EMAIL)
            .type('carol')
            
        cy.getElement(CAMPO_SENHA)
            .click()

        // valida a mascara
        cy.contains('p', 'Digite um email válido') 
            .should('be.visible')
        
    })
    
})