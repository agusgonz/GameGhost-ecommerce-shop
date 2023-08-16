import {
	Tabs,
	TabsList,
	TabsTrigger,
	TabsContent,
} from "@radix-ui/react-tabs"
import { Review } from "store"
import { FC } from "react"
import ReviewsSection from "./ReviewsSection"
import DescriptionSection from "./DescriptionSection"

interface InfoTabsProps {
	description: string
	productId: string
	seller: {
		name: string
		image: string
	}
}

const InfoTabs: FC<InfoTabsProps> = ({
	description,
	productId,
	seller,
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
			</TabsList>
			<TabsContent
				value="details"
				className="p-2"
			>
				<DescriptionSection
					description={description}
					seller={seller}
				/>
			</TabsContent>
			<TabsContent
				value="reviews"
				className="p-2"
			>
				<ReviewsSection productId={productId} />
			</TabsContent>
		</Tabs>
	)
}
export default InfoTabs
