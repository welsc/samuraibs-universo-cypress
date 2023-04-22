import { element } from './elements'
import toast from '../../components/toast'

class SignupPage {

    constructor() {
        this.toast = toast
    }

    go() {
        cy.visit('/signup')
    }

    form(user) {
        cy.get(element.name).type(user.name)
        cy.get(element.email).type(user.email)
        cy.get(element.password).type(user.password)
    }

    submit() {
        cy.contains(element.signupButton).click()
    }

    alertHaveText(expectedText) {
        cy.contains('.alert-error', expectedText)
            .should('be.visible')
    }
}
export default new SignupPage()