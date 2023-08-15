"use client"
import { useToast } from "@/components/ui/use-toast"
import { FC, useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { getOrders, removeOrder } from "@/services/order"
import { Order } from "store"
import Spinner from "@/components/Spinner"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import Loading from "@/components/Loading"
import FadeInAnimation from "@/components/FadeInAnimation"

interface pageProps {}

const page: FC<pageProps> = ({}) => {
	const [orders, setOrders] = useState([])
	const [refetch, setRefetch] = useState(false)
	const [loading, setLoading] = useState(true)
	const { toast } = useToast()
	const { data: session, status } = useSession()

	useEffect(() => {
		if (status == "authenticated") {
			getOrders()
				.then(res => {
					setOrders(res.data)
					setLoading(false)
				})
				.catch(err => {
					toast({
						description: err.response.data,
						variant: "destructive",
					})
					setLoading(false)
				})
			setRefetch(false)
		}
	}, [status, refetch])

	const removeOrderHandler = (id: string) => {
		removeOrder(id)
			.then(res => {
				toast({
					description: res.data,
					variant: "success",
				})
				setRefetch(true)
			})
			.catch(err =>
				toast({
					description: err.response.data,
					variant: "destructive",
				})
			)
	}

	if (loading) {
		return (
			<div className="relative w-full h-full">
				<Loading />
			</div>
		)
	}

	if (orders.length == 0)
		return (
			<FadeInAnimation>
				<div className="flex justify-center text-lg">
					<p className="px-2 border-t border-_white">
						You have no orders in progress
					</p>
				</div>
			</FadeInAnimation>
		)

	return (
		<FadeInAnimation>
			<div className="border-2 border-_white  text-_white  rounded-sm">
				<div className="p-2">
					{orders.map((order: Order, i) => {
						return (
							<div key={order.id}>
								<div className="flex flex-col gap-2">
									<div className="flex justify-between items-center">
										<p className="text-2xl">
											Order {i + 1}
										</p>
										<Link
											href={`/profile/orders/${order.id}`}
										>
											<ChevronRight className="w-8 h-8" />
										</Link>
									</div>
									<div className="w-full h-3 border-2 border-_green bg-_green rounded-full relative overflow-hidden my-2">
										<div className="absolute w-1/12 h-full bg-_blue  animate-pulse"></div>
									</div>
									<p className=" ">
										<span className="text-lg">State:</span>{" "}
										confirmation
									</p>
									<p className=" ">
										<span className="text-lg">
											Shipping:
										</span>{" "}
										{order.address || "no address"}
									</p>
									<p className=" text-_green">
										<span className="text-lg">
											Payment:
										</span>{" "}
										{order.isPaid ? "Yes" : "No"}
									</p>

									<div className="flex gap-2 flex-wrap justify-start ">
										{order.orderProds.map(product => {
											return (
												<Link
													href={
														"/product/" + product.product.id
													}
													key={product.id}
													className="w-[100px] h-[100px]  border border-_blue bg-_blue p-1 flex justify-center items-center"
												>
													<Image
														alt="Product Image"
														className="object-contain "
														src={
															product.product
																.productImages[0].secure_url
														}
														width={80}
														height={80}
													/>
												</Link>
											)
										})}
									</div>
									<div>
										<button
											onClick={() =>
												removeOrderHandler(order.id)
											}
											className="text-sm underline text-_white/70"
										>
											Cancel order
										</button>
									</div>
								</div>

								{i + 1 == orders.length ? null : (
									<hr className="border-t-2 border-_white my-2" />
								)}
							</div>
						)
					})}
				</div>
			</div>
		</FadeInAnimation>
	)
}
export default page
