import { FC } from "react"
import { Label } from "../ui/Label"
import { Upload } from "lucide-react"
import { Input } from "../ui/Input"
import { buttonVariants } from "../ui/Button"

interface AddImageButtonProps {
	id: string
	inputStyle: string
	handleProductImageUpload: (e: FileList | null) => void
}

const AddImageButton: FC<AddImageButtonProps> = ({
	id,
	inputStyle,
	handleProductImageUpload,
}) => {
	return (
		<>
			<Label
				className={`${buttonVariants({
					variant: "custom",
				})} ${inputStyle} px-3 flex-grow gap-1 text-_green hover:cursor-pointer flex justify-between items-center `}
				htmlFor="image1"
				tabIndex={0}
			>
				Select Image...
				<Upload className="w-4 h-4 opacity-50" />
			</Label>
			<Input
				id="image1"
				type="file"
				accept="image/"
				multiple
				onChange={e =>
					handleProductImageUpload(e.target.files)
				}
				className="hidden"
			/>
		</>
	)
}

export default AddImageButton
