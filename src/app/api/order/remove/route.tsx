import { getAuthSession } from "@/libs/auth-options"
import prisma from "@/libs/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function DELETE(request: NextRequest) {
	const { searchParams } = new URL(request.url)
	const id = searchParams.get("id")

	const session = await getAuthSession()
	if (!session) {
		return new NextResponse(
			"You have to be registered to do this",
			{ status: 401 }
		)
	}

	if (!id) {
		return new NextResponse(
			"You have to query a product id",
			{
				status: 400,
			}
		)
	}

	try {
		const order = await prisma.order.delete({
			where: {
				id: id,
			},
		})

		return new NextResponse(
			`The order ${order.id} has been cancel`,
			{
				status: 200,
			}
		)
	} catch (err) {
		console.log(err)
		return new NextResponse(
			"There was a problem canceling the order",
			{
				status: 500,
			}
		)
	}
}
