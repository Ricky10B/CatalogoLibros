import { renderHook } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '../store'
import { useVisibleListBook } from './useVisibleListBook'
import { act } from 'react-dom/test-utils'

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <Provider store={store}>{ children }</Provider>
)

describe('useVisibleListBook', () => {
  beforeEach(() => {
    const { result } = renderHook(() => (
      useVisibleListBook()
    ), {
      wrapper
    })

    act(() => {
      result.current.setVisible({ isSection: true, visible: false })
      result.current.setVisible({ isSection: false, visible: false })
    })
  })

  it('Mostrar la sección que contiene la lista de lectura', () => {
    const { result } = renderHook(() => (
      useVisibleListBook()
    ), {
      wrapper
    })

    act(() => {
      result.current.setVisible({ isSection: true, visible: true })
    })

    const {
      isVisibleSection,
      isVisibleListBook
    } = store.getState().visibleListBookReducer
    expect(isVisibleSection).toBeTruthy()
    expect(isVisibleListBook).toBeFalsy()
  })

  it('Mostrar la lista de lectura', () => {
    const { result } = renderHook(() => (
      useVisibleListBook()
    ), {
      wrapper
    })

    act(() => {
      result.current.setVisible({ isSection: false, visible: true })
    })

    const {
      isVisibleListBook,
      isVisibleSection
    } = store.getState().visibleListBookReducer
    expect(isVisibleListBook).toBeTruthy()
    expect(isVisibleSection).toBeFalsy()
  })

  it('Mostrar y ocultar la sección y la lista de lectura', () => {
    const { result } = renderHook(() => (
      useVisibleListBook()
    ), {
      wrapper
    })

    act(() => {
      result.current.setVisible({ isSection: true, visible: true })
      result.current.setVisible({ isSection: false, visible: true })
    })

    let {
      isVisibleListBook,
      isVisibleSection
    } = store.getState().visibleListBookReducer

    expect(isVisibleListBook).toBeTruthy()
    expect(isVisibleSection).toBeTruthy()

    act(() => {
      result.current.setVisible({ isSection: true, visible: false })
      result.current.setVisible({ isSection: false, visible: false })
    })

    let { visibleListBookReducer } = store.getState()

    expect(visibleListBookReducer.isVisibleListBook).toBeFalsy()
    expect(visibleListBookReducer.isVisibleSection).toBeFalsy()
  })
})
