'use client'

import { loginFormSchema } from "@/lib/types"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from 'zod'
import { useAction } from "next-safe-action/hooks"
import { login } from '@/server/actions/login'
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useRouter } from 'next/navigation'

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
import FormAlert from "./FormAlert"
import { revalidatePath } from "next/cache"
import { useState } from "react"


const LoginForm = () => {
	const [error, setError] = useState<string | null>(null)
	const [success, setSuccess] = useState<string | null>(null)
	
	const router = useRouter()

	const loginForm = useForm<z.infer<typeof loginFormSchema>>({
		resolver: zodResolver(loginFormSchema),
		defaultValues: {
			email: '',
			password: ''
		}
	})

	const { execute, status, isExecuting, } = useAction(login, {
		onSuccess: ((data) => {
			console.log('success', data)
			if(data?.data?.error){
				setError(data.data.error)
			}
			if(data?.data?.success){
				setError(null)
				setSuccess(data.data.success)
				router.push('/dashboard')
				router.refresh()
}
		})
	})

	const onSubmit = (values: z.infer<typeof loginFormSchema>) => {
		execute(values)
		// router.push('/dashboard')
		
	}

	return (
		<AuthCard cardTitle="Time to Login" backButtonLabel="Register instead?" backButtonHref="/auth/register" showSocials={true}>
			<Form {...loginForm}>
				{/* either form in form is the problem  of the hydration error*/}
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
									{/* or one of these additions or something */}
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
						className={cn('w-full', isExecuting ? 'animate-pulse' : '')}
					>Login</Button>

					{error ? <FormAlert type="error" message={error} /> : null}
					{success ? <FormAlert type="success" message={success} /> : null}

						<Link href='/auth/forgot-password'>Did you forget your password?</Link>
				</form>
			</Form>
		</AuthCard>
	)
}

export default LoginForm