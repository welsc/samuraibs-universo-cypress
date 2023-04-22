
//import faker from '@faker-js/faker'

describe('Cadastro de Usuário', function () {

    context('Quando é um usuário novo', function () {
        const user = {
            name: 'Wellington Carvalho',
            email: 'welsc2209@gmail.com',
            password: 'pwd123'
        }

        before(function () {
            cy.task('removeUser', user.email)
                .then(function (result) {
                    console.log(result)
                })
        })

        it('deve cadastrar com sucesso', function () {

            // const name = faker.name.fullName()
            // const email = faker.internet.email()
            // const password = faker.internet.password()

            // const name = 'Wellington Carvalho'
            // const email = 'welsc2209@gmail.com'
            // const password = 'pwd123'

            // definindo a massa de testes
            // const user = {
            //    name: 'Wellington Carvalho',
            //    email: 'welsc2209@gmail.com',
            //  password: 'pwd123'
            // }

            // removendo o usuário para que a massa seja sempre válida


            // acessando a página de cadastro
            cy.visit('/signup')

            // preenchendo e submetendo o formulário de cadastro
           // cy.get('input[placeholder="Nome"]').type(user.name)
           // cy.get('input[placeholder="E-mail"]').type(user.email)
           // cy.get('input[placeholder="Senha"]').type(user.password)

            cy.get('input[placeholder^="Nome"]').type(user.name)
            cy.get('input[placeholder$="email"]').type(user.email)
            cy.get('input[placeholder*="senha"]').type(user.password)

            cy.contains('button', 'Cadastrar').click()

            // cy.wait(1000)
            // cy.get('body')

            // validação do resultado esperado
            cy.get('.toast')
                .should('be.visible')
                .find('p')
                .should('have.text', 'Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')
        })
    })


    context('Quando o usuário já existe', function () {
        const user = {
            name: 'José Silva',
            email: 'jose_silva@gmail.com',
            password: 'pwd123',
            is_provider: true
        }

        before(function () {
            cy.task('removeUser', user.email)
                .then(function (result) {
                    console.log(result)
                })

            cy.request(
                'POST',
                'http://localhost:3333/users',
                user
            ).then(function (response) {

                expect(response.status).to.eq(200)
            })
        })


        it('deve exibir mensagem de e-mail já cadastrado', function () {

            cy.visit('/signup')

            cy.get('input[placeholder^="Nome"]').type(user.name)
            cy.get('input[placeholder$="email"]').type(user.email)
            cy.get('input[placeholder*="senha"]').type(user.password)

            cy.contains('button', 'Cadastrar').click()

            cy.get('.toast')
                .should('be.visible')
                .find('p')
                .should('have.text', 'Email já cadastrado para outro usuário.')
        })
    })
})