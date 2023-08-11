import prisma from "@/libs/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url)
	const id = searchParams.get("id")

	if (id) {
		const reviews = await prisma.review.findMany({
			where: {
				productId: id,
			},
			include: {
				writer: {
					select: {
						image: true,
						name: true,
					},
				},
			},
		})

		return NextResponse.json(reviews)
	} else {
		return new NextResponse(
			"You have to query a product id",
			{ status: 400 }
		)
	}
}
