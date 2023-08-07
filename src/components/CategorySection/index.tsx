"use client"
import SliderProducts from "@/components/CategorySection/SliderContainer"
import { toast } from "@/components/ui/use-toast"
import { getCategories } from "@/services/product"
import Image from "next/image"
import { Category } from "product"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import Loading from "@/components/Loading"
import Circle from "./Circle"

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

	if (status == "loading") {
		return <Loading />
	}

	return (
		<>
			{categories?.map((category: Category) => {
				return (
					<SliderProducts
						key={category.id}
						category={category}
					/>
				)
			})}
		</>
	)
}
