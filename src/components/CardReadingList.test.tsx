import { fireEvent, render } from '@testing-library/react'
import { library } from '../../books.json'
import { CardReadingList } from './CardReadingList'

describe('CardReadingList componente', () => {
  const removeBookOfList = jest.fn()

  it('El libro se saca de la lista de lectura', () => {
    const CardReadingListRender = render(
      <CardReadingList
        book={library[0].book}
        removeBookOfList={removeBookOfList}
      />
    )

    const buttonCard = CardReadingListRender.getByRole('button',
      { name: 'Sacar de la lista' }
    )
    fireEvent.click(buttonCard)
    
    expect(removeBookOfList).toHaveBeenCalledTimes(1)
  })
})
