"use client"
import { FC, ReactNode } from "react"
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "./ui/Sheet"
import { Button } from "./ui/Button"
import ProductCard from "./ProductCard"
import React, { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import {
	buyProductsInCart,
	getProductsInCart,
} from "@/services/product"
import { toast } from "@/components/ui/use-toast"
import { Product } from "store"
import { ShoppingCart } from "lucide-react"
import { useSelector } from "react-redux"
import { RootState } from "@/store/store"
import {
	setReloadCartFalse,
	reloadCart,
} from "@/store/slices/isReloadCartNeeded"
import { useDispatch } from "react-redux"
import { useRouter } from "next/navigation"

interface CartSheetProps {
	children: ReactNode
}

const CartSheet: FC<CartSheetProps> = ({ children }) => {
	const [products, setProducts] = useState<Product[]>()
	const { data: session, status } = useSession()

	const router = useRouter()

	const isReloadCartNeeded = useSelector(
		(state: RootState) => state.isReloadCartNeeded.value
	)

	const dispatch = useDispatch()

	useEffect(() => {
		if (status == "authenticated") {
			getProductsInCart()
				.then(res => {
					const products: Product[] = res.data
					setProducts(products)
				})
				.catch(err =>
					toast({
						description: err.response.data,
						variant: "destructive",
					})
				)
			dispatch(setReloadCartFalse())
		}
	}, [status, isReloadCartNeeded])

	const buyProductsInCartHandler = () => {
		buyProductsInCart()
			.then(res => {
				toast({
					description: res.data,
					variant: "success",
				})
				dispatch(reloadCart())
				router.push("/profile/orders")
			})
			.catch(err =>
				toast({
					description: err.response.data,
					variant: "destructive",
				})
			)
	}

	return (
		<Sheet>
			<SheetTrigger asChild>
				<div className="relative">
					{children}
					{products && products.length != 0 && (
						<div className="absolute hover:cursor-pointer bottom-0 right-0 bg-_green rounded-full w-5 h-5 flex justify-center items-center text-_white font-semibold">
							{products?.length}
						</div>
					)}
				</div>
			</SheetTrigger>
			<SheetContent className="p-3 sm:p-6 sm:max-w-lg bg-_darkBlue border-none h-screen overflow-hidden flex flex-col ">
				<SheetHeader>
					<SheetTitle className="text-_white flex justify-center items-center gap-2">
						Cart
						<ShoppingCart className="w-5 h-5" />
					</SheetTitle>
					<SheetDescription className="text-_green">
						Here are all the products you added to the cart
					</SheetDescription>
				</SheetHeader>
				<div className="flex flex-col gap-2 pt-2 px-2 overflow-y-auto overflow-x-hidden flex-grow border-2 border-_white rounded-sm">
					{products &&
						products.map(product => {
							return (
								<div key={product.id}>
									<ProductCard
										product={product}
										isInCart
									/>
									<hr className="border-t-2 mt-2 border-_white" />
								</div>
							)
						})}
				</div>
				<div className="flex justify-between items-center">
					<div className="">
						<p className="text-sm">Total: </p>
						<p className="text-2xl">
							{" "}
							$
							{products
								?.reduce((acc, cur) => acc + cur.price, 0)
								?.toFixed(2)}
						</p>
					</div>
					<Button
						variant={"custom"}
						size={"lg"}
						className={"text-lg font-normal bg-_comodin"}
						onClick={buyProductsInCartHandler}
					>
						Order now
					</Button>
				</div>
			</SheetContent>
		</Sheet>
	)
}
export default CartSheet
