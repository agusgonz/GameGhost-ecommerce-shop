"use client"
import { FC, useState } from "react"
import { Button } from "./ui/Button"
import { deleteProduct } from "@/services/product"
import { useToast } from "./ui/use-toast"
import { useRouter } from "next/navigation"

interface DeleteProductButtonProps {
	productId: string
}

const DeleteProductButton: FC<DeleteProductButtonProps> = ({
	productId,
}) => {
	const { toast } = useToast()

	const route = useRouter()

	const [showQuestion, setShowQuestion] = useState(false)

	const handleDeleteProduct = () => {
		deleteProduct(productId)
			.then(res => {
				toast({
					description: res.data,
					variant: "success",
				})
				route.push("/")
			})
			.catch(err => {
				toast({
					description: err.response.data,
					variant: "destructive",
				})
			})
	}

	if (showQuestion) {
		return (
			<div className="text-rose-400  text-start flex gap-2">
				<p>Are you sure?</p>
				<button
					onClick={handleDeleteProduct}
					className="underline underline-offset-2"
				>
					Yes
				</button>
				<button
					onClick={() => setShowQuestion(false)}
					className="underline underline-offset-2"
				>
					No
				</button>
			</div>
		)
	}

	return (
		<button
			onClick={() => setShowQuestion(true)}
			className="text-start text-rose-400 underline underline-offset-2"
		>
			Delete this product
		</button>
	)
}
export default DeleteProductButton
