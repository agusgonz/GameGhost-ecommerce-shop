import Image from "next/image"
import Link from "next/link"
import { Product } from "store"
import { FC } from "react"
import { Button } from "./ui/Button"
import { Trash2, X } from "lucide-react"
import { SheetClose } from "./ui/Sheet"
import { removeProductFromCart } from "@/services/product"
import { reloadCart } from "@/store/slices/isReloadCartNeeded"
import { useDispatch } from "react-redux"

interface ProductCardProps {
	product: Product
	includeDescription?: boolean
	isInCart?: boolean
}

const ProductCard: FC<ProductCardProps> = ({
	product,
	includeDescription,
	isInCart,
}) => {
	const dispatch = useDispatch()

	return (
		<div className="">
			<div className="flex flex-col-reverse min-[450px]:flex-row w-full h-full gap-5">
				<figure className="w-full h-full flex justify-center items-center rounded-sm overflow-hidden sm:w-56 md:w-64 lg:w-80 bg-_blue p-1">
					<Image
						className=" w-full"
						src={product.productImages[0].secure_url}
						width={100}
						height={100}
						alt="product image"
					/>
				</figure>
				<div className=" w-full gap-2 h-full flex flex-col justify-between">
					<div className="flex justify-between items-center">
						<p className="text-lg  ">{product.title}</p>
						{isInCart ? (
							<Button
								variant={"ghost"}
								size={"sm"}
								onClick={() => {
									removeProductFromCart(product.id).then(
										() => dispatch(reloadCart())
									)
								}}
							>
								<Trash2 className="w-4 h-4 text-_green" />
							</Button>
						) : null}
					</div>
					{includeDescription && (
						<div className="text-ellipsis overflow-hidden text-_green  max-h-24">
							<p>{product.description}</p>
						</div>
					)}
					<div className="text-xl font-normal">
						<p>{`$ ${product.price}`}</p>
					</div>
					<div className="flex-grow text-sm underline flex items-end text-_green">
						{isInCart ? (
							<SheetClose asChild>
								<Link href={`/product/${product.id}`}>
									See the product
								</Link>
							</SheetClose>
						) : (
							<Link href={`/product/${product.id}`}>
								See the product
							</Link>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}
export default ProductCard
