import { FC } from "react"
import { Label } from "../ui/Label"
import { Input } from "../ui/Input"
import { Textarea } from "../ui/Textarea"

interface InputLabelProps {
	name: string
	placeholder: string
	value: string
	onChange: (e: string) => void
	inputStyle: string
	type?: React.HTMLInputTypeAttribute
	textarea?: boolean
	step?: string
}

const InputLabel: FC<InputLabelProps> = ({
	name,
	placeholder,
	value,
	onChange,
	inputStyle,
	type,
	textarea,
	step,
}) => {
	return (
		<>
			<Label
				htmlFor={name.toLowerCase()}
				className="text-lg"
			>
				{name}
			</Label>
			{textarea ? (
				<Textarea
					onChange={e => onChange(e.target.value)}
					placeholder={placeholder}
					id={name.toLowerCase()}
					className={inputStyle}
					value={value}
				/>
			) : (
				<Input
					type={type}
					onChange={e => onChange(e.target.value)}
					placeholder={placeholder}
					id={name.toLowerCase()}
					className={inputStyle}
					value={value}
					step={step}
				/>
			)}
		</>
	)
}
export default InputLabel
