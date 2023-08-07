"use client"
import { Product } from "@prisma/client"
import React, { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { getProductsInCart } from "@/services/product"
import { toast } from "@/components/ui/use-toast"

export default function Cart() {
	const [products, setProducts] = useState<Product[]>()
	console.log(products)
	const { data: session, status } = useSession()

	useEffect(() => {
		if (status == "authenticated") {
			getProductsInCart()
				.then(res => setProducts(res.data))
				.catch(err =>
					toast({
						description: err.response.data,
						variant: "destructive",
					})
				)
		}
	}, [status])
	return <div>Cart</div>
}
