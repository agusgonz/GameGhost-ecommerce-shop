import { Star } from "lucide-react"
import { FC } from "react"

interface RatePrevProps {
	avrStars: number
	quantity: number
}

const RatePrev: FC<RatePrevProps> = ({
	avrStars,
	quantity,
}) => {
	return (
		<div className="flex gap-2 text-base  items-center ">
			<div className="font-bold text-_green flex gap-1  items-center">
				{avrStars} <Star className="w-4 h-4" />
			</div>
			<div className="text-sm">{quantity} Reviews</div>
		</div>
	)
}
export default RatePrev
