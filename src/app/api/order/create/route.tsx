import { getAuthSession } from "@/libs/auth-options"
import prisma from "@/libs/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
	const session = await getAuthSession()
	if (!session) {
		return new NextResponse(
			"You have to be registered to do this",
			{ status: 401 }
		)
	}

	try {
		const productsInCart = await prisma.product.findMany({
			where: {
				inUserCartId: {
					has: session.user.id,
				},
			},
			select: {
				id: true,
				userId: true,
			},
		})

		if (productsInCart.length === 0) {
			return new NextResponse(
				"There are no products in your cart",
				{
					status: 400,
				}
			)
		}

		const order = await prisma.order.create({
			data: {
				buyerId: session.user.id,
			},
		})

		for (let product of productsInCart) {
			await prisma.orderProd.create({
				data: {
					orderId: order.id,
					productId: product.id,
					sellerId: product.userId,
				},
			})
		}

		await prisma.product.updateMany({
			where: {
				inUserCartId: {
					has: session.user.id,
				},
			},
			data: {
				inUserCartId: [],
			},
		})
		return new NextResponse("The order has been created", {
			status: 200,
		})
	} catch (err) {
		console.log(err)
		return new NextResponse(
			"There was a problem creating the order",
			{
				status: 500,
			}
		)
	}
}
