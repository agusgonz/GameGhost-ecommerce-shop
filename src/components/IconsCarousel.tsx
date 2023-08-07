"use client"
import {
	Camera,
	Dices,
	Gamepad2,
	Ghost,
	Headphones,
	Monitor,
	Printer,
	Smartphone,
	Tv,
	Webcam,
} from "lucide-react"
import { FC } from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

interface IconsCarouselProps {}

const IconsCarousel: FC<IconsCarouselProps> = ({}) => {
	const settings = {
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		pauseOnHover: false,
		arrows: false,
		dots: false,
		autoplay: true,
		autoplaySpeed: 3000,
		cssEase: "ease",

		draggable: false,
	}

	return (
		<Slider
			{...settings}
			className="w-full h-full !flex justify-center items-center"
		>
			<Ghost className=" w-full h-full" />
			<Gamepad2 className=" w-full h-full" />
			<Smartphone className=" w-full h-full" />
			<Headphones className=" w-full h-full" />
			<Monitor className=" w-full h-full" />
			<Camera className=" w-full h-full" />
			<Printer className=" w-full h-full" />
		</Slider>
	)
}
export default IconsCarousel
