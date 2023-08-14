import { cn } from "@/utils/utils"
import { Loader2 } from "lucide-react"
import React from "react"

import { FC } from "react"

interface SpinnerProps
	extends React.HTMLAttributes<HTMLDivElement> {}

const Spinner: FC<SpinnerProps> = ({ className }) => {
	return (
		<Loader2 className={cn("animate-spin", className)} />
	)
}
export default Spinner
