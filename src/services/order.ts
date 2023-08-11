import axios from "axios"

const getOrders = () => axios.get("/api/order/getorders")
const removeOrder = (id: string) =>
	axios.delete(`/api/order/remove?id=${id}`)

export { getOrders, removeOrder }
