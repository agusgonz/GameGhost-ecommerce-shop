import { Loader2 } from "lucide-react"
import React from "react"

import { FC } from "react"

interface SpinnerProps
	extends React.HTMLAttributes<HTMLDivElement> {}

const Spinner: FC<SpinnerProps> = ({}) => {
	return <Loader2 className="animate-spin" />
}
export default Spinner
