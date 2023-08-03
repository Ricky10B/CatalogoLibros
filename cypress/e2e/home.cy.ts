/// <reference types="Cypress" />
describe('Home page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173')
  })

  context('Apariencia de la lista de lectura', () => {
    it('Mostrar y ocultar la barra de lista de lectura', () => {
      // Se muestra la barra de lista de lectura
      cy.get("[data-test='btnLibroOpen']").click()
      cy.get('#sectionReadingList').should('be.visible')

      cy
        .getAllLocalStorage()
        .its('http://localhost:5173.__REDUX__STORE__visibleList')
        .should('deep.equal', JSON.stringify({
          isVisibleSection: true,
          isVisibleListBook: true
        }))

      cy.reload()

      cy.get('#sectionReadingList').should('be.visible')
  
      // Se esconde la barra de lista de lectura
      cy.get("[data-test='btnLibroClose']").click()
      cy.get('#sectionReadingList').should('not.be.visible')

      cy
        .getAllLocalStorage()
        .its('http://localhost:5173.__REDUX__STORE__visibleList')
        .should('deep.equal', JSON.stringify({
          isVisibleSection: false,
          isVisibleListBook: false
        }))
    })
  
    it('En pantallas grandes debe quedarse estática', () => {
      cy.viewport('macbook-16')
  
      cy.get('#sectionReadingList').should('be.visible')
  
      const btnBookClose = cy.get('[data-test="btnLibroClose"]')
  
      btnBookClose.click()
      cy.get('#sectionReadingList').should('be.visible')
      
      btnBookClose.click()
      cy.get('#sectionReadingList').should('be.visible')
    })
  })
  
  context('Acciones con los libros', () => {
    it('Agregar un libro a la lista de lectura', () => {
      const positionBook = 0
  
      cy
        .get('p')
        .contains(`Libros en la lista de lectura: ${positionBook}`)
  
      cy.addBook({ positionBook })
  
      // el conteo de libros aumenta en 1
      cy
        .get('p')
        .contains('Libros en la lista de lectura: 1')
      
      cy
        .get("[data-test='listBooks']")
        .children()
        .eq(positionBook)
        .get('button')
        .contains(/sacar de la lista/i)
  
      cy
        .get('#sectionReadingList')
        .find('ul')
        .its('length')
        .as('lengthBooksReadingList')

      cy
        .get('@lengthBooksReadingList')
        .should('equal', 1)

      // Verifica que se guardaron los datos en el localStorage
      cy.getAllLocalStorage().then(() => {
        const { readingList } = JSON.parse(
          window.localStorage.getItem('__REDUX__STORE__library') || '{}'
        )
        expect(readingList).have.length(1)
      })

      cy.reload()

      cy
        .get('p')
        .contains('Libros en la lista de lectura: 1')

      cy
        .get('@lengthBooksReadingList')
        .should('equal', 1)
    })
  
    it('Agregar libros a la lista de lectura', () => {
      const amountOfcards = 4
  
      for (let i = 0; i < amountOfcards; i++) {
        cy.addBook({ positionBook: i })
      }
  
      cy
        .get('p')
        .contains(`Libros en la lista de lectura: ${amountOfcards}`)
  
      const btnLibroOpen = cy.get("[data-test='btnLibroOpen']")
      btnLibroOpen.find('span').contains(amountOfcards)
      btnLibroOpen.click()
  
      cy
        .get('#sectionReadingList')
        .find('ul')
        .children()
        .should('have.length', amountOfcards)
    })
  
    it('Sacar libros de la lista de lectura', () => {
      const amountOfcards = 3
  
      for (let i = 0; i < amountOfcards; i++) {
        cy.addBook({ positionBook: i })
      }
  
      cy
        .get('p')
        .contains(`Libros en la lista de lectura: ${amountOfcards}`)
  
      cy.takeOutBook({ positionBook: 1 })
  
      cy.get("[data-test='btnLibroOpen']").click()
  
      cy
        .get('#sectionReadingList')
        .find('ul')
        .children()
        .should('have.length', amountOfcards - 1)
  
      cy
        .get('p')
        .contains('Libros en la lista de lectura:')
        .contains(amountOfcards - 1)
  
      for (let i = 0; i < amountOfcards - 1; i++) {
        cy.takeOutBookReadingList({ positionBook: 0 })
      }
  
      cy
        .get('p')
        .contains('Libros en la lista de lectura: 0')
  
      cy
        .get('#sectionReadingList')
        .find('p')
        .contains(/no hay libros en la lista de lectura/i)
    })
  })
  
  context('Acciones con los filtros', () => {
    it('Filtrar por genero', () => {
      const bookGenre = 'Ciencia ficción'
  
      cy.get('#genres').select(bookGenre)
      cy.get('#genres').contains(bookGenre)
  
      cy
        .get("[data-test='listBooks']")
        .children()
        .each($el => {
          cy.wrap($el)
            .find('span')
            .contains(`Genero: ${bookGenre}`)
        })
  
      cy
        .get('p')
        .contains(`Libros del género ${bookGenre}`)

      cy
        .getAllLocalStorage()
        .its('http://localhost:5173.__REDUX__STORE__filters')
        .should('deep.equal', JSON.stringify({
          filterGenre: bookGenre
        }))

      // Se recarga la página para probar la persistencia de los datos
      cy.reload()

      cy.get('#genres').contains(bookGenre)

      cy
        .get('p')
        .contains(`Libros del género ${bookGenre}`)
    })

    it('Se filtra por genero y luego se vuelven a poner todos los libros', () => {
      const bookGenre = 'Terror'
  
      cy.get('#genres').select(bookGenre)
      cy.get('#genres').contains(bookGenre)
  
      cy
        .get('p')
        .contains(`Libros del género ${bookGenre}`)
  
      cy.get('#genres').select('Todos')

      cy
        .get('p')
        .contains(`Libros del género ${bookGenre}`)
        .should('not.exist')
    })
  })
})
