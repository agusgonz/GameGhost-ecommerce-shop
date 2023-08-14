"use client"
import { FC, useState } from "react"
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "./ui/Avatar"
import Spinner from "./Spinner"

interface AvatarIconProps
	extends React.HTMLAttributes<HTMLDivElement> {
	image: string
	isBig?: boolean
}

const AvatarIcon: FC<AvatarIconProps> = ({
	image,
	isBig,
}) => {
	const [imageLoaded, setImageLoaded] = useState(false)

	return (
		<Avatar
			className={`${
				isBig ? "h-40 w-40" : "h-6 w-6"
			} border-2 border-_blue bg-_blue`}
		>
			{!imageLoaded && (
				<div className="w-full h-full flex items-center justify-center">
					<Spinner />
				</div>
			)}

			<AvatarImage
				src={image ? image : "/default.jpg"}
				className={`object-cover ${
					imageLoaded ? "w-full " : "w-[1px] h-[1px]"
				}`}
				onLoad={() => setImageLoaded(true)}
			/>
		</Avatar>
	)
}
export default AvatarIcon
