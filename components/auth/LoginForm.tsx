'use client'

import { loginFormSchema } from "@/lib/types"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from 'zod'
import { useAction } from "next-safe-action/hooks"
import { login } from '@/server/actions/login'
import Link from "next/link"
import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import AuthCard from "./AuthCard"


const LoginForm = () => {

	const loginForm = useForm({
		resolver: zodResolver(loginFormSchema),
		defaultValues: {
			email: '',
			password: ''
		}
	})

	const { execute, status, hasErrored } = useAction(login)

	const onSubmit = (values: z.infer<typeof loginFormSchema>) => {
		execute(values)
		// loginForm.reset()
	}

	return (
		<AuthCard cardTitle="Time to Login" backButtonLabel="Register instead?" backButtonHref="/auth/register" showSocials={true}>
			<Form {...loginForm}>
				<form onSubmit={loginForm.handleSubmit(onSubmit)}>

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
				{hasErrored && <FormMessage>There was an error logging in. Please try again.</FormMessage>}
			</Form>
		</AuthCard>
	)
}

export default LoginForm