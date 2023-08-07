"use client"
import React, {
	FormEvent,
	Suspense,
	useEffect,
	useState,
} from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useDispatch } from "react-redux"
import { open } from "@/store/slices/isModalOpen"
import Loading from "@/components/Loading"
import Link from "next/link"
import {
	Button,
	buttonVariants,
} from "@/components/ui/Button"
import UnauthenticatedFrame from "@/components/UnauthenticatedFrame"
import { Input } from "@/components/ui/Input"
import Image from "next/image"
import axios, { AxiosError } from "axios"
import { Label } from "@/components/ui/Label"
import { Textarea } from "@/components/ui/Textarea"
import { useToast } from "@/components/ui/use-toast"
import Spinner from "@/components/Spinner"
import { createProduct } from "@/services/product"
import { CategoryCombobox } from "@/components/CategoryCombobox"

import { Check, ChevronsUpDown, Upload } from "lucide-react"

import AddImageButton from "@/components/CreatePage/AddImageButton"
import InputLabel from "@/components/CreatePage/InputLabel"
import { z } from "zod"
import { fromZodError } from "zod-validation-error"
import ImageCarousel from "@/components/CreatePage/ImageCarousel"

import { v4 as uuid } from "uuid"
import {
	CategoryList,
	categoryList,
} from "@/utils/constants"
import CategoryPopover from "@/components/CreatePage/CategoryPopover"

export interface ImageData {
	id: string
	name: string
	data: string
}

