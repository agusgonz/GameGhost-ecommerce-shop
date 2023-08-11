import axios from "axios"

const addProductToCart = (id: string) =>
	axios.patch(`/api/product/cart/add?id=${id}`)

const getProductsInCart = () =>
	axios.get("/api/product/cart/getcartproducts")

const removeProductFromCart = (id: string) =>
	axios.patch(`/api/product/cart/remove?id=${id}`)

const buyProductsInCart = () =>
	axios.post("/api/order/create")

export {
	addProductToCart,
	getProductsInCart,
	removeProductFromCart,
	buyProductsInCart,
}
