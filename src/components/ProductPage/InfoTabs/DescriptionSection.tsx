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
		<div className="px-2 md:px-0 md:w-5/6 mx-auto">
			<p className="text-xl pb-1">About this product: </p>
			<p className="">{description}</p>
		</div>
	)
}
export default DescriptionSection
