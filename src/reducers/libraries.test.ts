import {
  addToReadingList,
  removeFromReadingList,
  setCountBooksFilters
} from './libraries'
import { store } from '../store'

describe('libraries reducer', () => {
  // Elimina todos los libros de la lista de lectura si existen
  beforeEach(() => {
    const { readingList } = store.getState().librariesReducer

    readingList.forEach(ISBN => {
      store.dispatch(removeFromReadingList({ ISBN }))
    })
  })

  describe('Agregar libros', () => {
    it('Agregar un libro a la lista de lectura', () => {
      const ISBN = '978-0451524935'
      let { readingList } = store.getState().librariesReducer
  
      expect(readingList).toHaveLength(0)
  
      store.dispatch(addToReadingList({ ISBN }))
  
      readingList = store.getState().librariesReducer.readingList
      expect(readingList).toHaveLength(1)
      expect(readingList).toContain(ISBN)
    })
  
    it('No agregar un libro que ya está en la lista de lectura', () => {
      const ISBN = '978-0451524935'
      
      store.dispatch(addToReadingList({ ISBN }))
      let { readingList } = store.getState().librariesReducer
      
      expect(readingList).toHaveLength(1)
      expect(readingList).toContain(ISBN)
      
      readingList = store.getState().librariesReducer.readingList
      store.dispatch(addToReadingList({ ISBN }))
      
      expect(readingList).toHaveLength(1)
      expect(readingList).toContain(ISBN)
    })
  })

  describe('Eliminar libros', () => {
    it('Eliminar un libro de la lista de lectura', () => {
      const ListOfISBN = [
        '978-0451524935',
        '978-0747532699',
        '978-0553103540',
        '978-0618640157'
      ]
  
      ListOfISBN.forEach(ISBN => {
        store.dispatch(addToReadingList({ ISBN }))
      })
  
      let { readingList } = store.getState().librariesReducer
      expect(readingList).toHaveLength(4)
  
      store.dispatch(removeFromReadingList({ ISBN: ListOfISBN[2] }))
  
      readingList = store.getState().librariesReducer.readingList
  
      expect(readingList).toHaveLength(3)
      expect(readingList).not.toContain(ListOfISBN[2])
    })
  
    it('No se puede eliminar un libro que no esté en la lista de lectura', () => {
      const ISBN = '978-0618640157'
  
      store.dispatch(addToReadingList({ ISBN }))
  
      let { readingList } = store.getState().librariesReducer
      expect(readingList).toHaveLength(1)
  
      store.dispatch(
        removeFromReadingList({ ISBN: '978-0618640158' })
      )
  
      readingList = store.getState().librariesReducer.readingList
      expect(readingList).toHaveLength(1)
    })
  })

  describe('Establecer cantidad de libros filtrados', () => {
    it('cantidad 5', () => {
      store.dispatch(setCountBooksFilters({ countBookFiltered: 5 }))

      let { filterForGenre } = store.getState().librariesReducer.countBooks

      expect(filterForGenre).toBe(5)
    })

    it('no se puede asignar un número menor que 0', () => {
      store.dispatch(setCountBooksFilters({ countBookFiltered: -5 }))

      let { filterForGenre } = store.getState().librariesReducer.countBooks

      expect(filterForGenre).toBe(0)
    })
  })
})
