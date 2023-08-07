import { FC, useState } from "react"

import { capitalizeString, cn } from "@/utils/utils"
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
} from "@/components/ui/Command"
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/Popover"
import { Button } from "../ui/Button"
import { Check, ChevronsUpDown } from "lucide-react"
import {
	CategoryList,
	categoryList,
} from "@/utils/constants"

interface CategoryPopoverProps {
	category: CategoryList | ""
	inputStyle: string
	setCategoryHandler: (value: CategoryList) => void
}

const CategoryPopover: FC<CategoryPopoverProps> = ({
	category,
	inputStyle,
	setCategoryHandler,
}) => {
	const [openCategory, setOpenCategory] = useState(false)
	return (
		<Popover
			open={openCategory}
			onOpenChange={setOpenCategory}
		>
			<PopoverTrigger asChild>
				<Button
					variant="none"
					role="combobox"
					className={` justify-between ${inputStyle} px-3 `}
					id="categoryButton"
				>
					{category ? (
						category
					) : (
						<div className="text-_green">
							Select category...
						</div>
					)}
					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-full p-0 bg-_darkBlue">
				<Command>
					<CommandInput placeholder="Search category..." />
					<CommandEmpty>No category found.</CommandEmpty>
					<CommandGroup>
						{categoryList.map(categoryItem => {
							if (categoryItem === "") return

							return (
								<CommandItem
									key={categoryItem}
									onSelect={currentValue => {
										const valueCapitalized =
											capitalizeString(currentValue)
										setCategoryHandler(
											valueCapitalized as CategoryList
										)

										setOpenCategory(false)
									}}
								>
									<Check
										className={cn(
											"mr-2 h-4 w-4",
											category === categoryItem
												? "opacity-100"
												: "opacity-0"
										)}
									/>
									{categoryItem}
								</CommandItem>
							)
						})}
					</CommandGroup>
				</Command>
			</PopoverContent>
		</Popover>
	)
}
export default CategoryPopover
