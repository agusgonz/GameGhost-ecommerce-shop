import React, { FC } from "react"
import { Button } from "../ui/Button"
import { Heart } from "lucide-react"

interface AddToLikedButtonProps
	extends React.HTMLAttributes<HTMLButtonElement> {}

const AddToLikedButton: FC<
	AddToLikedButtonProps
> = ({}) => {
	return (
		<Button
			variant={"custom"}
			className="h-11 bg-_blue "
		>
			<Heart className="w-5 h-5" />
		</Button>
	)
}
export default AddToLikedButton
