"use client"
import { X } from "lucide-react"
import { Button } from "../ui/Button"

import SignUp from "./SignUp"
import SignIn from "./SignIn"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store/store"
import { close } from "@/store/slices/isModalOpen"
import {
	setSignUpModalTrue,
	setSignUpModalFalse,
} from "@/store/slices/isSignUpModal"
import { useEffect } from "react"
import AuthButton from "./AuthButton"

const Modal = ({}) => {
	const isModalOpen = useSelector(
		(state: RootState) => state.isModalOpen.value
	)
	const isSignUpModal = useSelector(
		(state: RootState) => state.isSignUpModal.value
	)
	const dispatch = useDispatch()

	useEffect(() => {
		if (isModalOpen) {
			document.body.style.position = "fixed"
		} else {
			document.body.style.position = ""
		}
	}, [isModalOpen])

	if (!isModalOpen) {
		return null
	}

	function closeModal() {
		dispatch(close())
		dispatch(setSignUpModalFalse())
	}

	return (
		<div className="absolute left-0 top-0 w-full h-screen z-20">
			<div
				className="w-full h-full bg-_darkBlue absolute opacity-70"
				onClick={closeModal}
			></div>
			<div className="w-full h-full flex justify-center items-center content-center text-white ">
				<div className="w-2/3 h-auto bg-_green z-40 p-2 rounded-sm">
					<Button
						variant={"ghost"}
						size={"sm"}
						onClick={closeModal}
					>
						<X className="w-6 h-6" />
					</Button>
					<div className="p-2">
						{isSignUpModal ? <SignUp /> : <SignIn />}
					</div>
					<AuthButton />
				</div>
			</div>
		</div>
	)
}
export default Modal
