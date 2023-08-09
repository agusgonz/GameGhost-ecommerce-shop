"use client"
import {
	Form,
	FormControl,
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
import React from "react"
import { useToast } from "../ui/use-toast"

interface SignInProps {
	closeModalhandler: () => void
}
const formSchema = z.object({
	email: z.string().email(),
	password: z.string().min(4),
})

const SignIn: React.FC<SignInProps> = ({
	closeModalhandler,
}) => {
	const dispatch = useDispatch()

	const { toast } = useToast()

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
				toast({
					description: callback.error,
					variant: "destructive",
				})
			}
			if (callback?.ok && !callback.error) {
				toast({
					description: "Sign in successfully",
					variant: "success",
				})
				closeModalhandler()
			}
		})
	}

	return (
		<div className="flex flex-col gap-4">
			<h1 className="text-xl text-center">Sign In</h1>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(submitHandler)}
					className="space-y-4"
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
										className=" bg-_white placeholder:text-_darkBlue text-_darkBlue"
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
										className="placeholder:text-_darkBlue bg-_white text-_darkBlue"
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
						Sign in
					</Button>
				</form>
				<p>
					New User?{" "}
					<button
						onClick={() => dispatch(setSignUpModalTrue())}
						className="underline"
					>
						Sign up
					</button>
				</p>
			</Form>
		</div>
	)
}
export default SignIn
