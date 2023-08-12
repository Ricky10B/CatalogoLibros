import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface visibleListBook {
  visible: boolean
}

interface InitialStateListBook {
  isVisibleSection: boolean
  isVisibleListBook: boolean
}

const DEFAULT_STATE: InitialStateListBook = {
  isVisibleSection: false,
  isVisibleListBook: false
}

const initialState: InitialStateListBook = (() => {
  const dataStore = localStorage.getItem('__REDUX__STORE__visibleList')
  return dataStore ? JSON.parse(dataStore) : DEFAULT_STATE
})()

export const visibleListReducer = createSlice({
  name: 'visibleList',
  initialState,
  reducers: {
    changeVisibleSection: (state, action: PayloadAction<visibleListBook>) => {
      const { visible } = action.payload

      return {
        ...state,
        isVisibleSection: visible
      }
    },
    changeVisibleListBook: (state, action: PayloadAction<visibleListBook>) => {
      const { visible } = action.payload

      return {
        ...state,
        isVisibleListBook: visible
      }
    }
  }
})

export const {
  changeVisibleSection,
  changeVisibleListBook
} = visibleListReducer.actions

export default visibleListReducer.reducer
