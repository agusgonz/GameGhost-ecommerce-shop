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
	axios.post("/api/review/add", {
		productId: productId,
		comment: comment,
		stars: stars,
	})
const getReviews = (id: string) =>
	axios.get(`/api/review/getreviews?id=${id}`)

export { addProductReview, getReviews }
