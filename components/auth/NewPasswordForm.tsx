// 'use client'

// import { newPasswordFormSchema } from "@/lib/types"
// import { useForm } from "react-hook-form"
// import { zodResolver } from "@hookform/resolvers/zod"
// import * as z from 'zod'
// import { useAction } from "next-safe-action/hooks"
// import { newPassword } from '@/server/actions/reset-password'
// import { cn } from "@/lib/utils"
// import { useRouter } from 'next/navigation'

// import { Button } from "@/components/ui/button"
// import {
// 	Form,
// 	FormControl,
// 	FormField,
// 	FormItem,
// 	FormLabel,
// 	FormMessage,
// } from "@/components/ui/form"
// import { Input } from "@/components/ui/input"
// import AuthCard from "./AuthCard"
// import FormAlert from "./FormAlert"
// import { useState } from "react"


// const NewPasswordForm = () => {
// 	const [error, setError] = useState<string | null>(null)
// 	const [success, setSuccess] = useState<string | null>(null)
	
// 	const router = useRouter()

// 	const newPasswordForm = useForm<z.infer<typeof newPasswordFormSchema>>({
// 		resolver: zodResolver(newPasswordFormSchema),
// 		defaultValues: {
// 			password: '',
// 		}
// 	})

// 	const { execute, status, isExecuting, } = useAction(newPassword, {
// 		onSuccess: ((data) => {
// 			console.log('success', data)
// 			if(data?.data?.error){
// 				setError(data.data.error)
// 			}
// 			if(data?.data?.success){
// 				setError(null)
// 				setSuccess(data.data.success)
// 				router.push('/dashboard')
// 				router.refresh()
// }
// 		})
// 	})

// 	const onSubmit = (values: z.infer<typeof newPasswordFormSchema>) => {
// 		execute(values)
// 		// router.push('/login')
		
// 	}

// 	return (
// 		<AuthCard cardTitle="Time to Login" backButtonLabel="Register instead?" backButtonHref="/auth/register" showSocials={true}>
// 			<Form {...newPasswordForm}>
// 				<form onSubmit={newPasswordForm.handleSubmit(onSubmit)}>

// 					{/* password */}
// 					<FormField
// 						control={newPasswordForm.control}
// 						name="password"
// 						render={({ field }) => (
// 							<FormItem>
// 								<FormLabel>
// 									Password
// 								</FormLabel>
// 								<FormControl>
// 									<Input
// 										type="password"
// 										placeholder="password"
// 										autoComplete="password"
// 										{...field} />
// 								</FormControl>
// 								<FormMessage>
// 									{newPasswordForm.formState.errors.password?.message}
// 								</FormMessage>
// 							</FormItem>
// 						)}
// 					/>


// 					<Button
// 						type="submit"
// 						className={cn('w-full', isExecuting ? 'animate-pulse' : '')}
					// >Save</Button>

// 					{error ? <FormAlert type="error" message={error} /> : null}
// 					{success ? <FormAlert type="success" message={success} /> : null}

// 				</form>
// 			</Form>
// 		</AuthCard>
// 	)
// }

// export default NewPasswordForm