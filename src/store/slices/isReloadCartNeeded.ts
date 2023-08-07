import { createSlice } from "@reduxjs/toolkit"

export const isReloadCartNeeded = createSlice({
	name: "isReloadCartNeeded",
	initialState: {
		value: false,
	},
	reducers: {
		reloadCart: state => {
			state.value = true
		},
		setReloadCartFalse: state => {
			state.value = false
		},
	},
})

// Action creators are generated for each case reducer function
export const { reloadCart, setReloadCartFalse } =
	isReloadCartNeeded.actions

export default isReloadCartNeeded.reducer
