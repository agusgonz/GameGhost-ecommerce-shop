declare module "store" {
	interface Product {
		id: string
		description: string
		price: number
		productImages: ProductImage[]
		title: string
		stock: int
		userId: string
		buyersId: string[]
		category: Category[]
		reviews: Review[]
	}
	interface ProductImage {
		access_mode: string
		api_key: string
		asset_id: string
		bytes: number
		created_at: string
		etag: string
		folder: string
		format: string
		height: number
		id: string
		pages: number
		placeholder: boolean
		productId: string
		public_id: string
		resource_type: string
		secure_url: string
		signature: string
		tags: string[]
		type: string
		url: string
		version: number
		version_id: string
		width: number
	}
	interface Category {
		id: string
		name: string
		products: Product[]
		productsId: string[]
	}
	interface Review {
		id: string
		stars: int
		comment: string
		productId: string
		writer: {
			name: string
			image: string
		}
		writerId: string
	}
}
