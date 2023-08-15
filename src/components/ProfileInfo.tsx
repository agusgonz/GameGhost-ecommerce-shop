import { FC, useRef, useState } from "react"
import AvatarIcon from "./AvatarIcon"
import { useSession } from "next-auth/react"
import { Pencil } from "lucide-react"
import { useToast } from "./ui/use-toast"
import { updateUser } from "@/services/user"
import { Button } from "./ui/Button"
import Spinner from "./Spinner"

interface ProfileInfoProps {
	image: string
	name: string
	email: string
}

const ProfileInfo: FC<ProfileInfoProps> = ({
	image,
	name,
	email,
}) => {
	const { toast } = useToast()

	const [newImage, setNewImage] = useState<string>("")
	const [newName, setNewName] = useState<string>(name)
	const [nameEditing, setNameEditing] = useState(false)
	const [savingChanges, setSavingChanges] = useState(false)

	const nameInputRef = useRef<HTMLInputElement>(null)

	const handleUserImageEdit = (file: FileList | null) => {
		if (file && file.length > 0) {
			const fileRef = file[0] || ""

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
				setNewImage(
					`data:${fileType};base64,${btoa(
						ev.target.result
					)}`
				)
				saveChanges()
			}
		}
	}

	const saveChanges = () => {
		setSavingChanges(true)
		updateUser(newName!, newImage!)
			.then(res => {
				toast({
					description: res.data,
					variant: "success",
				})
				setSavingChanges(false)
			})
			.catch(err => {
				toast({
					description:
						"There was a problem editing the profile",
					variant: "destructive",
				})
				setSavingChanges(false)
			})
	}

	return (
		<div className=" gap-8 flex flex-col justify-center items-center">
			<figure className="relative overflow-hidden group ">
				<AvatarIcon
					image={newImage || image}
					isBig
				/>
				<div className=" group-hover:block absolute w-full h-full  bg-_darkBlue/30 top-0 left-0 rounded-full hidden ">
					<label
						className="w-full h-full flex justify-center items-center group-hover:cursor-pointer"
						htmlFor="image1"
						tabIndex={0}
					>
						<Pencil className="w-10 h-10" />
					</label>
					<input
						id="image1"
						type="file"
						accept="image/"
						onChange={e =>
							handleUserImageEdit(e.target.files)
						}
						className="hidden"
					/>
				</div>
			</figure>
			<div>
				<div className="flex flex-col gap-1 py-1 justify-center items-center border-y-2 border-_blue">
					<div className="relative group">
						<input
							ref={nameInputRef}
							style={{
								all: "unset",
							}}
							type="text"
							value={newName}
							onChange={e => setNewName(e.target.value)}
							className={`!text-center !text-lg !font-normal  ${
								nameEditing ? "!w-full " : "!w-0 !h-0"
							}`}
							onBlur={() => {
								if (newName == "") {
									setNewName(name)
								} else if (newName != name) {
									saveChanges()
								}
								setNameEditing(false)
							}} //When input lost focus
						/>

						<button
							onClick={() => {
								setNameEditing(true)
								nameInputRef?.current?.focus()
							}}
							className={`text-lg font-normal hover:underline underline-offset-2  ${
								!nameEditing ? "!inline-block " : "!hidden"
							}`}
						>
							{newName}
						</button>
						<Pencil
							className={`w-4 h-4 group-hover:inline-block absolute translate-x-1 translate-y-1 ${
								nameEditing ? "inline-block " : "hidden"
							}`}
						/>
					</div>
					<p className="text-sm  text-_green">{email}</p>
				</div>
				{savingChanges && (
					<div className="text-center text-sm pt-1 flex gap-2 justify-center items-center">
						Saving changes
						<Spinner className="w-4 h-4" />
					</div>
				)}
			</div>
		</div>
	)
}

export default ProfileInfo
