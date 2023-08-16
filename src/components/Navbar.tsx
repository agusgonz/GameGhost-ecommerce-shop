"use client"
import React from "react"
import Link from "next/link"
import { Button } from "./ui/Button"
import { signOut } from "next-auth/react"
import {
	Ghost,
	LogOut,
	PlusCircle,
	Gamepad,
	ShoppingCart,
	User2,
	UserCircle2,
} from "lucide-react"
import { useDispatch } from "react-redux"
import { open } from "@/store/slices/isModalOpen"
import { useSession } from "next-auth/react"
import Loading from "./Loading"
import Spinner from "./Spinner"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "./ui/DropdownMenu"
import { useRouter } from "next/navigation"
import CartSheet from "./CartSheet"

export default function Navbar() {
	const { data: session, status } = useSession()

	const dispatch = useDispatch()
	const router = useRouter()

	const itemSize = "w-8 h-8"

	return (
		<nav className=" w-full ">
			<div className="h-[70px] relative flex items-center justify-between z-0">
				<Link
					href="/"
					className="flex gap-3 items-center text-lg"
				>
					<Ghost className={itemSize} />
					<p className="hidden md:inline-block font-normal">
						GameGhost
					</p>
				</Link>

				<CartSheet>
					<button className=" bg-_darkBlue rounded-full p-2">
						<ShoppingCart className={itemSize} />
					</button>
				</CartSheet>
			</div>
			<div className="absolute top-0 left-1/2 w-min h-[70px] z-20 -translate-x-1/2">
				<div className="flex justify-center items-center h-full ">
					<div className="flex content-center gap-2 h-min">
						{session?.user ? (
							<DropdownMenu>
								<DropdownMenuTrigger className=" bg-_darkBlue rounded-full p-2">
									<UserCircle2 className={itemSize} />
								</DropdownMenuTrigger>
								<DropdownMenuContent className=" border-_darkBlue">
									<DropdownMenuLabel className="text-center">
										My Account
									</DropdownMenuLabel>
									<DropdownMenuSeparator className="" />
									<DropdownMenuItem
										asChild
										className="hover:cursor-pointer"
									>
										<Link href="/profile/orders">
											<User2 className="mr-2 w-4 h-4" />
											Profile
										</Link>
									</DropdownMenuItem>
									<DropdownMenuItem
										asChild
										className="hover:cursor-pointer"
									>
										<Link href="/product/create">
											<Gamepad className="mr-2 w-4 h-4" />
											Sell product
										</Link>
									</DropdownMenuItem>
									<DropdownMenuItem className="hover:cursor-pointer">
										<button
											className="flex"
											onClick={() => {
												signOut()
											}}
										>
											<LogOut className="mr-2 w-4 h-4" />
											Sign out
										</button>
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						) : (
							<button
								onClick={() => dispatch(open())}
								className=" bg-_darkBlue rounded-full p-2"
							>
								<UserCircle2 className={itemSize} />
							</button>
						)}
					</div>
				</div>
			</div>
		</nav>
	)
}
