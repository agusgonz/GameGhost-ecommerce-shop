import React, { FC } from "react"
import { Button } from "../ui/Button"
import { ShoppingCart } from "lucide-react"
import { cn } from "@/utils/utils"
import { addProductToCart } from "@/services/cart"
import { toast } from "../ui/use-toast"
import { useDispatch } from "react-redux"
import { open } from "@/store/slices/isModalOpen"
import { reloadCart } from "@/store/slices/isReloadCartNeeded"

interface AddToCartButtonProps
	extends React.HTMLAttributes<HTMLButtonElement> {
	productId: string
}

const AddToCartButton: FC<AddToCartButtonProps> = ({
	productId,
	className,
	...props
}) => {
	const dispatch = useDispatch()

	const addProductToCartHandler = () => {
		addProductToCart(productId)
			.then(res => {
				toast({
					description: res.data,
					variant: "success",
				})
				dispatch(reloadCart())
			})
			.catch(err => {
				toast({
					description: err.response.data,
					variant: "destructive",
				})
				dispatch(open())
			})
	}

	return (
		<Button
			variant={"custom"}
			size={"lg"}
			className={cn(
				"text-lg font-normal bg-_comodin",
				className
			)}
			onClick={() => {
				addProductToCartHandler()
			}}
		>
			Add to cart
			<ShoppingCart className=" w-4 ml-2 h-4" />
		</Button>
	)
}
export default AddToCartButton
