import { renderHook, act } from '@testing-library/react'
import { Provider } from 'react-redux'
import { library } from '../../books.json'
import { store } from '../store'
import { useFilters } from './useFiltersActions'

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <Provider store={store}>{ children }</Provider>
)

describe('useFilters hook', () => {
  it('Filtrar libros por categoria terror', () => {
    const { result } = renderHook(() => (
      useFilters()
    ), { wrapper })

    act(() => {
      result.current.handleNewGenre({ genre: 'Terror' })
    })

    expect(result.current.filterGenre).toBe('Terror')
  })

  it('Los libros deben ser por el género filtrado', () => {
    const { result } = renderHook(() => (
      useFilters()
    ), { wrapper })

    act(() => {
      result.current.handleNewGenre({ genre: 'Ciencia ficción' })
    })

    expect(result.current.filterGenre).toBe('Ciencia ficción')

    const librariesFiltered = result.current.filterLibraries(library)

    librariesFiltered.forEach(({ book }) => {
      expect(book.genre).toBe('Ciencia ficción')
    })
  })

  it('Filtrar por algún género y luego mostrarlos todos', () => {
    const { result } = renderHook(() => (
      useFilters()
    ), { wrapper })

    act(() => {
      result.current.handleNewGenre({ genre: 'Ciencia ficción' })
      result.current.handleNewGenre({ genre: '' })
    })

    const librariesFiltered = result.current.filterLibraries(library)

    expect(librariesFiltered).toHaveLength(library.length)
  })
})
