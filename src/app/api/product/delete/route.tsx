import prisma from "@/libs/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url)
	const id = searchParams.get("id")

	try {
		if (id) {
			const product = await prisma.product.delete({
				where: {
					id: id,
				},
			})
			if (!product) {
				return new NextResponse(
					"The product do not exist",
					{
						status: 404,
					}
				)
			}
			return new NextResponse(
				"Product deleted successfully",
				{
					status: 200,
				}
			)
		} else {
			return new NextResponse(
				"You have to query a product id",
				{ status: 400 }
			)
		}
	} catch (error) {
		return new NextResponse("Something when wrong", {
			status: 500,
		})
	}
}
