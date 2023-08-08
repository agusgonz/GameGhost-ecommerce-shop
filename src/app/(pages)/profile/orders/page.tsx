"use client"
import { useToast } from "@/components/ui/use-toast"
import { FC, useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { getOrders } from "@/services/product"

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
