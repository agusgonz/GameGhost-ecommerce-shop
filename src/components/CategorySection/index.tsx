"use client"
import SliderProducts from "@/components/CategorySection/SliderContainer"
import { toast } from "@/components/ui/use-toast"
import { getCategories } from "@/services/category"
import { Category } from "store"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import Loading from "@/components/Loading"
import FadeInAnimation from "../FadeInAnimation"
import Spinner from "../Spinner"

export default function CategorySection() {
	const { data: session, status } = useSession()
	const [categories, setCategories] = useState<Category[]>()
	const [loadingProducts, setLoadingProducts] =
		useState(true)

	useEffect(() => {
		getCategories()
			.then(res => {
				setCategories(res.data)
				setLoadingProducts(false)
			})
			.catch(err => {
				toast({
					description: err.response.data,
					variant: "destructive",
				})
			})
	}, [])

	if (loadingProducts) {
		return (
			<FadeInAnimation>
				<div className="w-full h-32 flex justify-center items-center ">
					<p className="pr-2">Loading Products</p>
					<Spinner />
				</div>
			</FadeInAnimation>
		)
	}

	return (
		<>
			{categories?.map((category: Category) => {
				return (
					<FadeInAnimation key={category.id}>
						<SliderProducts category={category} />
					</FadeInAnimation>
				)
			})}
		</>
	)
}
