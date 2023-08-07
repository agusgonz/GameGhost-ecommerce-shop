import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export const capitalizeString = (string: string) => {
	const arr = string.split(" ")

	for (var i = 0; i < arr.length; i++) {
		arr[i] =
			arr[i].charAt(0).toUpperCase() + arr[i].slice(1)
	}

	const newString = arr.join(" ")

	return newString
}
