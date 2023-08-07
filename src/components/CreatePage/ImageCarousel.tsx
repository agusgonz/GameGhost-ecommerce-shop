import Image from "next/image"
import { ProductImage } from "product"
import { FC } from "react"
import Slider from "react-slick"

import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { ImageData } from "@/app/(pages)/product/create/page"
import { Button } from "../ui/Button"
import { X } from "lucide-react"

interface ImageCarouselProps {
	images: ImageData[]
	removeImageHandler: (id: string) => void
}

const ImageCarousel: FC<ImageCarouselProps> = ({
	images,
	removeImageHandler,
}) => {
	const settings = {
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		pauseOnHover: true,
		arrows: false,
		dots: true,
		adaptiveHeight: true,
		// fade: true,
		dotsClass:
			"slick-dots slick-thumb !static  !flex justify-center [&>li]:!w-20 [&>li]:!h-20 flex-wrap",
		customPaging: (i: any) => {
			if (images[i]) {
				return (
					<Image
						key={images[i].id}
						alt="Product Image"
						src={`${images[i].data}`}
						className="p-1 object-contain"
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
			{images.map((image: ImageData) => {
				return (
					<div
						className="relative h-[400px] w-[300px]"
						key={image.id}
					>
						<Button
							className="absolute top-3 right-3 bg-_white text-_darkBlue z-10"
							variant={"none"}
							size={"sm"}
							type="button"
							onClick={() => {
								removeImageHandler(image.id)
							}}
						>
							<X className="w-4 h-4" />
						</Button>
						<Image
							className="w-full h-full object-contain"
							alt="Product Image"
							src={`${image.data}`}
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
