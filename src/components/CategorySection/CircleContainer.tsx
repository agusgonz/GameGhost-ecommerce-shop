"use client"
import { FC } from "react"
import Circle from "./Circle"
import { useWindowSize } from "@/hooks/useWindowSize"

interface CircleContainerProps {}

const categories = [
	{
		name: "PC's",
		src: "/categories/pc.jpg",
	},
	{
		name: "Smartphones",
		src: "/categories/smartphones.jpg",
	},
	{
		name: "Accessories",
		src: "/categories/accessories.jpg",
	},
	{
		name: "Accessories1",
		src: "/categories/accessories.jpg",
	},
	{
		name: "Accessories2",
		src: "/categories/accessories.jpg",
	},
	{
		name: "More",
		src: "/categories/more.jpg",
	},
]

const CircleContainer: FC<CircleContainerProps> = ({}) => {
	const size = useWindowSize()

	return (
		<div className="grid grid-flow-col grid-rows-2 sm:grid-rows-none place-items-center gap-4">
			{categories.map((category, i) => {
				if (
					!size.windowWidth ||
					(size.windowWidth <= 1100 && i > 3)
				) {
					return
				}

				return (
					<Circle
						key={category.name}
						name={category.name}
						src={category.src}
						href=""
					/>
				)
			})}
		</div>
	)
}
export default CircleContainer