"use client"
import { FC } from "react"
import Circle from "./Circle"
import { useWindowSize } from "@/hooks/useWindowSize"
import FadeInAnimation from "../FadeInAnimation"

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
		name: "Audio",
		src: "/categories/audio.jpg",
	},
	{
		name: "Smart Home Devices",
		src: "/categories/home.jpg",
	},
	{
		name: "More",
		src: "/categories/more.jpg",
	},
]

const CircleContainer: FC<CircleContainerProps> = ({}) => {
	const size = useWindowSize()

	return (
		<div className="flex flex-col gap-8 lg:gap-12">
			<hr className="border-b border-_green" />
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
			<hr className="border-b border-_green" />
		</div>
	)
}
export default CircleContainer
