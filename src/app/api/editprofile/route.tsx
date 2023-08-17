import { getAuthSession } from "@/libs/auth-options"
import cloudinary from "@/libs/cloudinary"
import prisma from "@/libs/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function PATCH(request: NextRequest) {
	const { name, image } = await request.json()

	const session = await getAuthSession()

	if (!session) {
		return new NextResponse(
			"You have to be registered to see this",
			{ status: 401 }
		)
	}

	try {
		if (image) {
			let imageUploaded
			const uploadRes = await cloudinary.uploader.upload(
				image,
				{
					upload_preset: "gamingonlineshop",
				}
			)

			imageUploaded = uploadRes
			await prisma.user.update({
				where: {
					id: session.user.id,
				},
				data: {
					image: imageUploaded.secure_url,
				},
			})
		}
		if (name) {
			await prisma.user.update({
				where: {
					id: session.user.id,
				},
				data: {
					name: name,
				},
			})
		}
		return new NextResponse("Changes saved!", {
			status: 200,
		})
	} catch (err) {
		console.log(err)
		return new NextResponse(
			"There was a problem uploading the images",
			{
				status: 500,
			}
		)
	}
}
