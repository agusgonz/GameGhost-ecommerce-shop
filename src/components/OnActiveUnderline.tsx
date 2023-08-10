import Link from "next/link"
import { usePathname } from "next/navigation"
import {
	FC,
	ReactNode,
	useEffect,
	useRef,
	useState,
} from "react"

interface OnActiveUnderlineProps {
	name: string
	url: string
}

const OnActiveUnderline: FC<OnActiveUnderlineProps> = ({
	name,
	url,
}) => {
	const [active, setActive] = useState(false)
	const ref = useRef<HTMLDivElement>(null)

	const currentUrl = usePathname()

	useEffect(() => {
		const node = ref.current
		if (node) {
			const handleFocus = () => setActive(true)
			const handleBlur = () => setActive(false)
			const handleMouseOver = () => setActive(true)
			const handleMouseOut = () => setActive(false)

			node.addEventListener("focus", handleFocus)
			node.addEventListener("blur", handleBlur)
			node.addEventListener("mouseover", handleMouseOver)
			node.addEventListener("mouseout", handleMouseOut)

			return () => {
				node.removeEventListener("focus", handleFocus)
				node.removeEventListener("blur", handleBlur)
				node.removeEventListener(
					"mouseover",
					handleMouseOver
				)
				node.removeEventListener("mouseout", handleMouseOut)
			}
		}
	}, [])

	return (
		<div
			ref={ref}
			className={`overflow-hidden transition-transform ${
				active || url == currentUrl ? "text-2xl" : "text-xl"
			}`}
		>
			<Link href={url}>{name}</Link>
			<hr
				className={`border-t-1 border-_white transition-transform ${
					active || url == currentUrl
						? "translate-x-0"
						: "-translate-x-[100%] "
				}`}
			/>
		</div>
	)
}
export default OnActiveUnderline
