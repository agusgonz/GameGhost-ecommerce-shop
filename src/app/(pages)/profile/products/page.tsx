"use client"
import { useToast } from "@/components/ui/use-toast"
import { Product } from "store"
import { FC, useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import ProductCard from "@/components/ProductCard"
import { getProducts } from "@/services/product"
import Link from "next/link"
import FadeInAnimation from "@/components/FadeInAnimation"
import Loading from "@/components/Loading"

interface pageProps {}

const page: FC<pageProps> = ({}) => {
	const [products, setProducts] = useState<Product[]>([])
	const [loading, setLoading] = useState(true)
	const { toast } = useToast()
	const { data: session, status } = useSession()

	useEffect(() => {
		if (status == "authenticated") {
			getProducts()
				.then(res => {
					setProducts(res.data)
					setLoading(false)
				})
				.catch(err => {
					toast({
						description: err.response.data,
						variant: "destructive",
					})
					setLoading(false)
				})
		}
	}, [status])

	if (loading) {
		return (
			<div className="relative w-full h-full">
				<Loading />
			</div>
		)
	}

	if (products.length == 0)
		return (
			<FadeInAnimation>
				<div className="flex justify-center text-lg">
					<p className="px-2 border-t border-_white">
						You have no products{" "}
						<Link
							href={"/product/create"}
							className="underline underline-offset-3 text-_green"
						>
							Sell now.
						</Link>
					</p>
				</div>
			</FadeInAnimation>
		)

	return (
		<FadeInAnimation>
			<div className="border-2 border-_white  text-_white  rounded-sm">
				<div className="grid xl:grid-cols-2 p-2 gap-2 overflow-hidden">
					{products.map(product => {
						return (
							<ProductCard
								key={product.id}
								product={product}
								includeDescription
							/>
						)
					})}
				</div>
			</div>
		</FadeInAnimation>
	)
}
export default page
