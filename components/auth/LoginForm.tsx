'use client'

import { loginFormSchema } from "@/lib/types"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useAction } from "next-safe-action/hooks"
import { signIn } from "@/server/auth"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

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
import AuthCard from "./AuthCard"


const LoginForm = () => {

	const loginForm = useForm<z.infer<typeof loginFormSchema>>({
		resolver: zodResolver(loginFormSchema),
		defaultValues: {
			username: '',
			email: '',
			password: ''
		}
	})

	const { toast } = useToast()
	const { execute, status } = useAction(signIn, {
		onSuccess: () => {
			
			console.log('success')
		},
		onError: (error) => {
			toast({
				title: "Error occurred",
				description: `The error is ${error}`,
				duration: 5000,
				type: 'background',
				color: 'red',

			})
			console.log('error', error)
		}
	})

	const onSubmit = (values: z.infer<typeof loginFormSchema>) => {
		execute(values)
		// loginForm.reset()
	}

	return (
		<AuthCard cardTitle="Time to Login" backButtonLabel="Register instead?" backButtonHref="/auth/register" showSocials={true}>
			<Form {...loginForm}>
				<form onSubmit={loginForm.handleSubmit(onSubmit)}>

					{/* username */}
					<FormField
						control={loginForm.control}
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
									<span className="flex justify-center">Login with username<ArrowBigUp /> or email<ArrowBigDown /> </span>
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
									{loginForm.formState.errors.email?.message}
								</FormMessage>
							</FormItem>
						)}
					/>

					{/* password */}
					<FormField
						control={loginForm.control}
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
									{loginForm.formState.errors.password?.message}
								</FormMessage>
							</FormItem>
						)}
					/>

					<Button 
					type="submit"
					className={cn('w-full', status === "executing" ? 'animate-pulse' : '')}
					>Login</Button>
					<Button 
					variant={'link'}>
						<Link href='/auth/forgot-password'>Did you forget your password?</Link>
					</Button>
				</form>
			</Form>
		</AuthCard>
	)
}

export default LoginForm