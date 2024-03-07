const { defineConfig } = require('cypress');

const fs = require('fs')

module.exports = defineConfig({
    e2e: {
        baseUrl: 'http://localhost:3000',
        viewportHeight: 1080,
        viewportWidth: 1920,
        retries: {
            runMode: 1,
            openMode: 0,
        },
        video: true,
        // eslint-disable-next-line
        setupNodeEvents(on, config) {
        
            on('task', {

                msgConsole() {
                    console.log('Mensagem do console.log dentro do NodeJs')

                    return null
                },

                lerPasta(caminho) {
                    return fs.readdirSync(caminho).length
                }
            })
        },
    },
});