export default function Sell() {
	const { data: session, status } = useSession()
	const router = useRouter()
	const dispatch = useDispatch()
	const { toast } = useToast()

	const [title, setTitle] = useState("")
	const [description, setDescription] = useState("")
	const [price, setPrice] = useState("")
	const [stock, setStock] = useState("")
	const [images, setImages] = useState<ImageData[]>([])
	const [category, setCategory] = useState<
		CategoryList | ""
	>("")

	const [buttonLoading, setButtonLoading] = useState(false)

	const formSchema = z.object({
		title: z
			.string()
			.min(4, "The title must be greater than 4. "),
		description: z
			.string()
			.min(1, "The description must be greater than 4. "),
		price: z
			.number({
				required_error: "Price is required. ",
				invalid_type_error: "Price is required. ",
			})
			.positive("Price must be a positive number. ")
			.safe(),
		stock: z
			.number({
				required_error: "Stock is required. ",
				invalid_type_error: "Stock is required. ",
			})
			.positive("Stock must be greater than 0. ")
			.int()
			.safe(),
		images: z
			.array(z.string())
			.nonempty("Select an image for the product"),
		category: z
			.enum(categoryList)
			.refine(value => value != "", {
				message: "Category is required. ",
			}),
	})

	type FormData = z.infer<typeof formSchema>

	console.log([
		title,
		description,
		price,
		stock,
		images,
		category,
	])

	const submitHandler = async (e: FormEvent) => {
		e.preventDefault()

		const data = {
			title,
			description,
			price: parseFloat(price),
			stock: parseFloat(stock),
			images: images.map(image => image.data),
			category,
		}

		const validatedFormData = formSchema.safeParse(data)

		if (validatedFormData.success) {
			await createProduct(validatedFormData.data)
				.then(res => {
					toast({
						description: "Product created succesfully",
						variant: "success",
					})
					router.push(`/product/${res.data.id}`)
				})
				.catch((err: AxiosError) => {
					console.log(err)
					toast({
						description: err.response?.data,
						variant: "destructive",
					})
				})
		} else {
			const details = fromZodError(
				validatedFormData.error
			).details

			toast({
				title: "There was a problem: ",
				description: details.map(detail => detail.message),
				variant: "advise",
			})
			setButtonLoading(false)
		}
	}

	const handleProductImageUpload = (
		files: FileList | null
	) => {
		if (files && images.length + files?.length > 4) {
			toast({
				title: "There was a problem: ",
				description: "You can't upload more than 4 images",
				variant: "advise",
			})
			return
		}

		if (files && files.length > 0) {
			for (let i = 0; i < files.length; i++) {
				const fileRef = files[i] || ""
				const fileType: string = fileRef.type || ""

				if (!fileType.startsWith("image/")) {
					toast({
						title: "There was a problem: ",
						description: "You can only upload images",
						variant: "advise",
					})
					return
				}

				const reader = new FileReader()
				if (fileRef) reader.readAsBinaryString(fileRef)
				reader.onload = (ev: any) => {
					setImages(prev => [
						...prev,
						{
							id: uuid(),
							name: fileRef.name,
							data: `data:${fileType};base64,${btoa(
								ev.target.result
							)}`,
						},
					])
				}
			}
		}
	}

	const removeImage = (id: string) => {
		setImages(prev => prev.filter(image => image.id !== id))
	}

	const inputStyle =
		"bg-_darkBlue border-2 ring-offset-_green border-_green  placeholder-_green placeholder:text-_green focus-visible:ring-1"

	if (status == "authenticated") {
		return (
			<div className="border-2 border-_white  text-_white rounded-sm md:w-2/3 mx-auto h-auto">
				<h1 className="p-3 border-b-2 border-_white font-normal text-_darkBlue text-center bg-_white">
					Sell your product
				</h1>
				<div
					className={` lg:grid w-full p-3 gap-3 ${
						images.length != 0 ? "lg:grid-cols-2" : ""
					}`}
				>
					<form
						className="flex flex-col gap-3  w-full"
						onSubmit={e => submitHandler(e)}
					>
						{/* Title Button */}
						<InputLabel
							name={"Title"}
							placeholder={"Write here..."}
							onChange={setTitle}
							inputStyle={inputStyle}
							type={"text"}
							value={title}
						/>
						{/* Decription Button */}
						<InputLabel
							name={"Decription"}
							placeholder={"Write here..."}
							onChange={setDescription}
							inputStyle={inputStyle}
							textarea
							value={description}
						/>
						{/* Price Button */}
						<InputLabel
							name={"Price"}
							placeholder={"$ ..."}
							onChange={setPrice}
							inputStyle={inputStyle}
							type="number"
							step="0.01"
							value={price}
						/>
						{/* Stock Button */}
						<InputLabel
							name={"Stock"}
							placeholder={"..."}
							onChange={setStock}
							inputStyle={inputStyle}
							type="number"
							step="1"
							value={stock}
						/>

						{/* Category Dropdown */}
						<Label
							htmlFor="categoryButton"
							className="text-lg"
						>
							Category
						</Label>

						<CategoryPopover
							category={category}
							inputStyle={inputStyle}
							setCategoryHandler={setCategory}
						/>
						{/* Image Button */}
						<Label
							htmlFor="images"
							className="text-lg"
						>
							Images{" "}
							<span className="text-sm">(max 4)</span>
						</Label>
						<div className="w-full flex gap-3 flex-wrap">
							<AddImageButton
								id={"image1"}
								inputStyle={inputStyle}
								handleProductImageUpload={
									handleProductImageUpload
								}
							/>
						</div>
						{/* Mobile image */}
						{images.length != 0 ? (
							<>
								<div className="lg:hidden w-full bg-_blue border-2 border-_green rounded-md p-3">
									<ImageCarousel
										images={images}
										removeImageHandler={removeImage}
									/>
								</div>
							</>
						) : null}
						{buttonLoading ? (
							<Button variant={"custom"}>
								<Spinner />
								<span className="ml-2">Please wait</span>
							</Button>
						) : (
							<Button
								variant={"custom"}
								onClick={() => setButtonLoading(true)}
							>
								Create Product
							</Button>
						)}
					</form>
					{/* PC image */}
					{images.length != 0 ? (
						<div className="lg:block hidden w-full h-full">
							<div className="w-full h-full relative px-3  bg-_blue flex justify-center items-center border-2 border-_green rounded-md">
								<ImageCarousel
									images={images}
									removeImageHandler={removeImage}
								/>
							</div>
						</div>
					) : null}
				</div>
			</div>
		)
	}
	// <div className="lg:block hidden w-full h-full">
	// 	<div className="w-full h-full relative flex justify-center items-center border-2 border-_green rounded-md">
	// 		<Image
	// 			src={images[0].data}
	// 			alt="Image preview"
	// 			width={300}
	// 			height={300}
	// 			className=""
	// 		/>
	// 	</div>
	// </div>

	if (status == "loading") {
		return <Loading />
	}

	if (status == "unauthenticated") {
		return <UnauthenticatedFrame />
	}
}
