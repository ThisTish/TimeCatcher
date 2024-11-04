'use client'

import { registerFormSchema } from "@/lib/types"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useAction } from "next-safe-action/hooks"
import { register } from "@/server/actions/register"
import { cn } from "@/lib/utils"

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
import AuthCard from "./AuthCard"
import { useToast } from "@/hooks/use-toast"
import { Toast } from "../ui/toast"

const RegisterForm = () => {

	const registerForm = useForm<z.infer<typeof registerFormSchema>>({
		resolver: zodResolver(registerFormSchema),
		defaultValues: {
			username: '',
			email: '',
			password: '',
			confirm: ''
		}
	})

	const { toast } = useToast()
	const { execute, status } = useAction(register, {
		// onSuccess: () => {
		// 	toast({
		// 		title: "Success! You're registered",
		// 		description: "Start catching your time!",
		// 		duration: 5000,
		// 		type: 'foreground',
		// 		color: 'green',

		// 	})
		// 	console.log('success')
		// },
		// onError: (error) => {
		// 	toast({
		// 		title: "Error occurred",
		// 		description: `The error is ${error}`,
		// 		duration: 5000,
		// 		type: 'background',
		// 		color: 'red',

		// 	})
		// 	console.log('error', error)
			
		// }
	})

	const onSubmit = (values: z.infer<typeof registerFormSchema>) => {
		execute(values)
		// registerForm.reset()
	}

	return (
		<AuthCard cardTitle="Time to Register" backButtonLabel="Already have an account?" backButtonHref="/auth/login" showSocials={false}>
			<Form {...registerForm}>
				<form onSubmit={registerForm.handleSubmit(onSubmit)}>

					{/* username */}
					<FormField
						control={registerForm.control}
						name="username"
						render={({ field }) => (
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
								</FormDescription>
								<FormMessage>
									{registerForm.formState.errors.username?.message}
								</FormMessage>
							</FormItem>
						)}
					/>

					{/* email */}
					<FormField
						control={registerForm.control}
						name="email"
						render={({ field }) => (
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
									{registerForm.formState.errors.email?.message}
								</FormMessage>
							</FormItem>
						)}
					/>

					{/* password */}
					<FormField
						control={registerForm.control}
						name="password"
						render={({ field }) => (
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
									{registerForm.formState.errors.password?.message}
								</FormMessage>
							</FormItem>
						)}
					/>

					{/* confirm password */}
					<FormField
						control={registerForm.control}
						name="confirm"
						render={({ field }) => (
							<FormItem>
								<FormLabel>
									Confirm Password
								</FormLabel>
								<FormControl>
									<Input
										placeholder="********"
										type="password"
										required
										{...field} />
								</FormControl>
								<FormMessage>
									{registerForm.formState.errors.confirm?.message}
								</FormMessage>
							</FormItem>
						)}
					/>

					<Button
						type="submit"
						className={cn('w-full', status === "executing" ? 'animate-pulse' : '')}
					>Submit
					</Button>

				</form>
			</Form>
		</AuthCard>
	)
}

export default RegisterForm