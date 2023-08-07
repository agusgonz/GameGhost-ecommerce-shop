import Image from "next/image"
import Link from "next/link"
import { FC } from "react"

interface CircleProps {
	src: string
	name: string
	href: string
}

const Circle: FC<CircleProps> = ({ src, name, href }) => {
	return (
		<Link href={href}>
			<div className="w-32 h-32 border-2 border-_white relative rounded-full overflow-hidden flex items-center justify-center">
				<Image
					src={src}
					alt="Category"
					fill
					className="object-cover"
					sizes="25vw"
				/>
			</div>
			<p className="text-center text-sm text-_whborder-_white">
				{name}
			</p>
		</Link>
	)
}
export default Circle
