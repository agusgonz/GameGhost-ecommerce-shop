import {
	Tabs,
	TabsList,
	TabsTrigger,
	TabsContent,
} from "@radix-ui/react-tabs"
import { Review } from "store"
import { FC } from "react"
import ReviewsSection from "./ReviewsSection"

interface InfoTabsProps {
	description: string
	productId: string
}

const InfoTabs: FC<InfoTabsProps> = ({
	description,
	productId,
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
				<ReviewsSection productId={productId} />
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
