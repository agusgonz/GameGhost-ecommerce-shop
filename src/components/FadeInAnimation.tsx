"use client"
import {
	FC,
	ReactNode,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react"
import { useInView } from "react-intersection-observer"

interface FadeInAnimationProps {
	children: ReactNode
	ms?: number
}

const FadeInAnimation: FC<FadeInAnimationProps> = ({
	children,
	ms,
}) => {
	const { ref, inView } = useInView({
		triggerOnce: true,
	})

	const [show, setShow] = useState(false)

	useEffect(() => {
		if (inView) {
			setTimeout(() => {
				setShow(true)
			}, ms || 0)
		}
	}, [inView])

	return (
		<div
			ref={ref}
			className={`relative ${
				show ? `animate-fadeAndSlide ` : ""
			}`}
		>
			{!show && (
				<div className="w-full h-full absolute top-0 left-0 bg-_darkBlue z-10"></div>
			)}
			{children}
		</div>
	)
}
export default FadeInAnimation
