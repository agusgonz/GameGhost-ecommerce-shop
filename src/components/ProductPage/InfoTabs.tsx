import {
	Tabs,
	TabsList,
	TabsTrigger,
	TabsContent,
} from "@radix-ui/react-tabs"
import { Review } from "product"
import { FC } from "react"
import AvatarIcon from "../AvatarIcon"
import { Star } from "lucide-react"
import RateSection from "./RateSection"

interface InfoTabsProps {
	description: string
	reviews: Review[]
	addReviewHandler: (
		stars: number | undefined,
		comment: string | undefined
	) => void
}

const InfoTabs: FC<InfoTabsProps> = ({
	description,
	reviews,
	addReviewHandler,
}) => {
	return (
		<Tabs
			defaultValue="details"
			className="border-2 rounded-sm border-_blue my-10"
		>
			<TabsList className="w-full flex justify-center rounded-none border-b-2  border-_blue p-0 bg-_darkBlue text-_white ">
				<TabsTrigger
					value="details"
					className="font-normal flex-grow text-lg rounded-none px-6  data-[state=active]:bg-_blue py-2"
				>
					Details
				</TabsTrigger>
				<TabsTrigger
					value="reviews"
					className="font-normal flex-grow text-lg rounded-none px-6 data-[state=active]:bg-_blue py-2"
				>
					Reviews
				</TabsTrigger>
				<TabsTrigger
					value="q&a"
					className="font-normal flex-grow text-lg rounded-none px-6 data-[state=active]:bg-_blue py-2"
				>
					Q & A
				</TabsTrigger>
			</TabsList>
			<TabsContent
				value="details"
				className="p-2"
			>
				<div>
					<p className="text-lg pb-1">Description: </p>
					<p>{description}</p>
				</div>
			</TabsContent>
			<TabsContent
				value="reviews"
				className="p-2"
			>
				<div className=" md:grid md:grid-cols-3 gap-4 justify-start items-start">
					<RateSection
						addReviewHandler={addReviewHandler}
					/>

					<hr className="border-_blue md:hidden border-t-2" />

					<div className="flex flex-col gap-6 col-span-2 py-4">
						{reviews.length === 0 ? (
							<p>There is no reviews</p>
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
											<div className="flex gap-2">
												{stars}
											</div>
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
			</TabsContent>
			<TabsContent
				value="q&a"
				className="p-2"
			>
				Q & A
			</TabsContent>
		</Tabs>
	)
}
export default InfoTabs
