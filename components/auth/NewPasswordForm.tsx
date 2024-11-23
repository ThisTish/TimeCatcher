"use client"

import { newPasswordFormSchema } from "@/lib/types"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from 'zod'
import { useAction } from "next-safe-action/hooks"
import { newPassword } from "@/server/actions/new-password"
import { cn } from "@/lib/utils"
import { useRouter, useSearchParams } from 'next/navigation'

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
import { useState } from "react"


const NewPasswordForm = () => {
	const [error, setError] = useState<string | null>(null)
	const [success, setSuccess] = useState<string | null>(null)
	
	const router = useRouter()

	const searchParams = useSearchParams()

	const token = searchParams.get('token')
	console.log('token', token)
	if(!token) return <div>Invalid token</div>

	const newPasswordForm = useForm<z.infer<typeof newPasswordFormSchema>>({
		resolver: zodResolver(newPasswordFormSchema),
		defaultValues: {
			password: '',
		}
	})

	const { execute, status, isExecuting, } = useAction(newPassword, {
		onSuccess: ((data) => {
			if(data?.data?.error){
				setError(data.data.error)
			}
			if(data?.data?.success){
				setSuccess(data.data.success)
				newPasswordForm.reset()
				setTimeout(() => {
					router.push('/auth/login')
				}, 3000)
}
		})
	})

	const onSubmit = (values: z.infer<typeof newPasswordFormSchema>) => {
		execute({password: values.password, token})
		// router.push('/login')
		
	}

	return (
		<AuthCard cardTitle="Enter a new password" backButtonLabel="Back to login" backButtonHref="/auth/login" showSocials={false}>
			<Form {...newPasswordForm}>
				<form onSubmit={newPasswordForm.handleSubmit(onSubmit)}>

					{/* password */}
					<FormField
						control={newPasswordForm.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>
									New Password
								</FormLabel>
								<FormControl>
									<Input
										type="password"
										placeholder="new password"
										{...field} />
								</FormControl>
								<FormMessage>
									{newPasswordForm.formState.errors.password?.message}
								</FormMessage>
							</FormItem>
						)}
					/>


					<Button
						type="submit"
						className={cn('w-full', isExecuting ? 'animate-pulse' : '')}
					>Save</Button>

					{error ? <FormAlert type="error" message={error} /> : null}
					{success ? <FormAlert type="success" message={success} /> : null}

				</form>
			</Form>
		</AuthCard>
	)
}

export default NewPasswordForm