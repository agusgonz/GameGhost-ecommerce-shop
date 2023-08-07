import Image from "next/image"
import Link from "next/link"
import { Product } from "product"
import { FC, useState } from "react"
import Loading from "../Loading"

interface SliderCardProps {
	product: Product
}

const SliderCard: FC<SliderCardProps> = ({ product }) => {
	const [imageLoaded, setImageLoaded] = useState(false)

	return (
		<section
			className="w-60 h-80 border-2 rounded-sm border-_blue mx-auto "
			key={product.id}
		>
			<Link href={`/product/${product.id}`}>
				<div className="h-2/3 w-full  p-2 bg-_blue">
					<div className="relative overflow-hidden w-full h-full flex justify-center  items-center">
						<Image
							src={product.productImages[0].secure_url}
							className={` ${
								!imageLoaded ? "w-0" : "w-full"
							} object-contain`}
							alt="Product Image"
							fill
							sizes="25vw"
							loading="lazy"
							onLoadingComplete={() => setImageLoaded(true)}
						/>
						{!imageLoaded ? <Loading /> : null}
					</div>
				</div>
				<hr className="border-t-2 border-_blue" />
				<div className="h-1/3 w-full  p-2 flex flex-col gap-2">
					<p className="font-bold text-2xl">{`$ ${product.price}`}</p>
					<h3 className="truncate text-lg flex items-center">
						{product.title}
					</h3>
					<p className=" truncate text-sm text-_green">
						{product.description}
					</p>
				</div>
			</Link>
		</section>
	)
}
export default SliderCard
