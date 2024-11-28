'use client'

import { forgotPasswordFormSchema } from "@/lib/types"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from 'zod'
import { useAction } from "next-safe-action/hooks"
import { resetPassword } from '@/server/actions/reset-password'
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
import FormAlert from "../forms/FormAlert"
import { useState } from "react"


const ForgotPasswordForm = () => {
	const [error, setError] = useState<string | null>(null)
	const [success, setSuccess] = useState<string | null>(null)
	

	const forgotPasswordForm = useForm<z.infer<typeof forgotPasswordFormSchema>>({
		resolver: zodResolver(forgotPasswordFormSchema),
		defaultValues: {
			email: '',
		}
	})

	const { execute, status, isExecuting, } = useAction(resetPassword, {
		onSuccess: ((data) => {
			console.log('success', data)
			if(data?.data?.error){
				setError(data.data.error)
			}
			if(data?.data?.success){
				setError(null)
				setSuccess(data.data.success)
			}
		})
	})

	const onSubmit = (values: z.infer<typeof forgotPasswordFormSchema>) => {
		execute(values)		
	}

	return (
		<AuthCard cardTitle="Forgot Password" backButtonLabel="Back to login" backButtonHref="/auth/login" showSocials={false}>
			<Form {...forgotPasswordForm}>
				<form onSubmit={forgotPasswordForm.handleSubmit(onSubmit)}>

					{/* email */}
					<FormField
						control={forgotPasswordForm.control}
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
									{forgotPasswordForm.formState.errors.email?.message}
								</FormMessage>
							</FormItem>
						)}
					/>


					<Button
						type="submit"
						className={cn('w-full', isExecuting ? 'animate-pulse' : '')}
					>Send</Button>

					{error ? <FormAlert type="error" message={error} /> : null}
					{success ? <FormAlert type="success" message={success} /> : null}

				</form>
			</Form>
		</AuthCard>
	)
}

export default ForgotPasswordForm