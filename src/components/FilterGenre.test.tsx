import { fireEvent, render, waitFor, act } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '../store'
import { library } from '../../books.json'
import { FilterGenre } from './FilterGenre'

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <Provider store={store}>
    { children }
  </Provider>
)

describe('FilterGenre componente', () => {
  it('Filtrar libros por el género de terror', () => {
    const filterGenreRender = render(
      <FilterGenre />,
      {
        wrapper
      }
    )

    const filterGenre = 'Terror'

    const selectFiltersGenres = filterGenreRender.getByRole('combobox')
    act(() => {
      fireEvent.change(selectFiltersGenres, { target: { value: filterGenre } })
    })

    const optionTerror = filterGenreRender.getByRole('option', { name: filterGenre }) as HTMLOptionElement
    const optionAll = filterGenreRender.getByRole('option', { name: 'Todos' }) as HTMLOptionElement

    expect(optionTerror.selected).toBeTruthy()
    expect(optionAll.selected).toBeFalsy()
    
    waitFor(() => {
      const totalBooksFilterGenre = library.reduce((cont, { book }) => {
        if (book.genre === filterGenre) cont++
        return cont
      }, 0)
  
      const textFilterGenre = filterGenreRender.getByText(/Libros del género Terror/)
      expect(textFilterGenre.querySelector('span')?.textContent).toBe(totalBooksFilterGenre)
      filterGenreRender.debug()
    })
  })

  it('Filtrar por algún género y luego por todos', async () => {
    const filterGenreRender = render(
      <FilterGenre />,
      {
        wrapper
      }
    )

    const selectFiltersGenre = filterGenreRender.getByRole('combobox')
    act(() => {
      fireEvent.change(selectFiltersGenre, { target: { value: 'Zombies' } })
    })

    let optionZombie = filterGenreRender.getByRole('option', { name: 'Zombies' }) as HTMLOptionElement
    let optionTodos = filterGenreRender.getByRole('option', { name: 'Todos' }) as HTMLOptionElement

    expect(optionZombie.selected).toBeTruthy()
    expect(optionTodos.selected).toBeFalsy()

    act(() => {
      fireEvent.change(selectFiltersGenre, { target: { value: '' } })
    })

    optionZombie = filterGenreRender.getByRole('option', { name: 'Zombies' }) as HTMLOptionElement
    optionTodos = filterGenreRender.getByRole('option', { name: 'Todos' }) as HTMLOptionElement

    expect(optionZombie.selected).toBeFalsy()
    expect(optionTodos.selected).toBeTruthy()

    waitFor(() => {
      const cantidadLibrosFiltrados = filterGenreRender.getByText(/Libros del género Zombies/)
      expect(cantidadLibrosFiltrados).not.toBeInTheDocument()
    })
  })
})
