"use client"
import Loading from "@/components/Loading"
import AddToCartButton from "@/components/ProductPage/AddToCartButton"
import AddToLikedButton from "@/components/ProductPage/AddToLikedButton"
import ImageCarousel from "@/components/ProductPage/ImageCarousel"
import InfoTabs from "@/components/ProductPage/InfoTabs"
import RatePrev from "@/components/ProductPage/RatePrev"
import { useToast } from "@/components/ui/use-toast"
import { useWindowSize } from "@/hooks/useWindowSize"
import {
	addProductReview,
	getProduct,
} from "@/services/product"
import Link from "next/link"
import { Product } from "product"
import { FC, useEffect, useState } from "react"

interface pageProps {
	params: { id: string }
}

const page: FC<pageProps> = ({ params }) => {
	const [product, setProduct] = useState<Product>()
	const [productError, setProductError] = useState()
	const { toast } = useToast()
	const { windowWidth, windowHeight } = useWindowSize()

	useEffect(() => {
		getProduct(params.id)
			.then(res => setProduct(res.data))
			.catch(err => {
				toast({
					description: err.response.data,
					variant: "destructive",
				})
				setProductError(err.response.data)
			})
	}, [])

	// console.log(product)

	const addReviewHandler = (
		stars: number | undefined,
		comment: string | undefined
	) => {
		if (!product || !stars || !comment) {
			toast({
				title: "Select an star and add a comment before",
				variant: "advise",
			})
			return
		}

		const data = {
			stars,
			comment,
			productId: product.id,
		}

		addProductReview(data)
			.then(res =>
				toast({
					description: "Thank for your review",
					variant: "success",
				})
			)
			.catch(err => {
				toast({
					description: err.response.data,
					variant: "destructive",
				})
				setProductError(err.response.data)
			})
	}

	const calculateAvrgStars = () => {
		if (!product?.reviews) return 0.0

		const stars = product.reviews.map(
			review => review.stars
		)

		const sum = stars.reduce((a, b) => a + b, 0)
		const avg = sum / stars.length

		return parseFloat(avg.toFixed(1))
	}

	if (product && windowWidth) {
		return (
			<>
				{windowWidth <= 900 ? (
					// Small devices
					<div className="flex flex-col gap-10">
						<div className="flex flex-col gap-3">
							<div className="text-sm">
								<Link href={"/"}>Home</Link>
								<span className="font-bold">{" > "}</span>
								<Link
									href={
										"/category/" + product.category[0].name
									}
								>
									{product.category[0].name}
								</Link>
							</div>
							<div>
								<div className="border-y-2 border-_blue py-2 flex flex-col gap-2">
									<h1 className="text-3xl">
										{product.title}
									</h1>
									<RatePrev
										avrStars={0}
										quantity={0}
									/>

									<div className="text-4xl font-normal">
										<p>{`$ ${product.price}`}</p>
									</div>
								</div>
							</div>
							<div className="max-w-[400px] max-h-[600px]">
								<ImageCarousel
									images={product.productImages}
									sm
								/>
							</div>
							<div className=" flex gap-1 items-center border-t-2 border-_blue pt-2">
								<AddToCartButton productId={params.id} />
								<AddToLikedButton />
							</div>
						</div>
					</div>
				) : (
					// Large devices
					<div className="flex flex-col gap-3">
						<div className="text-sm">
							<Link href={"/"}>Home</Link>
							<span className="font-bold">{" > "}</span>
							<Link
								href={
									"/category/" + product.category[0].name
								}
							>
								{product.category[0].name}
							</Link>
						</div>
						<div className="w-full border-2 h-max border-_blue rounded-sm flex">
							<div className="flex-grow p-3 bg-_blue flex items-center justify-center">
								<div className="w-[440px] max-h-[600px] ">
									<ImageCarousel
										images={product.productImages}
									/>
								</div>
							</div>
							<div className="w-full h-full flex flex-col gap-3 p-3 ">
								<h1 className="text-3xl ">
									{product.title}
								</h1>
								<RatePrev
									avrStars={calculateAvrgStars()}
									quantity={product.reviews.length}
								/>
								<div className="text-4xl font-normal">
									<p>{`$ ${product.price}`}</p>
								</div>
								<div className=" flex gap-1 items-center">
									<AddToCartButton
										className="px-5 lg:px-8"
										productId={params.id}
									/>
									<AddToLikedButton />
								</div>
								<div>
									<p>Stock: {product.stock}</p>
								</div>
							</div>
						</div>
					</div>
				)}
				<InfoTabs
					description={product.description}
					reviews={product.reviews}
					addReviewHandler={addReviewHandler}
				/>
			</>
		)
	} else if (productError) {
		return <div>{productError}</div>
	} else {
		return <Loading />
	}
}
export default page
