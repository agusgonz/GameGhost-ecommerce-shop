import { createSlice } from "@reduxjs/toolkit"

export const isSignUpModal = createSlice({
	name: "isSignUpModal",
	initialState: {
		value: false,
	},
	reducers: {
		setSignUpModalTrue: state => {
			state.value = true
		},
		setSignUpModalFalse: state => {
			state.value = false
		},
	},
})

// Action creators are generated for each case reducer function
export const { setSignUpModalTrue, setSignUpModalFalse } =
	isSignUpModal.actions

export default isSignUpModal.reducer
