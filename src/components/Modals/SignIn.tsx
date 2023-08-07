"use client"
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/Form"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "../ui/Input"
import { Button } from "../ui/Button"
import { useDispatch } from "react-redux"
import { setSignUpModalTrue } from "@/store/slices/isSignUpModal"
import { signIn } from "next-auth/react"

const formSchema = z.object({
	email: z.string().email(),
	password: z.string().min(4),
})

const SignIn = ({}) => {
	const dispatch = useDispatch()

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	})

	const submitHandler = async (
		values: z.infer<typeof formSchema>
	) => {
		signIn("credentials", {
			...values,
			redirect: false,
		}).then(callback => {
			if (callback?.error) {
				alert(callback.error)
			}
			if (callback?.ok && !callback.error) {
				alert("Logged in!")
			}
		})
	}

	return (
		<div>
			<h1>Sign In</h1>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(submitHandler)}
					className="space-y-8"
				>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input
										placeholder="your email..."
										className="text-_darkBlue"
										{...field}
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input
										placeholder="your password..."
										className="text-_darkBlue"
										{...field}
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit">Submit</Button>
				</form>
			</Form>
			<p>
				New User?{" "}
				<button
					onClick={() => dispatch(setSignUpModalTrue())}
					className="underline"
				>
					Sign up
				</button>
			</p>
		</div>
	)
}
export default SignIn
