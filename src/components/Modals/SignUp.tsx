"use client"
import { FC } from "react"
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
import axios from "axios"

import { useDispatch } from "react-redux"
import { setSignUpModalFalse } from "@/store/slices/isSignUpModal"

const formSchema = z.object({
	username: z.string().min(4).max(10),
	email: z.string().email(),
	password: z.string().min(4),
})

const SignUp = ({}) => {
	const dispatch = useDispatch()

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: "",
		},
	})

	const submitHandler = async (
		values: z.infer<typeof formSchema>
	) => {
		await axios
			.post("api/register", values)
			.then(res => alert("Registered!"))
			.catch(err =>
				alert("Something when wrong: " + err.response.data)
			)
	}

	return (
		<div>
			<h1>Sign Up</h1>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(submitHandler)}
					className="space-y-8"
				>
					<FormField
						control={form.control}
						name="username"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Username</FormLabel>
								<FormControl>
									<Input
										placeholder="your name..."
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
				Already an user?{" "}
				<button
					onClick={() => dispatch(setSignUpModalFalse())}
					className="underline"
				>
					Sign in
				</button>
			</p>
		</div>
	)
}
export default SignUp
