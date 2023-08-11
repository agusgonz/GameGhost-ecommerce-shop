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

export { addProductReview }
