import { getAuthSession } from "@/libs/auth-options"
import prisma from "@/libs/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
	const { productId, comment, stars } = await request.json()

	const session = await getAuthSession()

	try {
		const review = await prisma.review.create({
			data: {
				productId: productId,
				comment: comment,
				stars: parseInt(stars),
				writerId: session?.user.id,
			},
		})
		return new NextResponse("Thank for your review", {
			status: 200,
		})
	} catch (err) {
		console.log(err)
		return new NextResponse("There was a problem", {
			status: 400,
		})
	}
}
