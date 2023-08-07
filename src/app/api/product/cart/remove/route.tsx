import { getAuthSession } from "@/libs/auth-options"
import prisma from "@/libs/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function PATCH(request: NextRequest) {
	const session = await getAuthSession()
	const { searchParams } = new URL(request.url)
	const id = searchParams.get("id")

	if (!session) {
		return new NextResponse(
			"You have to be loggin to do this",
			{ status: 401 }
		)
	}

	if (id) {
		const product = await prisma.product.update({
			where: {
				id: id,
			},
			data: {
				inUserCart: {
					disconnect: {
						email: session.user.email,
					},
				},
			},
			include: {
				inUserCart: true,
			},
		})
		return new NextResponse("Product removed correctly", {
			status: 200,
		})
	} else {
		return new NextResponse(
			"You have to query a product id",
			{ status: 400 }
		)
	}
}
