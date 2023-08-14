"use client"
import SliderProducts from "@/components/CategorySection/SliderContainer"
import { toast } from "@/components/ui/use-toast"
import { getCategories } from "@/services/category"
import { Category } from "store"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import Loading from "@/components/Loading"
import FadeInAnimation from "../FadeInAnimation"

export default function CategorySection() {
	const { data: session, status } = useSession()
	const [categories, setCategories] = useState<Category[]>()

	useEffect(() => {
		getCategories()
			.then(res => setCategories(res.data))
			.catch(err => {
				toast({
					description: err.response.data,
					variant: "destructive",
				})
			})
	}, [])

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
