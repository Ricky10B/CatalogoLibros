import { render, act, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '../store'
import { BtnLibro } from './BtnLibro'

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <Provider store={store}>
    { children }
  </Provider>
)

describe('BtnLibro componente', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('Mostrar y ocultar la sección de la lista de lectura y la lista de lectura', async () => {
    const btnLibro = render(<BtnLibro />, {
      wrapper
    })

    const botonLibro = btnLibro.getByRole('button')

    let {
      isVisibleListBook,
      isVisibleSection
    } = store.getState().visibleListBookReducer

    expect(isVisibleListBook).toBeFalsy()
    expect(isVisibleSection).toBeFalsy()

    await act(async () => {
      fireEvent.click(botonLibro)
      await jest.advanceTimersByTimeAsync(0)
    })

    let visibleListBookReducer = store.getState().visibleListBookReducer
    isVisibleListBook = visibleListBookReducer.isVisibleListBook
    isVisibleSection = visibleListBookReducer.isVisibleSection

    expect(isVisibleSection).toBeTruthy()
    expect(isVisibleListBook).toBeTruthy()

    await act(async () => {
      fireEvent.click(botonLibro)
      await jest.advanceTimersByTimeAsync(450)
    })

    visibleListBookReducer = store.getState().visibleListBookReducer
    isVisibleListBook = visibleListBookReducer.isVisibleListBook
    isVisibleSection = visibleListBookReducer.isVisibleSection

    expect(isVisibleListBook).toBeFalsy()
    expect(isVisibleSection).toBeFalsy()
  })
})
