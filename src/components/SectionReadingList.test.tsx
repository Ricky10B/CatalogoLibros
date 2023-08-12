import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '../store'
import { SectionReadingList } from './SectionReadingList'

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <Provider store={store} >
    { children }
  </Provider>
)

describe('SectionReadingList componente', () => {
  it('La sección no se muestra al usuario', () => {
    const sectionReadingListRender = render(
      <SectionReadingList />,
      {
        wrapper
      }
    )

    const sectionReadingListElement = sectionReadingListRender.container.querySelector('section')
    expect(sectionReadingListElement).toHaveClass('hidden')
    expect(sectionReadingListElement?.firstElementChild).toHaveClass('-right-full')

    const textoNoHayLibros = sectionReadingListRender.getByText('No hay libros en la lista de lectura')
    expect(textoNoHayLibros).toBeInTheDocument()
  })
})
