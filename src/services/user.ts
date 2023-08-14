import axios from "axios"

const updateUser = (name: string, image: string) =>
	axios.patch(`/api/editprofile`, { name, image })

export { updateUser }
