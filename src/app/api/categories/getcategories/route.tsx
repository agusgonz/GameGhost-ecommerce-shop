import prisma from "@/libs/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
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
