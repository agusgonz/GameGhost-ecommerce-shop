import { createSlice } from "@reduxjs/toolkit"

export const isModalOpen = createSlice({
	name: "isModalOpen",
	initialState: {
		value: false,
	},
	reducers: {
		open: state => {
			state.value = true
		},
		close: state => {
			state.value = false
		},
	},
})

// Action creators are generated for each case reducer function
export const { open, close } = isModalOpen.actions

export default isModalOpen.reducer
