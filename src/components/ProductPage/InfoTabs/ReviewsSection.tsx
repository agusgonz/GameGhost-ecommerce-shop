"use client"
import { FC, useEffect, useState } from "react"
import AvatarIcon from "../../AvatarIcon"
import { Star } from "lucide-react"
import RateSection from "./RateSection"
import { useToast } from "@/components/ui/use-toast"
import { getReviews } from "@/services/review"
import { addProductReview } from "@/services/review"
import { Review } from "store"

interface ReviewsSectionProps {
	productId: string
}

const ReviewsSection: FC<ReviewsSectionProps> = ({
	productId,
}) => {
	const [reviews, setReviews] = useState<Review[]>([])

	const { toast } = useToast()

	const [reload, setReload] = useState(false)

	useEffect(() => {
		getReviews(productId)
			.then(res => setReviews(res.data))
			.catch(err => {
				toast({
					description: err.response.data,
					variant: "destructive",
				})
			})
		setReload(false)
	}, [reload])

	const addReviewHandler = (
		stars: number | undefined,
		comment: string | undefined
	) => {
		if (!stars || !comment) {
			toast({
				title: "Select an star and add a comment before",
				variant: "advise",
			})
			return
		}

		const data = {
			stars,
			comment,
			productId: productId,
		}

		addProductReview(data)
			.then(res => {
				toast({
					description: res.data,
					variant: "success",
				})
				setReload(true)
			})
			.catch(err => {
				toast({
					description: err.response.data,
					variant: "destructive",
				})
			})
	}

	return (
		<div className=" md:grid md:grid-cols-3 gap-4 justify-start items-start">
			<RateSection addReviewHandler={addReviewHandler} />

			<hr className="border-_blue md:hidden border-t-2" />

			<div className="flex flex-col gap-6 col-span-2 py-4">
				{reviews.length === 0 ? (
					<p>There are no reviews</p>
				) : (
					reviews.map(review => {
						let stars = []

						for (let i = 0; i < review.stars; i++) {
							stars.push(
								<Star
									className="w-6 h-6 text-_green"
									key={i}
								/>
							)
						}

						return (
							<div
								className="flex flex-col gap-2 "
								key={review.id}
							>
								<div className="flex gap-4 items-center">
									<div className="flex gap-2">{stars}</div>
									<div className="flex gap-2">
										<AvatarIcon
											image={review.writer.image}
										/>{" "}
										<p className="text-base">
											{review.writer.name}
										</p>
									</div>
								</div>
								<p>{review.comment}</p>
							</div>
						)
					})
				)}
			</div>
		</div>
	)
}
export default ReviewsSection
