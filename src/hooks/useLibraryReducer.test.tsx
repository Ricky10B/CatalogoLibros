import { renderHook, act } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '../store'
import { useLibraryReducer } from './useLibraryReducer'

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <Provider store={store}>{children}</Provider>
)

describe('useLibraryReducer', () => {
  it('añadir libro a la lista de lectura', () => {
    const { result } = renderHook(() => (
      useLibraryReducer()
    ), {
      wrapper
    })

    const ISBN = '978-0618640157'

    act(() => {
      result.current.addBookToReadingList({ ISBN })
    })

    const { readingList } = store.getState().librariesReducer

    expect(readingList).toHaveLength(1)
    expect(readingList).toContain(ISBN)
  })

  it('eliminar libro de la lista de lectura', () => {
    const { result } = renderHook(() => (
      useLibraryReducer()
    ), {
      wrapper
    })

    const ISBN = '978-0618640157'

    act(() => {
      result.current.addBookToReadingList({ ISBN })
      result.current.removeBookFromReadingList({ ISBN })
    })

    const { readingList } = store.getState().librariesReducer

    expect(readingList).toHaveLength(0)
    expect(readingList).not.toContain(ISBN)
  })

  it('no se puede eliminar un libro que no existe de la lista de lectura', () => {
    const { result } = renderHook(() => (
      useLibraryReducer()
    ), {
      wrapper
    })

    const ISBN = '978-0618640157'

    act(() => {
      result.current.addBookToReadingList({ ISBN })
      result.current.removeBookFromReadingList({ ISBN: '978-0618640158' })
    })

    const { readingList } = store.getState().librariesReducer

    expect(readingList).toHaveLength(1)
    expect(readingList).toContain(ISBN)
  })

  it('establecer la cantidad de libros filtrados', () => {
    const { result } = renderHook(() => (
      useLibraryReducer()
    ), {
      wrapper
    })

    act(() => {
      result.current.handleCountBooksFilters({ countBookFiltered: 5 })
    })

    let { filterForGenre } = store.getState().librariesReducer.countBooks
    expect(filterForGenre).toBe(5)

    act(() => {
      result.current.handleCountBooksFilters({ countBookFiltered: -5 })
    })

    filterForGenre = store.getState().librariesReducer.countBooks.filterForGenre
    expect(filterForGenre).toBe(0)
  })
})
