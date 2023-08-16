import AvatarIcon from "@/components/AvatarIcon"
import { FC } from "react"

interface DescriptionSectionProps {
	description: string
	seller: {
		name: string
		image: string
	}
}

const DescriptionSection: FC<DescriptionSectionProps> = ({
	description,
	seller,
}) => {
	return (
		<div>
			<p className="text-xl pb-1">About this product: </p>
			<p className="pl-2">{description}</p>
		</div>
	)
}
export default DescriptionSection
