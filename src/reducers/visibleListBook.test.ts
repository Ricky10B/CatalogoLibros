import { store } from '../store'
import {
  changeVisibleSection,
  changeVisibleListBook
} from './visibleListBook'

describe('visibleListBook reducer', () => {
  it('cambia el estado a verdadero en la vista de la seccion y la lista de libros', () => {
    let {
      isVisibleSection,
      isVisibleListBook
    } = store.getState().visibleListBookReducer

    expect(isVisibleSection).toBeFalsy()
    expect(isVisibleListBook).toBeFalsy()

    store.dispatch(changeVisibleSection({ visible: true }))
    store.dispatch(changeVisibleListBook({ visible: true }))

    isVisibleSection = store.getState().visibleListBookReducer.isVisibleSection
    isVisibleListBook = store.getState().visibleListBookReducer.isVisibleListBook

    expect(isVisibleSection).toBeTruthy()
    expect(isVisibleListBook).toBeTruthy()
  })

  it('la seccion se hace visible y luego no', () => {
    store.dispatch(changeVisibleSection({ visible: true }))

    let {
      isVisibleSection
    } = store.getState().visibleListBookReducer

    expect(isVisibleSection).toBeTruthy()

    store.dispatch(changeVisibleSection({ visible: false }))

    isVisibleSection = store.getState().visibleListBookReducer.isVisibleSection
    expect(isVisibleSection).toBeFalsy()
  })

  it('la lista de libros es visible y luego no', () => {
    store.dispatch(changeVisibleListBook({ visible: true }))

    let {
      isVisibleListBook
    } = store.getState().visibleListBookReducer

    expect(isVisibleListBook).toBeTruthy()

    store.dispatch(changeVisibleListBook({ visible: false }))

    isVisibleListBook = store.getState().visibleListBookReducer.isVisibleListBook
    expect(isVisibleListBook).toBeFalsy()
  })
})
