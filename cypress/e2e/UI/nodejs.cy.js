// const fs = require('fs')

describe('testando o cypress.config.js', () => {

    it('mostrar mensagem no console', () => {
        cy.log('Mensagem do console do Cypress')
        console.log('Mensagem do console.log dentro do browser')
        cy.task('msgConsole')
    })

    it('conta o total de arquivos da pasta UI', () => {
    // cy.log(`Número de arquivos: ${fs.readdirSync('cypress/e2e/ui').length}`)
        cy.task('lerPasta', 'cypress/e2e/ui')
            .then((totalArquivos) => {
                cy.log(`Numero de Arquivos: ${totalArquivos}`)
                expect(totalArquivos).to.eq(6)
            })
    })
})