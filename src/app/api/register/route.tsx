import prisma from "@/libs/prisma"
import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcrypt"

export async function POST(request: NextRequest) {
	const body = await request.json()
	const { name, email, password } = body
	const userExist = await prisma.user.findUnique({
		where: {
			email,
		},
	})
	if (userExist) {
		return new NextResponse("Email already in user", {
			status: 400,
		})
	}
	const hashedPassword = await bcrypt.hash(password, 10)

	const user = await prisma.user.create({
		data: {
			name,
			email,
			password: hashedPassword,
		},
	})
	return NextResponse.json(user)
}
