"use client"
import { useToast } from "@/components/ui/use-toast"
import axios from "axios"
import { Product } from "product"
import { FC, useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import ProductCard from "@/components/ProductCard"
import { getOrders, getProducts } from "@/services/product"

interface pageProps {}

const page: FC<pageProps> = ({}) => {
	const [orders, setOrders] = useState([])
	const { toast } = useToast()
	const { data: session, status } = useSession()

	useEffect(() => {
		if (status == "authenticated") {
			getOrders()
				.then(res => setOrders(res.data))
				.catch(err =>
					toast({
						description: err.response.data,
						variant: "destructive",
					})
				)
		}
	}, [status])

	return <></>
}
export default page
