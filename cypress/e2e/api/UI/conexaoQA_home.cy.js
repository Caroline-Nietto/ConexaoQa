describe('página inicial', () => {
    
    beforeEach(() => {
        cy.visit('/') 
    })

    it('valida o título da página inicial', () => {
              
        cy.get('[data-test=landing-title]')
            .should('have.text', 'Conectando QAs ...')
            .and('have.class', 'x-large')
    })

    it.only('seleciona um elemento com o contains', () => {
        
        cy.contains('h1', 'QAs')
            .should('have.text', 'Conectando QAs ...')

        cy.get('[data-test=landing-register]')
            .should('have.css', 'color', 'rgb(255, 255, 255)')    
    })
})