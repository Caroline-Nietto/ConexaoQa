
describe('API - Profile', () => {
  
    context('valida a API de perfis', () => {

        it('todos os perfis', () => {

            // cy.request('GET', '/api/profile')
            cy.request({
                url: '/api/profile',
                method: 'GET'
            }).then(({ status, duration, body }) => {
                expect(status, 'Status Code').to.eq(200)
                expect(duration, 'Duração').to.be.lessThan(1000)
                expect(body[0].status, 'Cargo Usuario 0').to.eq('QA Pleno')
                expect(body[0].user.name, 'Nome Usuario 0').to.eq('carol')
                expect(body[0].skills).to.have.lengthOf(3)
                expect(body[0].date).to.not.be.null
                expect(body[0].location).to.eq('São paulo, Sp')
            })    
      
        })
        
    })

    context('valida um perfil especifico', () => {

        let urlApiPerfil = '/api/profile/user'
        let method = 'GET'

        it('seleciona um usuario inválido', () => {
            let usuarioId = '1'

            cy.request({
                method,
                url: `${urlApiPerfil}/${usuarioId}`,
                failOnStatusCode: false
            }).then(({status, body}) => {
                expect(status, 'Status Code').to.eq(404)
                expect(body.errors[0].msg, 'Mensagem de Erro').to.eq('Perfil não encontrado')
            })
            
        })

        it('seleciona usuario válido', () => {
            let usuarioId = '65c0e44bda929f1c80e01f76'

            cy.request({
                method,
                url: `${urlApiPerfil}/${usuarioId}` 
            }).then(({ status, body }) => {
                expect(status).to.eq(200)
                expect(body.user.name).to.eq('Joao do Teste')
            })                
        })
    })
}) 