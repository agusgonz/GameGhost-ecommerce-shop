import prisma from "@/libs/prisma"
import { NextResponse } from "next/server"

export async function GET(request: NextResponse) {
	const categories = await prisma.category.findMany({
		include: {
			products: {
				include: {
					productImages: true,
				},
			},
		},
	})
	return NextResponse.json(categories)
}
