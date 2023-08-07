"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/utils/utils"
import { Button } from "@/components/ui/Button"
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

const category = [
	{
		value: "next.js",
		label: "Next.js",
	},
	{
		value: "sveltekit",
		label: "SvelteKit",
	},
	{
		value: "nuxt.js",
		label: "Nuxt.js",
	},
	{
		value: "remix",
		label: "Remix",
	},
	{
		value: "astro",
		label: "Astro",
	},
]

export function CategoryCombobox() {
	const [open, setOpen] = React.useState(false)
	const [value, setValue] = React.useState("")

	return (
		<Popover
			open={open}
			onOpenChange={setOpen}
		>
			<PopoverTrigger asChild>
				<Button
					variant="none"
					role="combobox"
					aria-expanded={open}
					className="w-[200px] justify-between"
				>
					{value
						? category.find(
								category => category.value === value
						  )?.label
						: "Select category..."}
					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[200px] p-0 bg-_darkBlue">
				<Command>
					<CommandInput placeholder="Search category..." />
					<CommandEmpty>No category found.</CommandEmpty>
					<CommandGroup>
						{category.map(category => (
							<CommandItem
								key={category.value}
								onSelect={currentValue => {
									setValue(
										currentValue === value
											? ""
											: currentValue
									)
									setOpen(false)
								}}
							>
								<Check
									className={cn(
										"mr-2 h-4 w-4",
										value === category.value
											? "opacity-100"
											: "opacity-0"
									)}
								/>
								{category.label}
							</CommandItem>
						))}
					</CommandGroup>
				</Command>
			</PopoverContent>
		</Popover>
	)
}
