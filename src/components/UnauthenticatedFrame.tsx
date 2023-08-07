import Link from "next/link"
import { FC } from "react"
import { buttonVariants } from "./ui/Button"

interface UnauthenticatedFrameProps
	extends React.HTMLAttributes<HTMLDivElement> {}

const UnauthenticatedFrame: FC<
	UnauthenticatedFrameProps
> = ({}) => {
	return (
		<div className="flex flex-col gap-2 justify-center items-center pt-5">
			<h1>You have to be authenticated to see this page</h1>
			<Link
				className={
					buttonVariants({
						variant: "custom",
						size: "sm",
					}) + " bg-_green"
				}
				href={"/"}
			>
				Return Home
			</Link>
		</div>
	)
}
export default UnauthenticatedFrame
