import { Category } from "product"
import React, { Component, FC } from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Image from "next/image"
import SliderCard from "./SliderCard"
import AddToCartButton from "../ProductPage/AddToCartButton"
import {
	ArrowBigLeft,
	ArrowBigRight,
	ArrowLeftCircle,
	ArrowRightCircle,
} from "lucide-react"
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
	const settings = {
		infinite: true,
		speed: 500,
		// autoplay: true,
		// autoplaySpeed: 3000,
		slidesToShow: 5,
		slidesToScroll: 5,
		pauseOnHover: true,
		nextArrow: <CustomNextArrow />,
		prevArrow: <CustomPrevArrow />,
		responsive: [
			{
				breakpoint: 1450,
				settings: {
					slidesToShow: 4,
					slidesToScroll: 4,
					infinite: true,
				},
			},
			{
				breakpoint: 1150,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
					infinite: true,
				},
			},
			{
				breakpoint: 850,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
					infinite: true,
				},
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					infinite: true,
				},
			},
		],
	}

	return (
		<div className="w-full mb-8">
			<h2 className="py-2 text-2xl">{category.name}</h2>
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
