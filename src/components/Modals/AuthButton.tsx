import React, { ButtonHTMLAttributes } from "react"
import { Button } from "../ui/Button"
import { signIn } from "next-auth/react"

import { FC } from "react"
import { capitalizeString, cn } from "@/utils/utils"

interface AuthButtonProps
	extends React.HTMLAttributes<HTMLButtonElement> {
	name: string
}

const AuthButton: FC<AuthButtonProps> = ({
	className,
	name,
}) => {
	return (
		<Button
			variant={"none"}
			onClick={() => signIn(name)}
			size={"lg"}
			className={cn(
				className,
				"border-2 border-_white flex-grow"
			)}
		>
			{capitalizeString(name)}
		</Button>
	)
}
export default AuthButton
