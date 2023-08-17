export const categoryList = [
	"",
	"Pc's",
	"Laptops",
	"Components",
	"Smartphones",
	"Tv's",
	"Game Consoles",
	"Games",
	"Audio",
	"Smart Home Devices",
	"Accessories",
	"Software",
	"Printers & Scanners",
	"Other",
] as const

export type CategoryListTypes =
	(typeof categoryList)[number]
