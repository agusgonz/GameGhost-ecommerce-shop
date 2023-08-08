import { getAuthSession } from "@/libs/auth-options"
import cloudinary from "@/libs/cloudinary"
import prisma from "@/libs/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
	const {
		title,
		description,
		price,
		stock,
		images,
		category,
	} = await request.json()

	const session = await getAuthSession()

	const imagesUploaded = []

	for (let i = 0; i < images.length; i++) {
		try {
			const uploadRes = await cloudinary.uploader.upload(
				images[i],
				{
					upload_preset: "gamingonlineshop",
				}
			)

			imagesUploaded.push(uploadRes)
		} catch (err) {
			console.log(err)
			return new NextResponse(
				"There was a problem uploading the images",
				{
					status: 400,
				}
			)
		}
	}

	try {
		// Check if category exist or create a new one
		const existingCategory =
			await prisma.category.findFirst({
				where: {
					name: category,
				},
			})

		let categoryId

		if (existingCategory) {
			categoryId = existingCategory.id
		} else {
			const newCategory = await prisma.category.create({
				data: {
					name: category,
				},
			})
			categoryId = newCategory.id
		}

		categoryId = String(categoryId)

		const product = await prisma.product.create({
			data: {
				user: {
					connect: {
						email: session?.user.email,
					},
				},
				title: title,
				description: description,
				price: parseFloat(price),
				stock: parseFloat(stock),
				productImages: {
					createMany: {
						data: imagesUploaded,
					},
				},
				category: {
					connect: {
						id: categoryId,
					},
				},
			},
			include: {
				productImages: true,
			},
		})
		return NextResponse.json(product)
	} catch (err) {
		console.log(err)
		return new NextResponse(
			"There was a problem uploading the files",
			{
				status: 400,
			}
		)
	}
}
