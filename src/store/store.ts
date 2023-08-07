import { configureStore } from "@reduxjs/toolkit"
import isModalOpen from "./slices/isModalOpen"
import isSignUpModal from "./slices/isSignUpModal"
import isReloadCartNeeded from "./slices/isReloadCartNeeded"

export const store = configureStore({
	reducer: {
		isModalOpen: isModalOpen,
		isSignUpModal: isSignUpModal,
		isReloadCartNeeded: isReloadCartNeeded,
	},
})

export type RootState = ReturnType<typeof store.getState>
