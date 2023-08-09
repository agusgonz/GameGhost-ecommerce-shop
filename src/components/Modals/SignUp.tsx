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
import { useToast } from "../ui/use-toast"

const formSchema = z.object({
	username: z.string().min(4).max(10),
	email: z.string().email(),
	password: z.string().min(4),
})

const SignUp = ({}) => {
	const dispatch = useDispatch()

	const { toast } = useToast()

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
			.then(res => {
				toast({
					description: "User registered",
					variant: "success",
				})
				dispatch(setSignUpModalFalse())
			})
			.catch(err =>
				toast({
					title: "Something when wrong:",
					description: err.response.data,
					variant: "destructive",
				})
			)
	}

	return (
		<div className="flex flex-col gap-4">
			<h1 className="text-xl text-center">Sign Up</h1>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(submitHandler)}
					className="space-y-4"
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
										className="placeholder:text-_darkBlue text-_darkBlue  bg-_white"
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
										className="placeholder:text-_darkBlue text-_darkBlue  bg-_white"
										{...field}
										type="email"
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
										className="placeholder:text-_darkBlue text-_darkBlue  bg-_white"
										{...field}
										type="password"
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>
					<Button
						type="submit"
						variant={"custom"}
					>
						Create account
					</Button>
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
