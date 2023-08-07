import { FC } from "react"
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "./ui/Avatar"

interface AvatarIconProps
	extends React.HTMLAttributes<HTMLDivElement> {
	image: string
	isBig?: boolean
}

const AvatarIcon: FC<AvatarIconProps> = ({
	image,
	isBig,
}) => {
	return (
		<Avatar
			className={`${
				isBig ? "h-40 w-40" : "h-6 w-6"
			} border-2 border-_blue`}
		>
			<AvatarImage src={image ? image : "/default.jpg"} />
			<AvatarFallback>Avatar Icon</AvatarFallback>
		</Avatar>
	)
}
export default AvatarIcon
