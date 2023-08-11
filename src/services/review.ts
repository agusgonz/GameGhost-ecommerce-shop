import axios from "axios"

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
const getReviews = (id: string) =>
	axios.get(`/api/product/getreviews?id=${id}`)

export { addProductReview, getReviews }
