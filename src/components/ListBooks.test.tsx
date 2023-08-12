import { render, within } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '../store'
import { library } from '../../books.json'
import { ListBooks } from './ListBooks'

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <Provider store={store}>
    { children }
  </Provider>
)

describe('ListBooks componente', () => {
  it('renderiza todos los libros', () => {
    const listBooksRendered = render(
      <ListBooks />,
      {
        wrapper
      }
    )

    const constainerListBooks = listBooksRendered.getByRole('list')
    const listBooks = within(constainerListBooks).getAllByRole('listitem')
    expect(listBooks).toHaveLength(library.length)
  })
})
