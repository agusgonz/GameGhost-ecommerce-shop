import { getAuthSession } from "@/libs/auth-options"
import prisma from "@/libs/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
	const session = await getAuthSession()
	if (!session) {
		return new NextResponse(
			"You have to be loggin to see this",
			{ status: 401 }
		)
	}
	// console.log(session)
	const products = await prisma.product.findMany({
		where: {
			userId: session.user.id,
		},
		include: {
			productImages: true,
		},
	})

	return NextResponse.json(products)
}
