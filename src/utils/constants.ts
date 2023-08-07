export const categoryList = [
	"",
	"PC's",
	"Laptops",
	"Components",
	"Smartphones",
	"TV's",
	"Game Consoles",
	"Games",
	"Audio",
	"Smart Home Devices",
	"Accessories",
	"Software",
	"Printers & Scanners",
	"Other",
] as const

export type CategoryList = (typeof categoryList)[number]
