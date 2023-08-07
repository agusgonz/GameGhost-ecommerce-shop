import { getAuthSession } from "@/libs/auth-options"
import { cn } from "@/utils/utils"
import { Sparkles } from "lucide-react"
import React, { FC } from "react"

interface WelcomeUserProps
	extends React.HTMLProps<HTMLDivElement> {}

const WelcomeUser: FC<WelcomeUserProps> = async ({
	className,
}) => {
	const session = await getAuthSession()
	return (
		<div
			className={cn(
				" text-lg  flex items-center gap-2 italic text-_green",
				className
			)}
		>
			<p>
				Welcome{" "}
				{session?.user.name ? session?.user.name : null}
			</p>{" "}
			<Sparkles className="w-4 h-4" />
		</div>
	)
}
export default WelcomeUser
