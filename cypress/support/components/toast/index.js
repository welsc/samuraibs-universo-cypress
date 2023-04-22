
import { element } from './elements'

class Toast {
    shouldHaveText(expectText) {
        cy.get(element.toast)
            .should('be.visible')
            .find('p')
            .should('have.text', expectText)
    }
}
export default new Toast()