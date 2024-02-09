describe('página inicial', () => {
    
    beforeEach(() => {
        cy.visit('/') 
    })

    it('valida o título da página inicial', () => {
              
        cy.get('[data-test=landing-title]')
            .should('have.text', 'Conectando QAs ...')
            .and('have.class', 'x-large')
    })

    it('seleciona um elemento com o contains', () => {
        
        cy.contains('h1', 'QAs')
            .should('have.text', 'Conectando QAs ...')

    })
          
    it('valida propriedade css', () => {
        cy.get('[data-test=landing-register]')
            .should('have.css', 'color', 'rgb(255, 255, 255)')    
    })
})