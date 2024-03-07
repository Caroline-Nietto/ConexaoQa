describe('alerta de login', () => {
    

    it('valida o alerta de credencial inválida', { tags: ['@smoke', '@login'] }, () => {

        // Faz o spy na hora
        cy.clock()
        
        cy.intercept('POST', '/api/auth')
            .as('login')

        // visita a página de login
        cy.visit('/login')

        // prencher um email aleatório
        cy.getElement('login-email')
            .type('usuarioAleatorio@teste.com')

        // preencher uma senha alearória
        cy.getElement('login-password')
            .type('1234789')
       
        // Clicar no botão login
        cy.getElement('login-submit')
            .click()
        
        cy.wait('@login')

        // validar o alerta de credencial inválido
        cy.getElement('alert')
            .should('have.text', 'Credenciais inválidas')

        // cy.wait(10000)
        
        // cy.getElement('alert')      
        // cy.get('[data-test=alert]', { timeout: 10000 })
        //     .should('not.exist')

        // adianta o tempo da aplicação em 10 segundos
        cy.tick(10000)

        cy.getElement('alert')      
            .should('not.exist')
            
    })
})