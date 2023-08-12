import { render, fireEvent } from '@testing-library/react'
import { library } from '../../books.json'
import { CardBook } from './CardBook'

describe('CardBook componente', () => {
  const addBookToReadingList = jest.fn()
  const removeBookFromReadingList = jest.fn()

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('El libro no pertenece a la lista de lectura', () => {
    const readingList: string[] = []

    const cardBookRender = render(
      <CardBook
        book={library[0].book}
        readingList={readingList}
        addBookToReadingList={addBookToReadingList}
        removeBookFromReadingList={removeBookFromReadingList}
      />
    )

    const containerInfoBook = cardBookRender.getByRole('listitem').querySelector('#containerInfoBook')
    expect(containerInfoBook).not.toHaveClass('opacity-50')

    const buttonCard = cardBookRender.getByRole('button')
    expect(buttonCard).toHaveClass('bg-[var(--color-btn-cards)]')
    expect(buttonCard).toHaveClass('hover:bg-[var(--color-btn-cards-hover)]')

    expect(buttonCard.textContent).toBe('Agregar a la lista')
  })

  it('El libro pertenece a la lista de lectura', () => {
    const readingList = ['978-0618640157']

    const cardBookRender = render(
      <CardBook
        book={library[0].book}
        readingList={readingList}
        addBookToReadingList={addBookToReadingList}
        removeBookFromReadingList={removeBookFromReadingList}
      />
    )

    const containerInfoBook = cardBookRender.getByRole('listitem').querySelector('#containerInfoBook')
    expect(containerInfoBook).toHaveClass('opacity-50')

    const buttonCard = cardBookRender.getByRole('button')
    expect(buttonCard).toHaveClass('bg-[var(--color-btn-remove-card)]')
    expect(buttonCard).toHaveClass('hover:bg-[var(--color-btn-remove-card-hover)]')

    expect(buttonCard.textContent).toBe('Sacar de la lista')
  })

  it('Agregar el libro a la lista de lectura', () => {
    const readingList: string[] = []

    const cardBookRender = render(
      <CardBook
        book={library[0].book}
        readingList={readingList}
        addBookToReadingList={addBookToReadingList}
        removeBookFromReadingList={removeBookFromReadingList}
      />
    )

    const buttonCardBook = cardBookRender.getByRole('button')

    fireEvent.click(buttonCardBook)

    expect(addBookToReadingList).toHaveBeenCalledTimes(1)
    expect(removeBookFromReadingList).toHaveBeenCalledTimes(0)
  })

  it('Sacar el libro de la lista de lectura', () => {
    const readingList = ['978-0618640157']

    const cardBookRender = render(
      <CardBook
        book={library[0].book}
        readingList={readingList}
        addBookToReadingList={addBookToReadingList}
        removeBookFromReadingList={removeBookFromReadingList}
      />
    )

    const buttonCardBook = cardBookRender.getByRole('button')

    fireEvent.click(buttonCardBook)

    expect(addBookToReadingList).toHaveBeenCalledTimes(0)
    expect(removeBookFromReadingList).toHaveBeenCalledTimes(1)
  })
})
