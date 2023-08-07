import { getAuthSession } from "@/libs/auth-options"
import cloudinary from "@/libs/cloudinary"
import prisma from "@/libs/prisma"
import { NextRequest, NextResponse } from "next/server"
import { ProductImage } from "product"

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
		console.log(review)
	} catch (err) {
		console.log(err)
		return new NextResponse("There was a problem", {
			status: 400,
		})
	}
}
