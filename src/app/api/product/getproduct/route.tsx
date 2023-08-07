import prisma from "@/libs/prisma"
import { NextApiRequest, NextApiResponse } from "next"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url)
	const id = searchParams.get("id")

	if (id) {
		const product = await prisma.product.findUnique({
			where: {
				id: id,
			},
			include: {
				productImages: true,
				category: true,
				reviews: {
					include: {
						writer: {
							select: {
								image: true,
								name: true,
							},
						},
					},
				},
				questionsAnswers: true,
			},
		})
		if (!product) {
			return new NextResponse("The product do not exist", {
				status: 404,
			})
		}
		return NextResponse.json(product)
	} else {
		return new NextResponse(
			"You have to query a product id",
			{ status: 400 }
		)
	}
}
