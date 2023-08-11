"use client, useState"
import { FC, FormEvent, useState } from "react"
import { Textarea } from "../../ui/Textarea"
import { Button } from "../../ui/Button"
import { Star } from "lucide-react"

interface RateSectionProps {
	addReviewHandler: (
		stars: number | undefined,
		comment: string | undefined
	) => void
}

const RateSection: FC<RateSectionProps> = ({
	addReviewHandler,
}) => {
	const [stars, setStars] = useState<number>()
	const [comment, setComment] = useState<string>("")

	console.log(stars, comment)

	let starButtons = []

	for (let i = 1; i < 6; i++) {
		starButtons.push(
			<button
				type="button"
				onClick={() => setStars(i)}
				key={i}
			>
				<Star
					className={`w-8 h-8 lg:w-10 lg:h-10 ${
						stars && i <= stars
							? "text-_green"
							: "text-_green/20"
					}`}
				/>
			</button>
		)
	}

	const submitHandler = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		addReviewHandler(stars, comment)
		setStars(undefined)
		setComment("")
	}

	return (
		<form
			className="flex flex-col gap-4 md:mb-0 py-4 "
			onSubmit={e => submitHandler(e)}
		>
			<div className="flex gap-4 justify-center items-center">
				{starButtons}
			</div>
			<Textarea
				onChange={e => setComment(e.target.value)}
				placeholder="Add a comment..."
				value={comment}
			/>
			<Button variant={"custom"}>Rate this product</Button>
		</form>
	)
}
export default RateSection
