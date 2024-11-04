'use client'

import { loginFormSchema } from "@/lib/types"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { ArrowBigDown, ArrowBigUp } from "lucide-react"

const LoginForm = () => {

	const loginForm = useForm<z.infer<typeof loginFormSchema>>({
		resolver: zodResolver(loginFormSchema),
		defaultValues: {
			username: '',
			email: '',
			password: ''
		}
	})

	const onSubmit = (values: z.infer<typeof loginFormSchema>) => {
		console.log(values)
	}

	return (
		<Form { ...loginForm}>
			<form onSubmit={loginForm.handleSubmit(onSubmit)}>
				
				{/* username */}
				<FormField
					control={loginForm.control}
					name="username"
					render={({field}) => (
						<FormItem>
							<FormLabel>
								Username
							</FormLabel>
							<FormControl>
								<Input 
									type="text" 
									placeholder="username" 
									autoComplete="username"
									{...field} />
							</FormControl>
							<FormDescription>
								<p className="flex justify-center">Login with username<ArrowBigUp /> or email<ArrowBigDown /> </p>
							</FormDescription>
							<FormMessage>
								{loginForm.formState.errors.username?.message}
							</FormMessage>
						</FormItem>
					)}
					/>

				{/* email */}
				<FormField
					control={loginForm.control}
					name="email"
					render={({field}) => (
						<FormItem>
							<FormLabel>
								Email
							</FormLabel>
							<FormControl>
								<Input 
									type="email" 
									placeholder="email" 
									autoComplete="email"
									{...field} />
							</FormControl>
							<FormMessage>
								{loginForm.formState.errors.email?.message}
							</FormMessage>
						</FormItem>
					)}
					/>

				{/* password */}
				<FormField
					control={loginForm.control}
					name="password"
					render={({field}) => (
						<FormItem>
							<FormLabel>
								Password
							</FormLabel>
							<FormControl>
								<Input 
								placeholder="********" 
								type="password"
								autoComplete="current-password"
								required
								{...field} />
							</FormControl>
							<FormMessage>
								{loginForm.formState.errors.password?.message}
							</FormMessage>
						</FormItem>
					)}
					/>

					<Button type="submit">Login</Button>

			</form>
		</Form>
	)
}

export default LoginForm