"use client"
import { useToast } from "@/components/ui/use-toast"
import axios from "axios"
import { Product } from "product"
import { FC, useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import ProductCard from "@/components/ProductCard"
import { getProducts } from "@/services/product"

interface pageProps {}

const page: FC<pageProps> = ({}) => {
	const [products, setProducts] = useState<Product[]>([])
	const { toast } = useToast()
	const { data: session, status } = useSession()

	useEffect(() => {
		if (status == "authenticated") {
			getProducts()
				.then(res => setProducts(res.data))
				.catch(err =>
					toast({
						description: err.response.data,
						variant: "destructive",
					})
				)
		}
	}, [status])
	return (
		<div className="border-2 border-_white  text-_white  rounded-sm">
			<div className="grid lg:grid-cols-2 p-2 gap-2">
				{products.map(product => {
					return (
						<>
							<ProductCard
								key={product.id + ""}
								product={product}
								includeDescription
							/>
						</>
					)
				})}
			</div>
		</div>
	)
}
export default page
