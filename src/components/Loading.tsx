import React from "react"
import Spinner from "./Spinner"

export default function Loading() {
	return (
		<>
			<div className="absolute top-1/2 left-1/2 flex items-center justify-center -translate-x-1/2 -translate-y-1/2">
				<Spinner />
			</div>
		</>
	)
}
