import { getAuthSession } from "@/libs/auth-options"
import prisma from "@/libs/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
	const session = await getAuthSession()
	if (!session) {
		return new NextResponse(
			"You have to be registered to see this",
			{ status: 401 }
		)
	}

	const orders = await prisma.order.findMany({
		where: {
			buyerId: session.user.id,
		},

		include: {
			orderProds: {
				include: {
					product: {
						include: {
							productImages: {
								select: {
									secure_url: true,
								},
							},
						},
					},
				},
			},
		},
	})

	return NextResponse.json(orders)
}
