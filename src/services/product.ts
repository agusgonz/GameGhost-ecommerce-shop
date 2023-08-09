import { CategoryList } from "@/utils/constants"
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
	category: CategoryList
}) =>
	axios.post("/api/product/upload", {
		title,
		description,
		price,
		stock,
		images,
		category,
	})
const addProductToCart = (id: string) =>
	axios.patch(`/api/product/cart/add?id=${id}`)

const getProductsInCart = () =>
	axios.get("/api/product/cart/getcartproducts")

const removeProductFromCart = (id: string) =>
	axios.patch(`/api/product/cart/remove?id=${id}`)

const getCategories = () =>
	axios.get("/api/categories/getcategories")

const addProductReview = ({
	comment,
	stars,
	productId,
}: {
	comment: string
	stars: number
	productId: string
}) =>
	axios.post("/api/product/addreview", {
		productId: productId,
		comment: comment,
		stars: stars,
	})

const buyProductsInCart = () =>
	axios.post("/api/order/create")

const getOrders = () => axios.get("/api/order/getorders")
const removeOrder = (id: string) =>
	axios.delete(`/api/order/remove?id=${id}`)

export {
	getProduct,
	getProducts,
	createProduct,
	addProductToCart,
	getProductsInCart,
	removeProductFromCart,
	getCategories,
	addProductReview,
	buyProductsInCart,
	getOrders,
	removeOrder,
}
