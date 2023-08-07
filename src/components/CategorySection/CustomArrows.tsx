import {
	ArrowLeftCircle,
	ArrowRightCircle,
} from "lucide-react"
import { FC } from "react"

export function CustomNextArrow(props: any) {
	const { onClick, style, className } = props
	return (
		<div
			className={`${className} before:!content-[''] !w-6 !h-6`}
			style={{
				...style,
				display: "block",
			}}
			onClick={onClick}
		>
			<ArrowRightCircle className="text-_white w-full h-full " />
		</div>
	)
}

export function CustomPrevArrow(props: any) {
	const { className, style, onClick } = props
	return (
		<div
			className={`${className} before:!content-['']  !w-6 !h-6`}
			style={{
				...style,
				display: "block",
			}}
			onClick={onClick}
		>
			<ArrowLeftCircle className="text-_white w-full h-full" />
		</div>
	)
}
