/// <reference types="cypress" />
Cypress.Commands.add('addBook', ({ positionBook }) => {
  cy
    .get("[data-test='listBooks']")
    .children()
    .eq(positionBook)
    .get('button')
    .contains(/agregar a la lista/i)
    .click()
})

Cypress.Commands.add('takeOutBook', ({ positionBook }) => {
  cy
    .get("[data-test='listBooks']")
    .children()
    .eq(positionBook)
    .find('button')
    .contains(/sacar de la lista/i)
    .click()
})

Cypress.Commands.add('takeOutBookReadingList', ({ positionBook }) => {
  cy
    .get('#sectionReadingList')
    .find('ul')
    .children()
    .eq(positionBook)
    .find('button')
    .contains(/sacar de la lista/i)
    .click()
})

declare namespace Cypress {
  interface Chainable {
    addBook({ positionBook }: { positionBook: number }): Chainable<Element>
    takeOutBook({ positionBook }: { positionBook: number }): Chainable<Element>
    takeOutBookReadingList({ positionBook }: { positionBook: number }): Chainable<Element>
  }
}
