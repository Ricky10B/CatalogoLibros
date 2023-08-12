import { setNewGenre } from './filters'
import { store } from '../store'

describe('Filters reducer', () => {
  let filterGenre = {}

  beforeEach(() => {
    filterGenre = store.getState().filtersReducer
    expect(filterGenre).toEqual({ filterGenre: '' })
  })

  it('El estado enviado es un string vacío', () => {
    store.dispatch(setNewGenre({ filterGenre: '' }))
    
    filterGenre = store.getState().filtersReducer
    expect(filterGenre).toEqual({ filterGenre: '' })
  })

  it('Editando estado con filtro de terror', () => {
    const filterGenreSelected = 'Terror'
    store.dispatch(
      setNewGenre({
        filterGenre: filterGenreSelected
      })
    )

    filterGenre = store.getState().filtersReducer
    expect(filterGenre).toEqual({
      filterGenre: filterGenreSelected
    })
  })
})
