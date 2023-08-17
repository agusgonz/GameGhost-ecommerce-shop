import { Category } from "store"
import React, { FC } from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import SliderCard from "./SliderCard"
import {
	CustomNextArrow,
	CustomPrevArrow,
} from "./CustomArrows"

interface SliderContainerProps {
	category: Category
}

const SliderContainer: FC<SliderContainerProps> = ({
	category,
}) => {
	// console.log(
	// 	category.name + ": " + category.products.length
	// )

	let breakpoints: any[] = []
	const producsQty = category.products.length

	if (producsQty >= 1) {
		breakpoints.push({
			breakpoint: 600,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				infinite: true,
			},
		})
	}

	if (producsQty >= 2) {
		breakpoints.push({
			breakpoint: 850,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 2,
				infinite: true,
			},
		})
	}

	if (producsQty >= 3) {
		breakpoints.push({
			breakpoint: 1150,
			settings: {
				slidesToShow: 3,
				slidesToScroll: 3,
				infinite: true,
			},
		})
	}

	if (producsQty >= 4) {
		breakpoints.push({
			breakpoint: 99999,
			settings: {
				slidesToShow: 4,
				slidesToScroll: 4,
				infinite: true,
			},
		})
	}

	const settings = {
		infinite: true,
		speed: 500,
		slidesToShow: producsQty,
		slidesToScroll: producsQty,
		pauseOnHover: true,
		nextArrow: <CustomNextArrow />,
		prevArrow: <CustomPrevArrow />,
		responsive: breakpoints,
	}

	if (category.name == "Tv's") {
		console.log(breakpoints)
		console.log(settings)
	}

	return (
		<div className="w-full ">
			<h2 className="pb-8 text-3xl">{category.name}</h2>
			<div className="px-6">
				<Slider
					{...settings}
					className="text-_white"
				>
					{category.products.map(product => {
						return (
							<SliderCard
								key={product.id}
								product={product}
							/>
						)
					})}
				</Slider>
			</div>
		</div>
	)
}
export default SliderContainer
