import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Pokemon } from '../../entities/Pokemon'

export interface ListState {
  data: Array<Pokemon>,
	next?: string,
	lastCursor: number
}

const initialState: ListState = {
  data: [],
	next: undefined,
	lastCursor: 0
}

export const listSlice = createSlice({
	name: 'list',
	initialState,
	reducers: {
		// Redux Toolkit allows us to write "mutating" logic in reducers. It
		// doesn't actually mutate the state because it uses the Immer library,
		// which detects changes to a "draft state" and produces a brand new
		// immutable state based off those changes
		addElement: (state, action: PayloadAction<Pokemon>) => {
			state.data.push(action.payload)
		},
		addManyElements: (state, action: PayloadAction<Array<Pokemon>>) => {
			state.data.push(...action.payload)
		},
		setNext: (state, action: PayloadAction<string>) => {
			state.next = action.payload
		},
		setLastCursor: (state, action: PayloadAction<number>) => {
			state.lastCursor = action.payload
		}
	}
})

// Action creators are generated for each case reducer function
export const { addElement, addManyElements, setNext, setLastCursor } = listSlice.actions

export default listSlice.reducer