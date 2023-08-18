import Navbar from "@/components/Navbar"
import "./globals.css"
import { Ubuntu } from "next/font/google"
import Modal from "@/components/Modals"
import AuthProvider from "@/provider/AuthProvider"
import ReduxProvider from "@/provider/ReduxProvider"
import { Toaster } from "@/components/ui/Toaster"

const ubuntu = Ubuntu({
	subsets: ["latin"],
	weight: ["300", "400"],
})

export const metadata = {
	title: "GameGhost",
	description:
		"Nextjs13 e-commerce shop / Database with MongoDB Atlas and Prisma / Authentication with nextauth",
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<body
				className={`${ubuntu.className}  bg-_darkBlue text-_white font-light w-full h-full`}
			>
				<ReduxProvider>
					<AuthProvider>
						<div className=" container w-full h-full">
							<Navbar />
							{children}
							<Modal />
							<Toaster />
						</div>
					</AuthProvider>
				</ReduxProvider>
			</body>
		</html>
	)
}
