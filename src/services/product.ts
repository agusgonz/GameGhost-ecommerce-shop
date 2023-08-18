import { CategoryListTypes } from "@/utils/constants"
import axios from "axios"

const getProduct = (id: string) =>
	axios.get(`/api/product/getproduct?id=${id}`)

const getProducts = () =>
	axios.get("/api/product/getproducts")

const createProduct = ({
	title,
	description,
	price,
	stock,
	images,
	category,
}: {
	title: string
	description: string
	price: number
	stock: number
	images: string[]
	category: CategoryListTypes
}) =>
	axios.post("/api/product/upload", {
		title,
		description,
		price,
		stock,
		images,
		category,
	})
const deleteProduct = (id: string) =>
	axios.get(`/api/product/delete?id=${id}`)

export {
	getProduct,
	getProducts,
	createProduct,
	deleteProduct,
}
