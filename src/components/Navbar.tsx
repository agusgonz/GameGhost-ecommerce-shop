"use client"
import React from "react"
import Link from "next/link"
import { Button } from "./ui/Button"
import { signOut } from "next-auth/react"
import {
	Ghost,
	LogOut,
	PlusCircle,
	Settings2,
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

	const itemSize = "w-7 h-7"

	return (
		<nav className=" w-full ">
			<div className="h-[70px] relative flex items-center justify-between z-0">
				<Link
					href="/"
					className="flex gap-3 items-center text-lg"
				>
					<Ghost className={itemSize} />
					<p className="hidden md:inline-block font-normal">
						Gaming Online Shop
					</p>
				</Link>
				{status == "loading" ? (
					<Spinner />
				) : session?.user ? (
					<Link
						href={"/product/create"}
						className="flex gap-2 items-center text-sm font-light group"
					>
						<p className="hidden md:inline-block group-hover:underline">
							Sell your product
						</p>
						<PlusCircle className={itemSize} />
					</Link>
				) : (
					<Button
						variant="custom"
						className={`bg-_green  hover:bg-_green/90`}
						onClick={() => dispatch(open())}
					>
						Sign In
					</Button>
				)}
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
										<Link href="/profile">
											<User2 className="mr-2 w-4 h-4" />
											Profile
										</Link>
									</DropdownMenuItem>
									<DropdownMenuItem className="hover:cursor-pointer">
										<Settings2 className="mr-2 w-4 h-4" />
										Settings
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
						<CartSheet>
							<button className=" bg-_darkBlue rounded-full p-2">
								<ShoppingCart className={itemSize} />
							</button>
						</CartSheet>
					</div>
				</div>
			</div>
		</nav>
	)
}
