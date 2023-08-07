import { useEffect, useState } from "react"

interface Size {
	windowWidth: number | undefined
	windowHeight: number | undefined
}

export const useWindowSize = (): Size => {
	const [windowSize, setWindowSize] = useState<Size>({
		windowWidth: undefined,
		windowHeight: undefined,
	})

	const handleSize = () => {
		if (typeof window !== "undefined") {
			setWindowSize({
				windowWidth: window.innerWidth,
				windowHeight: window.innerHeight,
			})
		}
	}

	useEffect(() => {
		handleSize()
		window.addEventListener("resize", handleSize)

		return () =>
			window.removeEventListener("resize", handleSize)
	}, [])

	return windowSize
}
