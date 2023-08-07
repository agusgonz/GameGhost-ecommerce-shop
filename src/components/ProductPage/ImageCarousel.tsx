import Image from "next/image"
import { ProductImage } from "product"
import { FC } from "react"
import Slider from "react-slick"

import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

interface ImageCarouselProps {
	images: ProductImage[]
	sm?: boolean
}

const ImageCarousel: FC<ImageCarouselProps> = ({
	images,
	sm,
}) => {
	const settings = {
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		pauseOnHover: true,
		fade: true,
		adaptiveHeight: true,
		arrows: false,
		dotsClass: `slick-dots slick-thumb !static  !flex  ${
			sm ? "justify-start" : "justify-center"
		} [&>li]:!w-20 [&>li]:!h-20 flex-wrap`,
		dots: true,
		customPaging: (i: any) => {
			if (images[i]) {
				return (
					<Image
						className="p-1 justify-between object-contain"
						key={images[i].id}
						alt="Product Image"
						src={`${images[i].secure_url}`}
						fill
						sizes="20vw"
					/>
				)
			} else {
				return <></>
			}
		},
	}

	return (
		<Slider
			{...settings}
			className="w-full h-full !flex flex-col justify-center gap-3"
		>
			{images.map((image: ProductImage) => {
				return (
					<div
						className="relative w-[300px] h-[300px]"
						key={image.id}
					>
						<Image
							className=" object-contain"
							alt="Product Image"
							src={`${image.secure_url}`}
							fill
							sizes="50vw"
						/>
					</div>
				)
			})}
		</Slider>
	)
}

export default ImageCarousel
