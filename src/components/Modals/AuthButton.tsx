import React from "react"
import { Button } from "../ui/Button"
import { signIn } from "next-auth/react"

export default function AuthButton() {
	return (
		<Button onClick={() => signIn("discord")}>
			Discord
		</Button>
	)
}
