import axios from "axios"

const getCategories = () =>
	axios.get("/api/categories/getcategories")

export { getCategories }
