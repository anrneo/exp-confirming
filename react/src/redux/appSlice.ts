import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from './store'

// Define a type for the slice state
interface appState {
    products: any
    createdSdtore: any,
    nameStore: string
}

// Define the initial state using that type
const initialState: appState = {
    products : null,
    createdSdtore : null,
    nameStore: ''
}

export const ruaSlice = createSlice({
  name: 'data',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setProducts: (state, action) => {
        state.products = action.payload;
    },
    setStore: (state, action) => {
      state.createdSdtore = action.payload;
  },
  setNameStore: (state, action) => {
    state.nameStore = action.payload;
}
    
  }
})

export const { setProducts , setStore, setNameStore} = ruaSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selecProducts = (state: RootState) => state.data.products
export const selecCreatedStore = (state: RootState) => state.data.createdSdtore
export const selectNameStore = (state: RootState) => state.data.nameStore


export default ruaSlice.reducer